import { useEffect, useRef } from 'react';

/**
 * Sphere ↔ Tunnel Neural Network
 *
 * SPHERE MODE (cover + chapter titles):
 *   - Fibonacci sphere, spinning on Y-axis, static camera
 *
 * TUNNEL MODE (content slides):
 *   - Same sphere geometry, but camera enters the sphere AND
 *   - flyZ accumulates each frame → nodes continuously rush
 *     toward the camera, get recycled from far ahead
 *   - Creates genuine "flying through a neural wormhole" feel
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
const FOV        = 1200;
const TILE       = 700;  // recycle period in px — nodes wrap every TILE units

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf, t = 0;

    // Sphere position state
    let curCamAdv = 0;    // 0=outside sphere, 1.5=inside
    let curCxFrac = 0.72; // horizontal center of sphere (fraction of W)

    // Tunnel state
    let flyZ      = 0;    // accumulated flight distance — grows in tunnel mode
    let tunnelBlend = 0;  // 0=sphere, 1=full tunnel (used for glow/colour blending)

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

    /* ── Rotation helpers ── */
    const rotate = (x, y, z, rotY, rotX) => {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rx   = x * cosY + z * sinY;
      const ry1  = y;
      const rz1  = -x * sinY + z * cosY;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      return {
        rx,
        ry: ry1 * cosX - rz1 * sinX,
        rz: ry1 * sinX + rz1 * cosX,
      };
    };

    /* ── Depth factor: quadratic, 1=front, 0=back (for sphere shading) ── */
    const df = rz => {
      const f = Math.max(0, Math.min(1, (1 - rz) / 2));
      return f * f;
    };

    /* ── Draw ── */
    const draw = () => {
      t += 0.006;

      const mode = window.__bgMode || 'cover';
      const isTunnel = mode === 'tunnel';

      /* Target values */
      const targetCamAdv  = isTunnel ? 1.4 : 0;
      const targetCxFrac  = mode === 'cover' ? 0.72 : 0.5;
      const targetTBlend  = isTunnel ? 1 : 0;

      const lerpSpd = 0.03;
      curCamAdv   += (targetCamAdv  - curCamAdv)   * lerpSpd;
      curCxFrac   += (targetCxFrac  - curCxFrac)   * lerpSpd;
      tunnelBlend += (targetTBlend  - tunnelBlend)  * lerpSpd;

      /* In tunnel mode: advance flyZ to create continuous forward motion */
      if (isTunnel) {
        flyZ += 1.8; // speed of flight through tunnel (px per frame)
      } else {
        // Slowly decelerate when returning to sphere
        flyZ *= 0.94;
      }

      const R   = Math.min(W, H) * 0.27;
      const cx  = W * (isTunnel ? 0.5 : curCxFrac);
      const cy  = H * 0.5;

      /* Rotation — in sphere mode spin slowly, in tunnel mode spin faster */
      const spinSpeed = 0.08 + tunnelBlend * 0.12;
      const rotY = t * spinSpeed;
      const rotX = Math.sin(t * 0.21) * (0.14 - tunnelBlend * 0.10);

      /* Clear */
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, W, H);

      /* Background glow — shifts to center tunnel glow in tunnel mode */
      const glowCx = W * (curCxFrac * (1 - tunnelBlend) + 0.5 * tunnelBlend);
      const glowR  = R * (1.6 + tunnelBlend * 1.2);
      const grd = ctx.createRadialGradient(glowCx, cy, 0, glowCx, cy, glowR);
      grd.addColorStop(0,    `rgba(200,225,255,${0.50 + tunnelBlend * 0.2})`);
      grd.addColorStop(0.55, `rgba(220,210,255,${0.18 + tunnelBlend * 0.1})`);
      grd.addColorStop(1,    'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      /* ── Project each node ── */
      const projected = nodes.map((n, idx) => {
        const { rx, ry, rz } = rotate(n.x, n.y, n.z, rotY, rotX);

        // Base depth: camera at z = -FOV + curCamAdv*R (moving into sphere)
        let baseDepth = rz * R + FOV - curCamAdv * R;

        // In tunnel mode: apply flyZ and tile nodes so they continuously recycle
        let depth = baseDepth;
        if (tunnelBlend > 0.05) {
          // Shift depth by flyZ, then wrap into [10, TILE+10]
          const shifted = baseDepth - (flyZ % TILE);
          depth = ((shifted % TILE) + TILE) % TILE + 10;
          // Blend between sphere depth and tiled tunnel depth
          depth = baseDepth * (1 - tunnelBlend) + depth * tunnelBlend;
        }

        if (depth <= 2 || depth > FOV * 2.5) return null;

        const scale = FOV / depth;
        return {
          sx:   cx + rx * R * scale,
          sy:   cy + ry * R * scale,
          rz,          // raw unit-sphere z for shading
          depth,       // actual depth for sizing
          scale,
        };
      });

      /* ── EDGES — back to front ── */
      [...edges]
        .sort((a, b) => (projected[a[0]]?.rz ?? 2) - (projected[b[0]]?.rz ?? 2))
        .reverse()
        .forEach(([i, j]) => {
          const a = projected[i], b = projected[j];
          if (!a || !b) return;

          // Sphere shading by rz; tunnel shading by depth (closer = brighter)
          const facSph    = df((a.rz + b.rz) / 2);
          const avgDepth  = (a.depth + b.depth) / 2;
          const facTun    = Math.max(0, 1 - avgDepth / (TILE * 0.9));
          const fac       = facSph * (1 - tunnelBlend) + facTun * tunnelBlend;

          const alpha = 0.04 + fac * 0.62;
          if (alpha < 0.05) return;
          const hue   = 215 + (1 - fac) * 25;

          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `hsla(${hue},70%,54%,${alpha.toFixed(2)})`;
          ctx.lineWidth   = 0.5 + fac * 1.4;
          ctx.stroke();
        });

      /* ── NODES — back to front ── */
      nodes
        .map((n, i) => ({ n, p: projected[i] }))
        .filter(o => o.p)
        .sort((a, b) => b.p.depth - a.p.depth)
        .forEach(({ n, p }) => {
          const facSph  = df(p.rz);
          const facTun  = Math.max(0, 1 - p.depth / (TILE * 0.9));
          const fac     = facSph * (1 - tunnelBlend) + facTun * tunnelBlend;

          const alpha = 0.05 + fac * 0.92;
          const dotR  = 0.8 + fac * 8.5;

          /* Glow on vivid front/close nodes */
          if (fac > 0.6) {
            const pulse = 0.55 + 0.45 * Math.sin(t * 1.7 + n.phase);
            const gr    = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, dotR * 4);
            gr.addColorStop(0, `hsla(${n.hue},85%,62%,${(fac * 0.30 * pulse).toFixed(2)})`);
            gr.addColorStop(1, 'transparent');
            ctx.fillStyle = gr;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, dotR * 4, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(0.5, dotR), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${n.hue},82%,48%,${alpha.toFixed(2)})`;
          ctx.fill();

          /* Language label — sphere mode only, on close front nodes */
          if (n.label && !isTunnel && fac > 0.80 && dotR > 5) {
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
