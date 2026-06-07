import { useEffect, useRef } from 'react';

/**
 * Sphere Neural Network — CORRECTED perspective projection
 *
 * Bug fix: camera is placed at z = -FOV (behind the sphere), not at origin.
 * Node depth = rz2 * R + FOV (always positive for any sphere node).
 * Camera advance: depth = rz2 * R + FOV - camAdv * R
 */

const LANG_CODES = [
  'AR','FR','DE','ES','ZH','JA','KO','RU','PT','IT',
  'TR','NL','PL','SV','DA','FI','HE','FA','HI','TH',
  'VI','ID','MS','UK','CS','HU','RO','BG','EL','SK',
  'LT','LV','ET','HR','SR','SL','KA','AZ','AM','SW',
  'UR','BN','TA','TE','KN','ML','MN','UZ','KK','TL',
  'CY','EU','IS','AF','ZU','YO','IG','HA','SN','SO',
];

const NODE_COUNT = 120;
const NEIGHBOURS = 4;
const FOV        = 1200;   // large FOV = camera far from sphere = gentle perspective

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf, t = 0;

    let curCamAdv = 0;
    let curCxFrac = 0.72;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Fibonacci sphere ── */
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes  = Array.from({ length: NODE_COUNT }, (_, i) => {
      const yUnit = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const theta = golden * i;
      return {
        x:     Math.cos(theta) * r,
        y:     yUnit,
        z:     Math.sin(theta) * r,
        label: Math.random() < 0.45 ? LANG_CODES[i % LANG_CODES.length] : null,
        hue:   210 + (i / NODE_COUNT) * 70,
        phase: Math.random() * Math.PI * 2,
      };
    });

    /* ── k-nearest-neighbour edges ── */
    const edgeSet = new Set();
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => { const dx=a.x-b.x, dy=a.y-b.y, dz=a.z-b.z; return { j, d: dx*dx+dy*dy+dz*dz }; })
        .sort((x, y) => x.d - y.d)
        .slice(1, NEIGHBOURS + 1)
        .forEach(({ j }) => edgeSet.add([Math.min(i,j), Math.max(i,j)].join('-')));
    });
    const edges = [...edgeSet].map(k => k.split('-').map(Number));

    /* ── Correct perspective projection ──
       Camera sits at world-z = -FOV (behind the sphere center at z=0).
       node world-z = rz2 * R
       depth from camera = rz2 * R - (-FOV) = rz2 * R + FOV
       With camera advance: camera moves to -FOV + camAdv*R
       → depth = rz2 * R + FOV - camAdv * R
    */
    const project = (x, y, z, rotY, rotX, cx, cy, R, camAdv) => {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rx   = x * cosY + z * sinY;
      const ry   = y;
      const rz   = -x * sinY + z * cosY;

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const ry2  = ry * cosX - rz * sinX;
      const rz2  = ry * sinX + rz * cosX;

      // Correct depth: always positive for any node when camAdv is reasonable
      const depth = rz2 * R + FOV - camAdv * R;
      if (depth <= 1) return null;

      const scale = FOV / depth;
      return {
        sx:  cx + rx * R * scale,
        sy:  cy + ry2 * R * scale,
        rz:  rz2,  // raw unit-sphere z: -1=front, +1=back
      };
    };

    /* ── Depth-to-visibility factor: quadratic, 1=front, 0=back ── */
    const df = rz => {
      const f = Math.max(0, Math.min(1, (1 - rz) / 2));
      return f * f;
    };

    /* ── Draw loop ── */
    const draw = () => {
      t += 0.006;

      const mode = window.__bgMode || 'cover';
      const targetCamAdv = mode === 'tunnel' ? 2.0 : 0;
      const targetCxFrac = mode === 'cover'  ? 0.72 : 0.5;

      curCamAdv += (targetCamAdv - curCamAdv) * 0.03;
      curCxFrac += (targetCxFrac - curCxFrac) * 0.03;

      // R must satisfy: FOV - camAdv_max * R > 0  →  R < FOV / camAdv_max
      // With camAdv_max=2.0, FOV=1200: R < 600. We use ~260 which is fine.
      const R  = Math.min(W, H) * 0.27;
      const cx = W * curCxFrac;
      const cy = H * 0.5;

      const rotY = t * 0.13;
      const rotX = Math.sin(t * 0.21) * 0.14;

      /* Clear */
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, W, H);

      /* Background atmosphere glow */
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6);
      grd.addColorStop(0,   'rgba(208,228,255,0.50)');
      grd.addColorStop(0.55,'rgba(225,215,255,0.20)');
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      /* Project all nodes */
      const proj = nodes.map(n =>
        project(n.x, n.y, n.z, rotY, rotX, cx, cy, R, curCamAdv)
      );

      /* Edges — back to front */
      [...edges]
        .sort((a, b) => {
          const ra = proj[a[0]]?.rz ?? 2;
          const rb = proj[b[0]]?.rz ?? 2;
          return rb - ra;
        })
        .forEach(([i, j]) => {
          const a = proj[i], b = proj[j];
          if (!a || !b) return;
          const avgRz = (a.rz + b.rz) / 2;
          const fac   = df(avgRz);
          const alpha = 0.04 + fac * 0.60;
          if (alpha < 0.05) return;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `hsla(${215 + (1-fac)*25},70%,55%,${alpha.toFixed(2)})`;
          ctx.lineWidth   = 0.5 + fac * 1.3;
          ctx.stroke();
        });

      /* Nodes — back to front */
      nodes
        .map((n, i) => ({ n, p: proj[i] }))
        .filter(o => o.p)
        .sort((a, b) => b.p.rz - a.p.rz)
        .forEach(({ n, p }) => {
          const fac   = df(p.rz);
          const alpha = 0.05 + fac * 0.92;
          const dotR  = 0.8 + fac * 8.5;   // back: ~0.8px, front: ~9.3px

          /* Pulsing glow on prominent front nodes */
          if (fac > 0.65) {
            const pulse = 0.55 + 0.45 * Math.sin(t * 1.7 + n.phase);
            const gr    = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, dotR * 4);
            gr.addColorStop(0, `hsla(${n.hue},82%,62%,${(fac * 0.32 * pulse).toFixed(2)})`);
            gr.addColorStop(1, 'transparent');
            ctx.fillStyle = gr;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, dotR * 4, 0, Math.PI * 2);
            ctx.fill();
          }

          /* Dot */
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(0.5, dotR), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${n.hue},82%,48%,${alpha.toFixed(2)})`;
          ctx.fill();

          /* Language label */
          if (n.label && fac > 0.8 && dotR > 5 && mode !== 'tunnel') {
            const fs = Math.min(10, dotR * 1.5);
            ctx.font         = `700 ${fs}px "JetBrains Mono", monospace`;
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle    = `hsla(${n.hue},65%,30%,${(alpha * 0.82).toFixed(2)})`;
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
