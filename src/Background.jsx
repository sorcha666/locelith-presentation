import { useEffect, useRef } from 'react';

/**
 * Premium Sphere Neural Network
 *
 * What makes it look 3D:
 *  - QUADRATIC depth scaling: front nodes 9px, back nodes 1px
 *  - Back hemisphere nearly invisible (alpha ~0.04)
 *  - Soft glow on front-facing nodes
 *  - Only k=3 neighbours → sparse, elegant connections
 *  - Back edges almost invisible, front edges vivid
 */

const LANG_CODES = [
  'AR','FR','DE','ES','ZH','JA','KO','RU','PT','IT',
  'TR','NL','PL','SV','DA','FI','HE','FA','HI','TH',
  'VI','ID','MS','UK','CS','HU','RO','BG','EL','SK',
  'LT','LV','ET','HR','SR','SL','KA','AZ','AM','SW',
  'UR','BN','TA','TE','KN','ML','MN','UZ','KK','TL',
  'CY','EU','IS','AF','ZU','YO','IG','HA','SN','SO',
];

const NODE_COUNT = 110;
const NEIGHBOURS = 3;   // sparse → more elegant, less polygon-mesh look
const FOV        = 850;

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf, t = 0;

    let curCamAdv = 0;
    let curCxFrac = 0.65;

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

    /* ── k=3 nearest-neighbour edges (sparse) ── */
    const edgeSet = new Set();
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => { const dx=a.x-b.x, dy=a.y-b.y, dz=a.z-b.z; return { j, d: dx*dx+dy*dy+dz*dz }; })
        .sort((x, y) => x.d - y.d)
        .slice(1, NEIGHBOURS + 1)
        .forEach(({ j }) => edgeSet.add([Math.min(i,j), Math.max(i,j)].join('-')));
    });
    const edges = [...edgeSet].map(k => k.split('-').map(Number));

    /* ── Perspective projection ── */
    const project = (x, y, z, rotY, rotX, cx, cy, R, camAdv) => {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rx   = x * cosY + z * sinY;
      const ry   = y;
      const rz   = -x * sinY + z * cosY;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const ry2  = ry * cosX - rz * sinX;
      const rz2  = ry * sinX + rz * cosX;

      const depth = rz2 * R - camAdv * R;
      if (depth <= 6) return null;
      const p = FOV / (FOV + depth);

      return {
        sx:    cx + rx * R * p,
        sy:    cy + ry2 * R * p,
        scale: p,
        rz:    rz2,   // raw unit-sphere depth: -1=front, +1=back
      };
    };

    /* ── Depth factor helper: quadratic curve, front=1, back=0 ── */
    const df = rz => {
      const f = Math.max(0, Math.min(1, (1 - rz) / 2)); // 0=back, 1=front
      return f * f; // quadratic — dramatic falloff to back
    };

    /* ── Draw ── */
    const draw = () => {
      t += 0.006;

      const mode = window.__bgMode || 'cover';
      const targetCamAdv = mode === 'tunnel' ? 2.1 : 0;
      const targetCxFrac = mode === 'cover'  ? 0.65 : 0.5;

      const spd = 0.032;
      curCamAdv += (targetCamAdv - curCamAdv) * spd;
      curCxFrac += (targetCxFrac - curCxFrac) * spd;

      const R  = Math.min(W, H) * 0.34;
      const cx = W * curCxFrac;
      const cy = H * 0.5;

      const rotY = t * 0.13;
      const rotX = Math.sin(t * 0.2) * 0.13;

      /* Clear */
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, W, H);

      /* Atmosphere glow behind sphere */
      const aGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.35);
      aGrd.addColorStop(0,   'rgba(205,225,255,0.48)');
      aGrd.addColorStop(0.6, 'rgba(220,210,255,0.18)');
      aGrd.addColorStop(1,   'transparent');
      ctx.fillStyle = aGrd;
      ctx.fillRect(0, 0, W, H);

      /* Project */
      const proj = nodes.map(n =>
        project(n.x, n.y, n.z, rotY, rotX, cx, cy, R, curCamAdv)
      );

      /* Edges — sorted back to front */
      [...edges]
        .sort((a,b) => {
          const da = proj[a[0]] ? proj[a[0]].rz : 2;
          const db = proj[b[0]] ? proj[b[0]].rz : 2;
          return db - da;
        })
        .forEach(([i, j]) => {
          const a = proj[i], b = proj[j];
          if (!a || !b) return;

          const avgRz = (a.rz + b.rz) / 2;
          const fac   = df(avgRz);              // 0=back, 1=front
          const alpha = 0.03 + fac * 0.58;      // back: 0.03, front: 0.61
          const lw    = 0.4 + fac * 1.2;        // back: 0.4px, front: 1.6px
          const hue   = 215 + (1 - fac) * 25;

          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `hsla(${hue},70%,55%,${alpha.toFixed(2)})`;
          ctx.lineWidth   = lw;
          ctx.stroke();
        });

      /* Nodes — sorted back to front */
      nodes
        .map((n, i) => ({ n, p: proj[i] }))
        .filter(o => o.p)
        .sort((a, b) => b.p.rz - a.p.rz)
        .forEach(({ n, p }) => {
          const fac   = df(p.rz);
          const alpha = 0.04 + fac * 0.92;      // back: 0.04, front: 0.96
          const dotR  = 1.0 + fac * 8.5;        // back: 1px, front: 9.5px

          /* Glow on prominent front nodes */
          if (fac > 0.7) {
            const pulse    = 0.6 + 0.4 * Math.sin(t * 1.8 + n.phase);
            const glowSize = dotR * (3.5 + pulse);
            const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, glowSize);
            grd.addColorStop(0, `hsla(${n.hue},80%,65%,${(fac * 0.35 * pulse).toFixed(2)})`);
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, glowSize, 0, Math.PI * 2);
            ctx.fill();
          }

          /* Node dot */
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${n.hue},80%,48%,${alpha.toFixed(2)})`;
          ctx.fill();

          /* Language label */
          if (n.label && fac > 0.82 && dotR > 5 && mode !== 'tunnel') {
            const fs = Math.min(10, dotR * 1.6);
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
