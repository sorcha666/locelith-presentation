import { useEffect, useRef } from 'react';

/**
 * Pseudo-3D Neural Network Tunnel — pure 2D canvas, no WebGL, no crash.
 *
 * As the user scrolls, the virtual camera flies forward through a
 * long tunnel of glowing interconnected nodes. The network slowly
 * rotates in 3D space (perspective projection — manual math, no lib).
 *
 * Inspired by: scroll-driven camera fly-through (Iron Man site technique)
 */
export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, raf, t = 0;
    let scrollProgress = 0; // 0 → 1 driven by page scroll

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
      scrollProgress = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Generate 3D nodes in a long tunnel ── */
    const NODE_COUNT = 220;
    const TUNNEL_LEN  = 2400;  // total depth of the tunnel (z-units)
    const TUNNEL_R    = 180;   // radius of the cylinder

    const nodes = Array.from({ length: NODE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const r     = TUNNEL_R * (0.2 + 0.8 * Math.sqrt(Math.random())); // denser at edge
      return {
        x:     Math.cos(angle) * r,
        y:     Math.sin(angle) * r,
        z:     Math.random() * TUNNEL_LEN,
        hue:   Math.random() > 0.6 ? 265 : 220,        // purple or blue
        phase: Math.random() * Math.PI * 2,
      };
    });

    /* ── Build connections once (nearby nodes) ── */
    const edges = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        if (dx*dx + dy*dy + dz*dz < 90*90) {
          edges.push([i, j]);
        }
      }
    }

    /* ── Perspective projection helper ── */
    const FOV = 320;
    const project = (x, y, z, camZ, rotY) => {
      // Rotate around Y axis
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rx = x * cosY + z * sinY;
      const ry = y;
      const rz = -x * sinY + z * cosY;

      const depth = rz - camZ;
      if (depth <= 0) return null; // behind camera

      const scale = FOV / depth;
      return {
        sx:    W * 0.5 + rx * scale,
        sy:    H * 0.5 + ry * scale,
        scale,
        depth,
      };
    };

    /* ── Draw loop ── */
    const draw = () => {
      t += 0.006;

      // Camera Z: start just before z=0, fly to near end of tunnel
      const camZ = -80 + scrollProgress * (TUNNEL_LEN - 140);
      // Slow ambient Y-rotation
      const rotY = t * 0.06;
      // Gentle camera sway
      const swayX = Math.sin(t * 0.22) * 6;
      const swayY = Math.cos(t * 0.18) * 4;

      /* Clear with very light background */
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, W, H);

      /* Subtle radial glow at vanishing point */
      const grd = ctx.createRadialGradient(W/2 + swayX, H/2 + swayY, 0, W/2 + swayX, H/2 + swayY, W * 0.55);
      grd.addColorStop(0, 'rgba(219,234,254,0.7)');  // very light blue centre
      grd.addColorStop(0.5, 'rgba(237,233,254,0.3)'); // faint purple mid
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      /* Project all nodes (skip those behind camera or too far) */
      const projected = nodes.map(n => {
        const p = project(n.x + swayX * 0.08, n.y + swayY * 0.08, n.z, camZ, rotY);
        return p;
      });

      /* Draw edges */
      edges.forEach(([i, j]) => {
        const a = projected[i], b = projected[j];
        if (!a || !b) return;
        if (a.depth > TUNNEL_LEN || b.depth > TUNNEL_LEN) return;

        // Fade with depth
        const alpha = Math.min(0.18, 0.18 * (1 - (a.depth + b.depth) / (2 * TUNNEL_LEN)));
        if (alpha < 0.01) return;

        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = `rgba(59,130,246,${alpha})`;  // blue
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      /* Draw nodes */
      nodes.forEach((n, i) => {
        const p = projected[i];
        if (!p || p.depth > TUNNEL_LEN) return;

        const pulse   = 0.5 + 0.5 * Math.sin(t * 1.4 + n.phase);
        const r       = Math.max(0.3, p.scale * 3.5);
        const alpha   = Math.min(0.9, (0.4 + 0.4 * pulse) * (1 - p.depth / TUNNEL_LEN));
        if (alpha < 0.02) return;

        // Glow halo
        const halo = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 4);
        halo.addColorStop(0, `hsla(${n.hue},80%,60%,${alpha * 0.5})`);
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue},75%,55%,${alpha})`;
        ctx.fill();
      });

      /* Subtle vignette at the screen edge to feel like a cockpit view */
      const vig = ctx.createRadialGradient(W/2, H/2, H * 0.35, W/2, H/2, H * 0.9);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(240,240,245,0.4)');
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
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
