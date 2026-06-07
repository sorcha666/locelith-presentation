import { useEffect, useRef } from 'react';

/**
 * Sphere Neural Network Background
 *
 * - Fibonacci-distributed nodes on a sphere surface
 * - Each node connected to its 5 nearest neighbours (clean mesh)
 * - Spins on Y-axis (vertical axis) — driven by scroll progress
 * - Ambient slow ambient rotation always running
 * - Sharp crisp dots + lines, no blurry halos
 * - ISO language codes on front-facing nodes
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

const NODE_COUNT   = 110;
const NEIGHBOURS   = 5;  // connections per node

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const ctx     = canvas.getContext('2d');
    let W, H, raf;
    let t = 0;
    let scrollProgress = 0;

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

    /* ── Build nodes on sphere surface (Fibonacci distribution) ── */
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes  = Array.from({ length: NODE_COUNT }, (_, i) => {
      const y     = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      return {
        x:     Math.cos(theta) * r,
        y,
        z:     Math.sin(theta) * r,
        label: Math.random() < 0.5 ? LANG_CODES[i % LANG_CODES.length] : null,
        hue:   210 + (i / NODE_COUNT) * 70, // gradient from blue (210) to purple (280)
      };
    });

    /* ── Build edges — k nearest neighbours per node ── */
    const edgeSet = new Set();
    nodes.forEach((a, i) => {
      const dists = nodes.map((b, j) => {
        const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        return { j, d: dx*dx + dy*dy + dz*dz };
      });
      dists.sort((x, y) => x.d - y.d);
      // Take NEIGHBOURS closest (skip self at index 0)
      for (let k = 1; k <= NEIGHBOURS; k++) {
        const key = [Math.min(i, dists[k].j), Math.max(i, dists[k].j)].join('-');
        edgeSet.add(key);
      }
    });
    const edges = [...edgeSet].map(key => key.split('-').map(Number));

    /* ── Project a 3D sphere point to 2D screen ── */
    const FOV = 900;
    const project = (x, y, z, rotY, rotX, cx, cy, R) => {
      // Y-axis rotation (spin)
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      let rx  = x * cosY + z * sinY;
      let ry  = y;
      let rz  = -x * sinY + z * cosY;

      // X-axis rotation (gentle tilt)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const ry2  = ry * cosX - rz * sinX;
      const rz2  = ry * sinX + rz * cosX;

      const perspective = FOV / (FOV + rz2 * R);
      return {
        sx:    cx + rx * R * perspective,
        sy:    cy + ry2 * R * perspective,
        scale: perspective,
        depth: rz2, // -1 = front, +1 = back
      };
    };

    /* ── Draw loop ── */
    const draw = () => {
      t += 0.006;

      const R  = Math.min(W, H) * 0.32; // sphere radius in pixels
      const cx = W * 0.5;
      const cy = H * 0.5;

      // Rotation: ambient slow + scroll spins it vertically (Y axis)
      const rotY = t * 0.12 + scrollProgress * Math.PI * 3;
      // Gentle persistent X-axis tilt (never goes past ±20°)
      const rotX = Math.sin(t * 0.25) * 0.18;

      // Clear
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, W, H);

      // Soft radial gradient background glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.4);
      grd.addColorStop(0,   'rgba(214,231,255,0.5)');
      grd.addColorStop(0.6, 'rgba(230,220,255,0.2)');
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Project all nodes
      const proj = nodes.map(n => project(n.x, n.y, n.z, rotY, rotX, cx, cy, R));

      // ── Draw edges (back to front order for correct overlap) ──
      // Sort edges by avg depth (draw back edges first)
      const sortedEdges = [...edges].sort((a, b) => {
        const da = (proj[a[0]].depth + proj[a[1]].depth) / 2;
        const db = (proj[b[0]].depth + proj[b[1]].depth) / 2;
        return db - da; // back first
      });

      sortedEdges.forEach(([i, j]) => {
        const a = proj[i], b = proj[j];
        const avgDepth = (a.depth + b.depth) / 2; // -1 front, +1 back
        // Front edges: alpha 0.55, back edges: alpha 0.1
        const alpha = 0.55 - avgDepth * 0.22;
        if (alpha < 0.04) return;

        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        // Front: vivid blue, back: faint
        const hue = 220 + avgDepth * 30;
        ctx.strokeStyle = `hsla(${hue},72%,52%,${alpha.toFixed(2)})`;
        ctx.lineWidth = 1.2 - avgDepth * 0.3;
        ctx.stroke();
      });

      // ── Draw nodes (back to front) ──
      const sortedNodes = nodes
        .map((n, i) => ({ n, p: proj[i], i }))
        .sort((a, b) => b.p.depth - a.p.depth); // back first

      sortedNodes.forEach(({ n, p, i }) => {
        const isFront = p.depth < 0.2;
        const alpha   = isFront ? 0.9 : Math.max(0.12, 0.5 - p.depth * 0.35);
        const r       = Math.max(1.5, (isFront ? 4.5 : 2.8) * p.scale);

        // Node circle — crisp, no blur
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue},70%,52%,${alpha.toFixed(2)})`;
        ctx.fill();

        // Language label — only on front-facing nodes that are big enough
        if (n.label && isFront && r > 3.5) {
          const fontSize = Math.min(10, Math.max(7, r * 2.2));
          ctx.font = `700 ${fontSize}px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle = `hsla(${n.hue},65%,35%,${(alpha * 0.9).toFixed(2)})`;
          ctx.fillText(n.label, p.sx, p.sy - r - 2);
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
