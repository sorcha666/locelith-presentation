import { useEffect, useRef } from 'react';

/**
 * Circuit-board background that mirrors the Locelith logo aesthetic:
 *  – White / very light blue canvas
 *  – Animated navy-to-purple gradient "L" shaped circuit traces
 *  – Glowing node dots that pulse
 *  – Language characters floating gently (A, 語, अ, ع, 文, 한, ส, α)
 */
export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height, animId;
    let t = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Circuit segments ──────────────────────────────────────────────
    // Each segment: { x1,y1,x2,y2, color, width, phase }
    const buildCircuits = () => {
      const segs = [];
      const cols = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#7C3AED', '#8B5CF6', '#06B6D4'];
      const count = 22;
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const len = 80 + Math.random() * 180;
        const horizontal = Math.random() > 0.5;
        segs.push({
          x1: x, y1: y,
          x2: horizontal ? x + len : x,
          y2: horizontal ? y : y + len,
          color: cols[Math.floor(Math.random() * cols.length)],
          lw: 0.8 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.6,
        });
        // L-bend: add perpendicular leg from end of this one
        if (Math.random() > 0.4) {
          const len2 = 40 + Math.random() * 120;
          const x2e = horizontal ? x + len : x;
          const y2e = horizontal ? y : y + len;
          segs.push({
            x1: x2e, y1: y2e,
            x2: horizontal ? x2e : x2e + len2,
            y2: horizontal ? y2e + len2 : y2e,
            color: cols[Math.floor(Math.random() * cols.length)],
            lw: 0.6 + Math.random() * 0.8,
            phase: Math.random() * Math.PI * 2,
            speed: 0.2 + Math.random() * 0.5,
          });
        }
      }
      return segs;
    };

    // ── Node dots ─────────────────────────────────────────────────────
    const buildNodes = () => {
      const nodes = [];
      const count = 30;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 2 + Math.random() * 3,
          color: Math.random() > 0.5 ? '#2563EB' : '#7C3AED',
          phase: Math.random() * Math.PI * 2,
        });
      }
      return nodes;
    };

    // ── Language chars ────────────────────────────────────────────────
    const chars = ['A', '語', 'अ', 'ع', '文', '한', 'ส', 'α', 'Я', 'あ', 'ب', 'ñ'];
    const buildChars = () => chars.map((ch, i) => ({
      ch,
      x: 60 + Math.random() * (width - 120),
      y: 60 + Math.random() * (height - 120),
      size: 14 + Math.random() * 10,
      color: Math.random() > 0.5 ? '#1E3A8A' : '#7C3AED',
      phase: (i / chars.length) * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    let circuits = buildCircuits();
    let nodes = buildNodes();
    let charItems = buildChars();

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      // ── Circuit traces ──
      circuits.forEach(seg => {
        const alpha = 0.06 + 0.06 * Math.sin(t * seg.speed + seg.phase);
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.strokeStyle = seg.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = seg.lw;
        ctx.lineCap = 'round';
        ctx.stroke();
        // Dot at each end
        [{ x: seg.x1, y: seg.y1 }, { x: seg.x2, y: seg.y2 }].forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, seg.lw * 2, 0, Math.PI * 2);
          ctx.fillStyle = seg.color;
          ctx.fill();
        });
      });

      // ── Node dots ──
      nodes.forEach(nd => {
        const pulse = 0.12 + 0.1 * Math.sin(t * 1.2 + nd.phase);
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
        ctx.fillStyle = nd.color;
        ctx.globalAlpha = pulse;
        ctx.fill();
        // Halo
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = nd.color;
        ctx.globalAlpha = pulse * 0.25;
        ctx.fill();
      });

      // ── Floating language chars ──
      charItems.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.x < 0 || c.x > width)  c.vx *= -1;
        if (c.y < 0 || c.y > height) c.vy *= -1;
        const alpha = 0.06 + 0.04 * Math.sin(t * 0.8 + c.phase);
        ctx.font = `600 ${c.size}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = c.color;
        ctx.globalAlpha = alpha;
        ctx.fillText(c.ch, c.x, c.y);
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
