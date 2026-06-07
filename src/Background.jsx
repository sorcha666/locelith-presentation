import { useEffect, useRef } from 'react';

/**
 * Unified Sphere → Tunnel Background
 *
 * scroll = 0  : Beautiful spinning sphere (cover page)
 * scroll → 1  : Camera advances INTO the sphere — naturally becomes a tunnel
 *
 * One geometry, one projection. The "zoom-in" is just the camera moving
 * forward along the Z-axis, which is physically correct perspective math.
 *
 * No WebGL. No libraries. Pure 2D canvas + perspective projection.
 */

const LANG_CODES = [
  'AR','FR','DE','ES','ZH','JA','KO','RU','PT','IT',
  'TR','NL','PL','SV','DA','FI','HE','FA','HI','TH',
  'VI','ID','MS','UK','CS','HU','RO','BG','EL','SK',
  'LT','LV','ET','HR','SR','SL','KA','AZ','AM','SW',
  'UR','BN','TA','TE','KN','ML','SI','NE','MY','KM',
  'MN','UZ','TK','KY','KK','TL','JV','CY','EU','IS',
  'AF','ZU','YO','IG','HA','SN','SO','RW','MG','NY',
];

const NODE_COUNT = 120;
const NEIGHBOURS = 5;

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf;
    let t = 0;
    let scrollProgress = 0;
    let currentScroll  = 0; // smoothed

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Build nodes — Fibonacci sphere ── */
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes  = Array.from({ length: NODE_COUNT }, (_, i) => {
      const yUnit = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const theta = golden * i;
      return {
        x:     Math.cos(theta) * r,
        y:     yUnit,
        z:     Math.sin(theta) * r,
        label: Math.random() < 0.55 ? LANG_CODES[i % LANG_CODES.length] : null,
        hue:   210 + (i / NODE_COUNT) * 65,
      };
    });

    /* ── Build edges — k nearest neighbours ── */
    const edgeSet = new Set();
    nodes.forEach((a, i) => {
      const dists = nodes
        .map((b, j) => {
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          return { j, d: dx*dx + dy*dy + dz*dz };
        })
        .sort((x, y) => x.d - y.d);
      for (let k = 1; k <= NEIGHBOURS; k++) {
        const key = [Math.min(i, dists[k].j), Math.max(i, dists[k].j)].join('-');
        edgeSet.add(key);
      }
    });
    const edges = [...edgeSet].map(key => key.split('-').map(Number));

    /* ── Project a unit-sphere point to screen ──
       cameraAdv: how far (in sphere-radii) the camera has moved into the sphere.
       0 = outside looking at sphere
       1 = at the sphere surface
       1.5+ = inside = tunnel view                                         */
    const FOV = 850;

    const project = (x, y, z, rotY, rotX, cx, cy, R, cameraAdv) => {
      // Y spin
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rx   = x * cosY + z * sinY;
      const ry   = y;
      const rz   = -x * sinY + z * cosY;

      // X tilt
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const ry2  = ry * cosX - rz * sinX;
      const rz2  = ry * sinX + rz * cosX;

      // Camera advance: shift depth so camera moves forward into the sphere
      const depth = rz2 * R - cameraAdv * R;
      if (depth <= 8) return null; // behind or too close to camera

      const perspective = FOV / (FOV + depth);
      return {
        sx:    cx + rx * R * perspective,
        sy:    cy + ry2 * R * perspective,
        scale: perspective,
        depth: rz2, // original depth for shading (-1=front, +1=back)
        rawDepth: depth,
      };
    };

    /* ── Draw loop ── */
    const draw = () => {
      t += 0.006;

      // Smooth scroll for camera advance
      currentScroll += (scrollProgress - currentScroll) * 0.04;

      const R  = Math.min(W, H) * 0.33;
      // Sphere starts right side on cover, slides to center as camera enters
      const moveProgress = Math.min(currentScroll / 0.3, 1); // fully centered by 30% scroll
      const cx = W * (0.68 - moveProgress * 0.18); // right (0.68) → center (0.50)
      const cy = H * 0.5;

      // Camera advances INTO the sphere as user scrolls
      // 0 → 0 (sphere outside view)
      // 0.3 scroll → 1.0 (camera at surface — "entering")
      // 1.0 scroll → 2.2 (well inside — full tunnel)
      const cameraAdv = currentScroll * 2.2;

      // Rotation: ambient spin + scroll accelerates it slightly
      const rotY = t * 0.14 + currentScroll * Math.PI * 2;
      const rotX = Math.sin(t * 0.22) * 0.14;

      /* Clear */
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, W, H);

      /* Background glow — stays centered */
      const glowR = R * (1 + cameraAdv * 0.4);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR * 1.5);
      grd.addColorStop(0,   'rgba(210,228,255,0.55)');
      grd.addColorStop(0.5, 'rgba(228,218,255,0.22)');
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      /* Project all nodes */
      const proj = nodes.map(n =>
        project(n.x, n.y, n.z, rotY, rotX, cx, cy, R, cameraAdv)
      );

      /* Draw edges — sort back-to-front */
      const sortedEdges = [...edges].sort((a, b) => {
        const da = proj[a[0]] ? proj[a[0]].depth : 2;
        const db = proj[b[0]] ? proj[b[0]].depth : 2;
        return db - da;
      });

      sortedEdges.forEach(([i, j]) => {
        const a = proj[i], b = proj[j];
        if (!a || !b) return;

        const avgDepth = (a.depth + b.depth) / 2;
        // When inside (cameraAdv > 1): front edges (depth < 0) are vivid
        const insideFactor = Math.max(0, cameraAdv - 1);
        const baseAlpha    = cameraAdv < 1 ? 0.55 : 0.65;
        const alpha = (baseAlpha - avgDepth * 0.25 + insideFactor * 0.1)
                        .toFixed(2);
        if (parseFloat(alpha) < 0.04) return;

        const hue = 215 + avgDepth * 30;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = `hsla(${hue},72%,52%,${alpha})`;
        ctx.lineWidth = Math.max(0.6, 1.3 - avgDepth * 0.3);
        ctx.stroke();
      });

      /* Draw nodes — sort back-to-front */
      const sortedNodes = nodes
        .map((n, i) => ({ n, p: proj[i], i }))
        .filter(o => o.p !== null)
        .sort((a, b) => b.p.depth - a.p.depth);

      sortedNodes.forEach(({ n, p }) => {
        const isFront  = p.depth < 0.1;
        const alpha    = isFront
          ? 0.92
          : Math.max(0.1, 0.55 - p.depth * 0.35);
        const dotR     = Math.max(1.2, (isFront ? 4.8 : 3.0) * p.scale);

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue},72%,50%,${alpha.toFixed(2)})`;
        ctx.fill();

        /* Language label — visible when node is large and facing front */
        if (n.label && isFront && dotR > 3.5) {
          const fontSize = Math.min(10, Math.max(7, dotR * 2));
          ctx.font      = `700 ${fontSize}px "JetBrains Mono", monospace`;
          ctx.textAlign  = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle  = `hsla(${n.hue},65%,32%,${(alpha * 0.88).toFixed(2)})`;
          ctx.fillText(n.label, p.sx, p.sy - dotR - 2);
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  );
}
