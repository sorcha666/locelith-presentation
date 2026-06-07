import { useEffect, useRef } from 'react';

/**
 * Pseudo-3D Neural Network Tunnel — pure 2D canvas, no WebGL.
 *
 * Fixes:
 *  1. Infinite looping tunnel — nodes are recycled ahead of the camera so
 *     the network NEVER ends, regardless of scroll depth.
 *  2. ISO language codes rendered on select nodes, giving the network a
 *     multilingual identity that reinforces the "112 languages" claim.
 *  3. Camera travels at a comfortable depth — always inside the tunnel.
 */

const LANG_CODES = [
  'AR','FR','DE','ES','ZH','JA','KO','RU','PT','IT',
  'TR','NL','PL','SV','DA','FI','HE','FA','HI','TH',
  'VI','ID','MS','UK','CS','HU','RO','BG','EL','SK',
  'LT','LV','ET','HR','SR','SL','MK','SQ','KA','AZ',
  'AM','SW','UR','BN','PA','MR','TA','TE','KN','ML',
  'SI','NE','MY','KM','LO','MN','UZ','TK','KY','KK',
  'TL','JV','SU','CEB','HT','LA','CY','EU','IS','AF',
  'ZU','YO','IG','HA','SN','SO','RW','MG','NY','ST',
];

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, raf, t = 0;
    let scrollProgress = 0;

    /* ── Resize ── */
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Scroll tracking ── */
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Tunnel dimensions ── */
    const NODE_COUNT  = 200;
    const SEGMENT_LEN = 800;   // one repeating segment of tunnel
    const TUNNEL_R    = 170;

    /* ── Generate one segment of nodes (we'll tile them) ── */
    const baseNodes = Array.from({ length: NODE_COUNT }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const r     = TUNNEL_R * (0.15 + 0.85 * Math.sqrt(Math.random()));
      const hasLabel = Math.random() < 0.28; // ~28% of nodes get a language label
      return {
        x:        Math.cos(angle) * r,
        y:        Math.sin(angle) * r,
        zOffset:  Math.random() * SEGMENT_LEN, // position within one segment
        hue:      Math.random() > 0.55 ? 265 : 215, // purple or blue
        phase:    Math.random() * Math.PI * 2,
        label:    hasLabel ? LANG_CODES[i % LANG_CODES.length] : null,
      };
    });

    /* ── Build local edges within one segment ── */
    const edges = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = baseNodes[i].x - baseNodes[j].x;
        const dy = baseNodes[i].y - baseNodes[j].y;
        const dz = baseNodes[i].zOffset - baseNodes[j].zOffset;
        if (dx*dx + dy*dy + dz*dz < 85*85) {
          edges.push([i, j]);
        }
      }
    }

    /* ── Perspective projection ── */
    const FOV = 340;
    const project = (x, y, z, camZ, rotY) => {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rx = x * cosY + z * sinY;
      const ry = y;
      const rz = -x * sinY + z * cosY;

      const depth = rz - camZ;
      if (depth <= 8) return null;

      const scale = FOV / depth;
      return { sx: W * 0.5 + rx * scale, sy: H * 0.5 + ry * scale, scale, depth };
    };

    /* ── Draw loop ── */
    const RENDER_AHEAD = SEGMENT_LEN * 2.2; // how far ahead we render nodes
    const FADE_START   = SEGMENT_LEN * 1.4; // depth at which nodes start fading

    const draw = () => {
      t += 0.005;

      // Camera travels a fraction of SEGMENT_LEN — it loops seamlessly
      const camZ  = scrollProgress * SEGMENT_LEN * 0.82;
      const rotY  = t * 0.055;
      const swayX = Math.sin(t * 0.21) * 5;
      const swayY = Math.cos(t * 0.16) * 3;

      // Clear
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, W, H);

      // Radial glow at vanishing point
      const grd = ctx.createRadialGradient(W/2+swayX, H/2+swayY, 0, W/2+swayX, H/2+swayY, W*0.6);
      grd.addColorStop(0,   'rgba(219,234,254,0.65)');
      grd.addColorStop(0.5, 'rgba(237,233,254,0.25)');
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      /* Project nodes — for each node we tile it across multiple segments
         (the node's world Z = n.zOffset + k*SEGMENT_LEN for integer k)
         We find the k value that places it just ahead of the camera. */
      const projected = baseNodes.map(n => {
        // Find the nearest segment copy that is AHEAD of camZ
        const raw = n.zOffset;
        // How many full segments ahead of camZ?
        const segOffset = Math.floor((camZ - raw) / SEGMENT_LEN) + 1;
        const worldZ = raw + segOffset * SEGMENT_LEN;
        const depth = worldZ - camZ;

        if (depth < 8 || depth > RENDER_AHEAD) return null;
        return project(n.x + swayX * 0.07, n.y + swayY * 0.07, worldZ, camZ, rotY);
      });

      /* Draw edges */
      edges.forEach(([i, j]) => {
        const a = projected[i], b = projected[j];
        if (!a || !b) return;
        const avgDepth = (a.depth + b.depth) / 2;
        const alpha = 0.18 * Math.max(0, 1 - avgDepth / FADE_START);
        if (alpha < 0.01) return;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      /* Draw nodes + language labels */
      baseNodes.forEach((n, i) => {
        const p = projected[i];
        if (!p) return;

        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + n.phase);
        const r     = Math.max(0.3, p.scale * 3.8);
        const alpha = Math.min(0.95, (0.45 + 0.4 * pulse) * Math.max(0, 1 - p.depth / FADE_START));
        if (alpha < 0.02) return;

        // Glow halo
        const halo = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 4.5);
        halo.addColorStop(0, `hsla(${n.hue},80%,60%,${alpha * 0.45})`);
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue},75%,55%,${alpha})`;
        ctx.fill();

        // Language label — only render when node is large enough to be legible
        if (n.label && r > 1.8) {
          const fontSize = Math.min(11, Math.max(7, r * 3.2));
          ctx.font = `700 ${fontSize}px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          // Background pill for readability
          const tw = ctx.measureText(n.label).width;
          ctx.fillStyle = `hsla(${n.hue},80%,96%,${alpha * 0.85})`;
          ctx.beginPath();
          ctx.roundRect(p.sx - tw/2 - 3, p.sy - r - fontSize - 4, tw + 6, fontSize + 4, 3);
          ctx.fill();

          ctx.fillStyle = `hsla(${n.hue},70%,40%,${alpha})`;
          ctx.fillText(n.label, p.sx, p.sy - r - 2);
        }
      });

      // Soft vignette
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.95);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(240,240,245,0.45)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

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
