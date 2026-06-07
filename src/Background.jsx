import { useEffect, useRef } from 'react';

/**
 * Sphere ↔ Circular Tunnel Neural Network
 *
 * SPHERE: Fibonacci sphere, nodes shaded by depth
 * TUNNEL: All nodes on cylinder SURFACE (same radius = circular rings)
 *         Edges computed in tunnel-space (nearby angle + Z only)
 *         flyZ advances slowly — calm drift through the tube
 */

const LANG_CODES = [
  'AR','FR','DE','ES','ZH','JA','KO','RU','PT','IT',
  'TR','NL','PL','SV','DA','FI','HE','FA','HI','TH',
  'VI','ID','MS','UK','CS','HU','RO','BG','EL','SK',
  'LT','LV','ET','HR','SR','SL','KA','AZ','AM','SW',
  'UR','BN','TA','TE','KN','ML','MN','UZ','KK','TL',
  'CY','EU','IS','AF','ZU','YO','IG','HA','SN','SO',
];

const NODE_COUNT  = 90;

// Sphere
const FOV_S       = 1200;
const S_NEIGH     = 5;     // sphere neighbours — complete geodesic mesh

// Tunnel
const TUBE_R      = 320;   // all nodes on this radius → perfect circle ring
const TUBE_LEN    = 2200;  // depth tile — lots of breathing room
const FOV_T       = 560;
const FLY_SPEED   = 0.55;  // slightly faster for stronger 3D immersion
const T_NEIGH     = 2;     // tunnel neighbours — sparse, clean

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

    /* ── Build nodes ── */
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes  = Array.from({ length: NODE_COUNT }, (_, i) => {
      // Sphere position (unit sphere)
      const yUnit = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const theta = golden * i;

      // Tunnel position — ALL on cylinder SURFACE (same radius = circular!)
      const angle = (i / NODE_COUNT) * Math.PI * 2 * 13.7; // spread via golden-like angle
      return {
        // Sphere (unit)
        sx: Math.cos(theta) * r,
        sy: yUnit,
        sz: Math.sin(theta) * r,
        // Tunnel (px) — same radius for all
        tx:    Math.cos(angle) * TUBE_R,
        ty:    Math.sin(angle) * TUBE_R,
        tz:    (i / NODE_COUNT) * TUBE_LEN,
        angle: ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2),
        label: Math.random() < 0.45 ? LANG_CODES[i % LANG_CODES.length] : null,
        hue:   210 + (i / NODE_COUNT) * 70,
        phase: Math.random() * Math.PI * 2,
      };
    });

    /* ── Sphere edges (sphere-space proximity) ── */
    const sEdgeSet = new Set();
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => { const dx=a.sx-b.sx,dy=a.sy-b.sy,dz=a.sz-b.sz; return{j,d:dx*dx+dy*dy+dz*dz}; })
        .sort((x,y)=>x.d-y.d).slice(1, S_NEIGH+1)
        .forEach(({j})=>sEdgeSet.add([Math.min(i,j),Math.max(i,j)].join('-')));
    });
    const sphereEdges = [...sEdgeSet].map(k=>k.split('-').map(Number));

    /* ── Tunnel edges (tunnel-space proximity — angle + Z only) ── */
    const tEdgeSet = new Set();
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => {
          // Distance in angle (wrap-around) + z
          let da = Math.abs(a.angle - b.angle);
          if (da > Math.PI) da = Math.PI * 2 - da;
          const dz = Math.abs(a.tz - b.tz);
          // Weight: prioritise same-ring (small da) connections
          return { j, d: da * 200 + dz };
        })
        .sort((x,y)=>x.d-y.d).slice(1, T_NEIGH+1)
        .forEach(({j})=>tEdgeSet.add([Math.min(i,j),Math.max(i,j)].join('-')));
    });
    const tunnelEdges = [...tEdgeSet].map(k=>k.split('-').map(Number));

    /* ── Sphere rotation ── */
    const rotateSphere = (x, y, z, rotY, rotX) => {
      const cosY=Math.cos(rotY),sinY=Math.sin(rotY);
      const rx=x*cosY+z*sinY, ry1=y, rz1=-x*sinY+z*cosY;
      const cosX=Math.cos(rotX),sinX=Math.sin(rotX);
      return { rx, ry:ry1*cosX-rz1*sinX, rz:ry1*sinX+rz1*cosX };
    };

    const df = rz => { const f=Math.max(0,Math.min(1,(1-rz)/2)); return f*f; };

    /* ── Draw ── */
    const draw = () => {
      t += 0.006;

      const mode     = window.__bgMode || 'cover';
      const isTunnel = mode === 'tunnel';

      tunnelBlend += ((isTunnel ? 1 : 0) - tunnelBlend) * 0.028;
      curCxFrac   += ((mode === 'cover' ? 0.72 : 0.5) - curCxFrac) * 0.028;

      if (tunnelBlend > 0.05) flyZ += FLY_SPEED * tunnelBlend;
      else flyZ *= 0.95;

      const R_sphere  = Math.min(W,H) * 0.27;
      const sphere_cx = W * curCxFrac;
      const rotY      = t * 0.13;
      const rotX      = Math.sin(t*0.21) * (0.14 * (1-tunnelBlend*0.9));

      /* Clear */
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0,0,W,H);

      /* Glow */
      const glowCx = sphere_cx*(1-tunnelBlend) + W*0.5*tunnelBlend;
      const glowR  = R_sphere*(1.5+tunnelBlend*1.6);
      const grd = ctx.createRadialGradient(glowCx,H/2,0,glowCx,H/2,glowR);
      grd.addColorStop(0,   `rgba(205,228,255,${0.45+tunnelBlend*0.15})`);
      grd.addColorStop(0.5, `rgba(220,210,255,${0.16+tunnelBlend*0.08})`);
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle=grd; ctx.fillRect(0,0,W,H);

      /* Project nodes */
      const projected = nodes.map(n => {
        // Sphere projection
        const {rx,ry,rz} = rotateSphere(n.sx,n.sy,n.sz,rotY,rotX);
        const depthS = rz*R_sphere + FOV_S;
        const scaleS = FOV_S/depthS;
        const sxS    = sphere_cx + rx*R_sphere*scaleS;
        const syS    = H*0.5 + ry*R_sphere*scaleS;
        const facS   = df(rz);

        // Tunnel projection — tile Z, nodes at TUBE_R from center
        const rawZ   = ((n.tz - flyZ) % TUBE_LEN + TUBE_LEN) % TUBE_LEN;
        const depthT = rawZ + 50;
        const scaleT = FOV_T / (FOV_T + depthT);
        const sxT    = W*0.5 + n.tx*scaleT;
        const syT    = H*0.5 + n.ty*scaleT;
        const facT   = Math.max(0, 1 - depthT/TUBE_LEN);

        const fac = facS*(1-tunnelBlend) + facT*tunnelBlend;
        return {
          sx: sxS*(1-tunnelBlend) + sxT*tunnelBlend,
          sy: syS*(1-tunnelBlend) + syT*tunnelBlend,
          fac, rz, depthT, scaleT,
        };
      });

      /* Draw edges — blend between sphere-edges and tunnel-edges */
      const drawEdges = (edgeList, alpha_mult, isTunnelEdge) => {
        edgeList.forEach(([i,j]) => {
          const a=projected[i], b=projected[j];
          if(!a||!b) return;

          // Skip wrap-around edges: if both nodes have very different effective Z,
          // one has recycled and the other hasn't — would draw a backward line
          if (isTunnelEdge && tunnelBlend > 0.3) {
            const rawZa = ((nodes[i].tz - flyZ) % TUBE_LEN + TUBE_LEN) % TUBE_LEN;
            const rawZb = ((nodes[j].tz - flyZ) % TUBE_LEN + TUBE_LEN) % TUBE_LEN;
            if (Math.abs(rawZa - rawZb) > TUBE_LEN * 0.38) return;
          }

          const avg   = (a.fac+b.fac)/2;
          const alpha = (0.10 + avg*0.52) * alpha_mult;
          if(alpha < 0.04) return;
          ctx.beginPath();
          ctx.moveTo(a.sx,a.sy);
          ctx.lineTo(b.sx,b.sy);
          ctx.strokeStyle = `hsla(${215+(1-avg)*25},68%,55%,${alpha.toFixed(2)})`;
          ctx.lineWidth   = 0.5 + avg*1.2;
          ctx.stroke();
        });
      };

      drawEdges(sphereEdges, 1 - tunnelBlend, false);
      drawEdges(tunnelEdges, tunnelBlend,     true);

      /* Draw nodes */
      nodes
        .map((n,i)=>({n,p:projected[i]}))
        .sort((a,b)=>a.p.fac-b.p.fac)
        .forEach(({n,p}) => {
          const alpha = 0.05 + p.fac*0.92;
          const dotR  = 0.8 + p.fac*8.0;

          if(p.fac > 0.6) {
            const pulse = 0.55+0.45*Math.sin(t*1.7+n.phase);
            const gr = ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,dotR*4);
            gr.addColorStop(0,`hsla(${n.hue},85%,62%,${(p.fac*0.25*pulse).toFixed(2)})`);
            gr.addColorStop(1,'transparent');
            ctx.fillStyle=gr;
            ctx.beginPath();
            ctx.arc(p.sx,p.sy,dotR*4,0,Math.PI*2);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.sx,p.sy,Math.max(0.5,dotR),0,Math.PI*2);
          ctx.fillStyle=`hsla(${n.hue},82%,48%,${alpha.toFixed(2)})`;
          ctx.fill();

          if(n.label && p.fac>0.75 && dotR>4.5) {
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
  }, []);

  return (
    <canvas ref={canvasRef}
      style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}} />
  );
}
