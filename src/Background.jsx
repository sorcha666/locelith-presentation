import { useEffect, useRef } from 'react';

/**
 * Smart Sphere ↔ Tunnel Background
 *
 * Reads window.__bgMode (set by App.jsx) each frame:
 *   'cover'  → sphere on the right half of screen
 *   'sphere' → sphere centered (chapter title slides)
 *   'tunnel' → camera deep inside sphere = centered tunnel (content slides)
 *
 * All transitions are smoothed with linear interpolation so there are
 * no hard cuts — the sphere flies to center and zooms in seamlessly.
 */

const LANG_CODES = [
  'AR','FR','DE','ES','ZH','JA','KO','RU','PT','IT',
  'TR','NL','PL','SV','DA','FI','HE','FA','HI','TH',
  'VI','ID','MS','UK','CS','HU','RO','BG','EL','SK',
  'LT','LV','ET','HR','SR','SL','KA','AZ','AM','SW',
  'UR','BN','TA','TE','KN','ML','SI','NE','MY','KM',
  'MN','UZ','TK','KK','TL','JV','CY','EU','IS','AF',
  'ZU','YO','IG','HA','SN','SO','RW','MG','NY','ST',
];

const NODE_COUNT = 120;
const NEIGHBOURS = 5;
const FOV        = 820;

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf, t = 0;

    // Smoothed state (lerped each frame)
    let curCamAdv = 0;   // 0 = outside sphere, 2+ = deep tunnel
    let curCxFrac = 0.65; // fraction of W for sphere center X

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Fibonacci sphere nodes ── */
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes  = Array.from({ length: NODE_COUNT }, (_, i) => {
      const yUnit = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const theta = golden * i;
      return {
        x:     Math.cos(theta) * r,
        y:     yUnit,
        z:     Math.sin(theta) * r,
        label: Math.random() < 0.5 ? LANG_CODES[i % LANG_CODES.length] : null,
        hue:   210 + (i / NODE_COUNT) * 65,
      };
    });

    /* ── k-nearest-neighbour edges ── */
    const edgeSet = new Set();
    nodes.forEach((a, i) => {
      const dists = nodes
        .map((b, j) => { const dx=a.x-b.x, dy=a.y-b.y, dz=a.z-b.z; return { j, d: dx*dx+dy*dy+dz*dz }; })
        .sort((x, y) => x.d - y.d);
      for (let k = 1; k <= NEIGHBOURS; k++) {
        const key = [Math.min(i, dists[k].j), Math.max(i, dists[k].j)].join('-');
        edgeSet.add(key);
      }
    });
    const edges = [...edgeSet].map(k => k.split('-').map(Number));

    /* ── Perspective projection ── */
    const project = (x, y, z, rotY, rotX, cx, cy, R, camAdv) => {
      // Y-spin
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rx   = x * cosY + z * sinY;
      const ry   = y;
      const rz   = -x * sinY + z * cosY;
      // X-tilt
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const ry2  = ry * cosX - rz * sinX;
      const rz2  = ry * sinX + rz * cosX;

      // Camera advances into the sphere
      const depth = rz2 * R - camAdv * R;
      if (depth <= 6) return null;

      const p = FOV / (FOV + depth);
      return {
        sx:    cx + rx * R * p,
        sy:    cy + ry2 * R * p,
        scale: p,
        depth: rz2,       // -1 = front, +1 = back
        rawDepth: depth,
      };
    };

    /* ── Draw loop ── */
    const draw = () => {
      t += 0.006;

      /* Determine targets from current slide mode */
      const mode = window.__bgMode || 'cover';
      let targetCamAdv, targetCxFrac;
      if (mode === 'cover') {
        targetCamAdv = 0;
        targetCxFrac = 0.65;
      } else if (mode === 'sphere') {
        targetCamAdv = 0;
        targetCxFrac = 0.5;
      } else { // tunnel
        targetCamAdv = 2.1;
        targetCxFrac = 0.5;
      }

      // Smooth lerp toward targets (speed 0.035 = ~0.4s transition)
      const lerpSpeed = 0.035;
      curCamAdv += (targetCamAdv - curCamAdv) * lerpSpeed;
      curCxFrac += (targetCxFrac - curCxFrac) * lerpSpeed;

      const R   = Math.min(W, H) * 0.33;
      const cx  = W * curCxFrac;
      const cy  = H * 0.5;

      // Rotation: ambient spin (faster when sphere is visible)
      const spinSpeed = mode === 'tunnel' ? 0.08 : 0.14;
      const rotY = t * spinSpeed;
      const rotX = Math.sin(t * 0.22) * 0.14;

      /* Clear */
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, W, H);

      /* Glow */
      const glowR = R * (1.4 + curCamAdv * 0.3);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grd.addColorStop(0,   'rgba(210,228,255,0.52)');
      grd.addColorStop(0.5, 'rgba(228,218,255,0.2)');
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      /* Project nodes */
      const proj = nodes.map(n =>
        project(n.x, n.y, n.z, rotY, rotX, cx, cy, R, curCamAdv)
      );

      /* Edges — back to front */
      [...edges]
        .sort((a, b) => {
          const da = proj[a[0]]?.depth ?? 2;
          const db = proj[b[0]]?.depth ?? 2;
          return db - da;
        })
        .forEach(([i, j]) => {
          const a = proj[i], b = proj[j];
          if (!a || !b) return;
          const avg = (a.depth + b.depth) / 2;
          // Front = vivid, back = faint
          const alpha = Math.max(0.04, 0.62 - avg * 0.28);
          const hue   = 215 + avg * 28;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `hsla(${hue},72%,52%,${alpha.toFixed(2)})`;
          ctx.lineWidth   = Math.max(0.5, 1.4 - avg * 0.4);
          ctx.stroke();
        });

      /* Nodes — back to front */
      nodes
        .map((n, i) => ({ n, p: proj[i] }))
        .filter(o => o.p)
        .sort((a, b) => b.p.depth - a.p.depth)
        .forEach(({ n, p }) => {
          const isFront = p.depth < 0.15;
          const alpha   = isFront ? 0.95 : Math.max(0.08, 0.52 - p.depth * 0.38);
          // Front nodes are much larger — creates strong 3D depth cue
          const dotR    = Math.max(1, isFront ? 5.5 * p.scale : 2.5 * p.scale);

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${n.hue},78%,50%,${alpha.toFixed(2)})`;
          ctx.fill();

          /* Language label */
          if (n.label && isFront && dotR > 4 && mode !== 'tunnel') {
            const fs = Math.min(10, Math.max(7, dotR * 1.8));
            ctx.font          = `700 ${fs}px "JetBrains Mono", monospace`;
            ctx.textAlign     = 'center';
            ctx.textBaseline  = 'bottom';
            ctx.fillStyle     = `hsla(${n.hue},65%,32%,${(alpha * 0.85).toFixed(2)})`;
            ctx.fillText(n.label, p.sx, p.sy - dotR - 2);
          }
        });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
