import { useEffect, useRef } from 'react';

/**
 * Sphere Neural Network Background
 *
 * SPHERE MODE  (cover + chapter titles): compact sphere, right/centered
 * EXPANDED MODE (content slides):        sphere grows to fill the whole canvas
 *                                        → nodes scatter across full screen
 *                                        → beautiful neural network wallpaper
 *
 * No tunnel. No recycling. No deletion. Just geometry + perspective.
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
const NEIGHBOURS = 5;
const FOV        = 1000;

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf, t = 0;

    // Smoothed state
    let curR      = 0.27;  // sphere radius as fraction of min(W,H)
    let curCxFrac = 0.72;  // horizontal center fraction

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    /* ── Fibonacci sphere nodes ── */
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes  = Array.from({ length: NODE_COUNT }, (_, i) => {
      const yUnit = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const theta = golden * i;
      return {
        x: Math.cos(theta) * r,
        y: yUnit,
        z: Math.sin(theta) * r,
        label: Math.random() < 0.45 ? LANG_CODES[i % LANG_CODES.length] : null,
        hue:   210 + (i / NODE_COUNT) * 70,
        phase: Math.random() * Math.PI * 2,
      };
    });

    /* ── k-nearest-neighbour edges ── */
    const edgeSet = new Set();
    nodes.forEach((a, i) => {
      nodes.map((b, j) => { const dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z; return{j,d:dx*dx+dy*dy+dz*dz}; })
        .sort((x,y)=>x.d-y.d).slice(1, NEIGHBOURS+1)
        .forEach(({j}) => edgeSet.add([Math.min(i,j),Math.max(i,j)].join('-')));
    });
    const edges = [...edgeSet].map(k=>k.split('-').map(Number));

    /* ── Rotation ── */
    const rotate = (x,y,z,rotY,rotX) => {
      const cosY=Math.cos(rotY),sinY=Math.sin(rotY);
      const rx=x*cosY+z*sinY, ry1=y, rz1=-x*sinY+z*cosY;
      const cosX=Math.cos(rotX),sinX=Math.sin(rotX);
      return { rx, ry:ry1*cosX-rz1*sinX, rz:ry1*sinX+rz1*cosX };
    };

    /* ── Draw ── */
    const draw = () => {
      t += 0.006;

      const mode      = window.__bgMode || 'cover';
      const isExpanded = mode === 'tunnel'; // content slides → expand

      // Target radius: compact sphere vs canvas-filling sphere
      const targetR      = isExpanded ? 1.6 : 0.27;
      const targetCxFrac = mode === 'cover' ? 0.72 : 0.5;

      // Smooth lerp (slow expansion = cinematic)
      const lerpSpeed = isExpanded ? 0.018 : 0.025;
      curR      += (targetR      - curR)      * lerpSpeed;
      curCxFrac += (targetCxFrac - curCxFrac) * 0.025;

      const R  = Math.min(W, H) * curR;
      const cx = W * curCxFrac;
      const cy = H * 0.5;

      // Rotation — slower when expanded (majestic)
      const spinSpeed = 0.10 - curR * 0.025;
      const rotY = t * spinSpeed;
      const rotX = Math.sin(t * 0.19) * 0.12 * (1 - Math.min(1,(curR-0.27)/1.3));

      /* Clear */
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0,0,W,H);

      /* Glow — expands with sphere */
      const glowR = R * 1.4;
      const grd = ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
      grd.addColorStop(0,   'rgba(205,228,255,0.42)');
      grd.addColorStop(0.55,'rgba(220,210,255,0.16)');
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle=grd; ctx.fillRect(0,0,W,H);

      /* Project all nodes */
      const proj = nodes.map(n => {
        const {rx,ry,rz} = rotate(n.x,n.y,n.z,rotY,rotX);
        const depth = rz * R + FOV;
        if (depth <= 1) return null;
        const scale = FOV / depth;
        // Depth factor: front=1, back=0 (quadratic)
        const f = Math.max(0, Math.min(1, (1-rz)/2));
        return {
          sx: cx + rx * R * scale,
          sy: cy + ry * R * scale,
          fac: f * f,
          rz,
        };
      });

      /* Edges — back to front, uniform alpha (all visible) */
      [...edges]
        .sort((a,b) => (proj[a[0]]?.rz??2) - (proj[b[0]]?.rz??2))
        .reverse()
        .forEach(([i,j]) => {
          const a=proj[i], b=proj[j];
          if(!a||!b) return;
          const avg = (a.fac+b.fac)/2;
          // Expanded: slightly more uniform so the whole canvas network is visible
          const minA = isExpanded ? 0.12 : 0.20;
          const alpha = minA + avg * 0.28;
          ctx.beginPath(); ctx.moveTo(a.sx,a.sy); ctx.lineTo(b.sx,b.sy);
          ctx.strokeStyle = `hsla(${215+(1-avg)*25},68%,55%,${alpha.toFixed(2)})`;
          ctx.lineWidth   = 0.6 + avg * 1.0;
          ctx.stroke();
        });

      /* Nodes — back to front */
      nodes.map((n,i)=>({n,p:proj[i]}))
        .filter(o=>o.p)
        .sort((a,b)=>b.p.fac-a.p.fac)
        .forEach(({n,p}) => {
          const alpha = 0.08 + p.fac * 0.88;
          const dotR  = 0.8 + p.fac * 8.0;

          if(p.fac > 0.55) {
            const pulse = 0.5 + 0.5*Math.sin(t*1.6+n.phase);
            const gr = ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,dotR*4);
            gr.addColorStop(0,`hsla(${n.hue},85%,62%,${(p.fac*0.22*pulse).toFixed(2)})`);
            gr.addColorStop(1,'transparent');
            ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(p.sx,p.sy,dotR*4,0,Math.PI*2); ctx.fill();
          }

          ctx.beginPath(); ctx.arc(p.sx,p.sy,Math.max(0.5,dotR),0,Math.PI*2);
          ctx.fillStyle=`hsla(${n.hue},82%,48%,${alpha.toFixed(2)})`; ctx.fill();

          if(n.label && p.fac>0.70 && dotR>3.5 && !isExpanded) {
            const fs=Math.min(10,dotR*1.5);
            ctx.font=`700 ${fs}px "JetBrains Mono",monospace`;
            ctx.textAlign='center'; ctx.textBaseline='bottom';
            ctx.fillStyle=`hsla(${n.hue},65%,30%,${(alpha*0.82).toFixed(2)})`;
            ctx.fillText(n.label,p.sx,p.sy-dotR-2);
          }
        });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',resize); };
  },[]);

  return <canvas ref={canvasRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}/>;
}
