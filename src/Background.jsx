import { useEffect, useRef } from 'react';

/**
 * Sphere → Cylinder Tunnel Neural Network
 *
 * Each node has TWO positions:
 *   spherePos  — point on Fibonacci sphere surface
 *   tunnelPos  — point in an infinite cylinder (tube)
 *
 * tunnelBlend (0→1) lerps between them.
 * flyZ accumulates in tunnel mode so tunnel nodes rush toward camera
 * from a central vanishing point — exactly like the original tunnel.
 */

const LANG_CODES = [
  'AR','FR','DE','ES','ZH','JA','KO','RU','PT','IT',
  'TR','NL','PL','SV','DA','FI','HE','FA','HI','TH',
  'VI','ID','MS','UK','CS','HU','RO','BG','EL','SK',
  'LT','LV','ET','HR','SR','SL','KA','AZ','AM','SW',
  'UR','BN','TA','TE','KN','ML','MN','UZ','KK','TL',
  'CY','EU','IS','AF','ZU','YO','IG','HA','SN','SO',
];

const NODE_COUNT  = 110;
const NEIGHBOURS  = 4;

// Sphere constants
const FOV_S = 1200;

// Tunnel constants
const TUBE_R    = 165;   // cylinder radius in px
const TUBE_LEN  = 900;   // tile length — nodes recycle every 900px
const FOV_T     = 480;   // tunnel perspective FOV
const FLY_SPEED = 0.9;   // px per frame — moderate, calm

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf, t = 0;

    let curCxFrac   = 0.72;
    let tunnelBlend = 0;
    let flyZ        = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Build nodes — Fibonacci sphere positions ── */
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes  = Array.from({ length: NODE_COUNT }, (_, i) => {
      const yUnit = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const theta = golden * i;

      // Sphere position (unit sphere, scaled by R in draw)
      const sx = Math.cos(theta) * r;
      const sy = yUnit;
      const sz = Math.sin(theta) * r;

      // Tunnel position — random angle + radius in cylinder, random Z in [0, TUBE_LEN]
      const angle  = Math.random() * Math.PI * 2;
      const tR     = TUBE_R * (0.25 + 0.75 * Math.sqrt(Math.random()));
      const tx     = Math.cos(angle) * tR;
      const ty     = Math.sin(angle) * tR;
      const tz     = Math.random() * TUBE_LEN;

      return {
        sx, sy, sz,         // sphere (unit)
        tx, ty, tz,         // tunnel (px)
        label: Math.random() < 0.5 ? LANG_CODES[i % LANG_CODES.length] : null,
        hue:   210 + (i / NODE_COUNT) * 70,
        phase: Math.random() * Math.PI * 2,
      };
    });

    /* ── k-nearest-neighbour edges (sphere space) ── */
    const edgeSet = new Set();
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => {
          const dx=a.sx-b.sx, dy=a.sy-b.sy, dz=a.sz-b.sz;
          return { j, d: dx*dx+dy*dy+dz*dz };
        })
        .sort((x, y) => x.d - y.d)
        .slice(1, NEIGHBOURS + 1)
        .forEach(({ j }) => edgeSet.add([Math.min(i,j), Math.max(i,j)].join('-')));
    });
    const edges = [...edgeSet].map(k => k.split('-').map(Number));

    /* ── Sphere rotation ── */
    const rotateSphere = (x, y, z, rotY, rotX) => {
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

    /* ── Depth factor for sphere shading: quadratic, 1=front, 0=back ── */
    const df = rz => { const f = Math.max(0, Math.min(1, (1 - rz) / 2)); return f * f; };

    /* ── Draw ── */
    const draw = () => {
      t += 0.006;

      const mode     = window.__bgMode || 'cover';
      const isTunnel = mode === 'tunnel';

      // Blend targets
      const targetTBlend  = isTunnel ? 1 : 0;
      const targetCxFrac  = mode === 'cover' ? 0.72 : 0.5;
      tunnelBlend += (targetTBlend - tunnelBlend) * 0.028;
      curCxFrac   += (targetCxFrac - curCxFrac)   * 0.028;

      // flyZ: advance in tunnel mode, decelerate when returning to sphere
      if (tunnelBlend > 0.05) flyZ += FLY_SPEED * tunnelBlend;
      else flyZ *= 0.95;

      // Sphere params
      const R_sphere  = Math.min(W, H) * 0.27;
      const sphere_cx = W * curCxFrac;
      const rotY      = t * 0.13;
      const rotX      = Math.sin(t * 0.21) * (0.14 * (1 - tunnelBlend * 0.8));

      /* Clear */
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, W, H);

      /* Background glow */
      const glowCx = sphere_cx * (1 - tunnelBlend) + W * 0.5 * tunnelBlend;
      const glowR  = R_sphere * (1.6 + tunnelBlend * 1.4);
      const grd = ctx.createRadialGradient(glowCx, H/2, 0, glowCx, H/2, glowR);
      grd.addColorStop(0,    `rgba(205,228,255,${0.48 + tunnelBlend * 0.18})`);
      grd.addColorStop(0.55, `rgba(220,210,255,${0.18 + tunnelBlend * 0.08})`);
      grd.addColorStop(1,    'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      /* ── Project each node ──
         Blend between sphere projection and tunnel projection             */
      const projected = nodes.map(n => {
        // ── SPHERE projection ──
        const { rx, ry, rz } = rotateSphere(n.sx, n.sy, n.sz, rotY, rotX);
        const depthS  = rz * R_sphere + FOV_S;
        const scaleS  = FOV_S / depthS;
        const sxS     = sphere_cx + rx * R_sphere * scaleS;
        const syS     = H * 0.5 + ry * R_sphere * scaleS;

        // ── TUNNEL projection ──
        // Tile the Z position: nodes recycle ahead of camera
        const rawZ   = ((n.tz - flyZ) % TUBE_LEN + TUBE_LEN) % TUBE_LEN;
        const depthT = rawZ + 40; // camera offset so no z-fighting at z=0
        const scaleT = FOV_T / (FOV_T + depthT);
        const sxT    = W * 0.5 + n.tx * scaleT;
        const syT    = H * 0.5 + n.ty * scaleT;

        // Blend positions
        const blX = sxS * (1 - tunnelBlend) + sxT * tunnelBlend;
        const blY = syS * (1 - tunnelBlend) + syT * tunnelBlend;

        // Shading factor:
        // sphere: quadratic depth from rz
        // tunnel: proximity (close nodes = bright, far = dim)
        const facS = df(rz);
        const facT = Math.max(0, 1 - depthT / TUBE_LEN);
        const fac  = facS * (1 - tunnelBlend) + facT * tunnelBlend;

        return { sx: blX, sy: blY, fac, rz, depthT };
      });

      /* ── EDGES ── */
      edges.forEach(([i, j]) => {
        const a = projected[i], b = projected[j];
        if (!a || !b) return;
        const avgFac = (a.fac + b.fac) / 2;
        const alpha  = 0.04 + avgFac * 0.60;
        if (alpha < 0.05) return;
        const hue = 215 + (1 - avgFac) * 25;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = `hsla(${hue},70%,54%,${alpha.toFixed(2)})`;
        ctx.lineWidth   = 0.5 + avgFac * 1.4;
        ctx.stroke();
      });

      /* ── NODES — sort by fac ascending (dim nodes first, vivid on top) ── */
      nodes
        .map((n, i) => ({ n, p: projected[i] }))
        .sort((a, b) => a.p.fac - b.p.fac)
        .forEach(({ n, p }) => {
          const alpha = 0.05 + p.fac * 0.92;
          const dotR  = 0.8 + p.fac * 8.0;

          /* Glow on vivid nodes */
          if (p.fac > 0.6) {
            const pulse = 0.55 + 0.45 * Math.sin(t * 1.7 + n.phase);
            const gr    = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, dotR * 4);
            gr.addColorStop(0, `hsla(${n.hue},85%,62%,${(p.fac * 0.28 * pulse).toFixed(2)})`);
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

          /* Language label */
          if (n.label && p.fac > 0.75 && dotR > 4.5) {
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
