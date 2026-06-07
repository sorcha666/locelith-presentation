import { useEffect, useRef } from 'react';

const LANG_CODES = [
  'AR','FR','DE','ES','ZH','JA','KO','RU','PT','IT',
  'TR','NL','PL','SV','DA','FI','HE','FA','HI','TH',
  'VI','ID','MS','UK','CS','HU','RO','BG','EL','SK',
  'LT','LV','ET','HR','SR','SL','KA','AZ','AM','SW',
  'UR','BN','TA','TE','KN','ML','MN','UZ','KK','TL',
];

const NODE_COUNT = 140;
const S_NEIGH    = 5;

// Tunnel — nodes recycle ONLY when behind camera (no fading)
const TUBE_R     = 300;
const TUBE_LEN   = 3000;  // long tube — many nodes always visible
const FOV_T      = 600;
const FAR_CLIP   = 2800;  // don't render nodes farther than this
const FLY_SPEED  = 0.5;
const T_NEIGH    = 2;
const FOV_S      = 1200;

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf, t = 0;
    let curCxFrac   = 0.72;
    let tunnelBlend = 0;
    let flyZ        = 0;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes  = Array.from({ length: NODE_COUNT }, (_, i) => {
      const yUnit = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r     = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const theta = golden * i;
      const angle = (i / NODE_COUNT) * Math.PI * 2 * 13.7;
      return {
        sx: Math.cos(theta) * r, sy: yUnit, sz: Math.sin(theta) * r,
        tx: Math.cos(angle) * TUBE_R,
        ty: Math.sin(angle) * TUBE_R,
        tz: (i / NODE_COUNT) * TUBE_LEN,   // mutable — recycled when behind camera
        angle: ((angle % (Math.PI*2)) + Math.PI*2) % (Math.PI*2),
        label: Math.random() < 0.45 ? LANG_CODES[i % LANG_CODES.length] : null,
        hue: 210 + (i / NODE_COUNT) * 70,
        phase: Math.random() * Math.PI * 2,
      };
    });

    // Sphere edges
    const sEdgeSet = new Set();
    nodes.forEach((a, i) => {
      nodes.map((b,j) => { const dx=a.sx-b.sx,dy=a.sy-b.sy,dz=a.sz-b.sz; return{j,d:dx*dx+dy*dy+dz*dz}; })
        .sort((x,y)=>x.d-y.d).slice(1,S_NEIGH+1)
        .forEach(({j})=>sEdgeSet.add([Math.min(i,j),Math.max(i,j)].join('-')));
    });
    const sphereEdges = [...sEdgeSet].map(k=>k.split('-').map(Number));

    // Tunnel edges (angle+Z proximity)
    const tEdgeSet = new Set();
    nodes.forEach((a,i) => {
      nodes.map((b,j) => {
        let da = Math.abs(a.angle-b.angle); if(da>Math.PI) da=Math.PI*2-da;
        return {j, d: da*200 + Math.abs(a.tz-b.tz)};
      }).sort((x,y)=>x.d-y.d).slice(1,T_NEIGH+1)
        .forEach(({j})=>tEdgeSet.add([Math.min(i,j),Math.max(i,j)].join('-')));
    });
    const tunnelEdges = [...tEdgeSet].map(k=>k.split('-').map(Number));

    const rotateSphere = (x,y,z,rotY,rotX) => {
      const cosY=Math.cos(rotY),sinY=Math.sin(rotY);
      const rx=x*cosY+z*sinY,ry1=y,rz1=-x*sinY+z*cosY;
      const cosX=Math.cos(rotX),sinX=Math.sin(rotX);
      return{rx,ry:ry1*cosX-rz1*sinX,rz:ry1*sinX+rz1*cosX};
    };
    const df = rz => { const f=Math.max(0,Math.min(1,(1-rz)/2)); return f*f; };

    const draw = () => {
      t += 0.006;
      const mode = window.__bgMode || 'cover';
      const isTunnel = mode === 'tunnel';
      tunnelBlend += ((isTunnel?1:0) - tunnelBlend) * 0.028;
      curCxFrac   += ((mode==='cover'?0.72:0.5) - curCxFrac) * 0.028;

      // Advance flight
      if (tunnelBlend > 0.05) flyZ += FLY_SPEED * tunnelBlend;
      else flyZ *= 0.95;

      // Recycle nodes that passed BEHIND camera (they're invisible — no pop)
      if (tunnelBlend > 0.3) {
        nodes.forEach(n => {
          while (n.tz - flyZ < 5) n.tz += TUBE_LEN;
        });
      }

      const R_sphere  = Math.min(W,H) * 0.27;
      const sphere_cx = W * curCxFrac;
      const rotY = t * 0.13;
      const rotX = Math.sin(t*0.21) * (0.14*(1-tunnelBlend*0.9));

      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='#F8F9FA'; ctx.fillRect(0,0,W,H);

      const glowCx = sphere_cx*(1-tunnelBlend)+W*0.5*tunnelBlend;
      const glowR  = R_sphere*(1.5+tunnelBlend*1.8);
      const grd=ctx.createRadialGradient(glowCx,H/2,0,glowCx,H/2,glowR);
      grd.addColorStop(0,  `rgba(205,228,255,${0.45+tunnelBlend*0.12})`);
      grd.addColorStop(0.5,`rgba(220,210,255,${0.15+tunnelBlend*0.07})`);
      grd.addColorStop(1,'transparent');
      ctx.fillStyle=grd; ctx.fillRect(0,0,W,H);

      // Project
      const projected = nodes.map(n => {
        const {rx,ry,rz}=rotateSphere(n.sx,n.sy,n.sz,rotY,rotX);
        const depthS=rz*R_sphere+FOV_S;
        const sxS=sphere_cx+rx*R_sphere*(FOV_S/depthS);
        const syS=H*0.5+ry*R_sphere*(FOV_S/depthS);
        const facS=df(rz);

        const nodeZ = n.tz - flyZ;
        const depthT = nodeZ;
        if (depthT > FAR_CLIP) {
          // Too far — render as tiny faint dot at center (part of vanishing point)
          return { sx: sxS*(1-tunnelBlend)+W*0.5*tunnelBlend, sy: syS*(1-tunnelBlend)+H*0.5*tunnelBlend, fac: facS*(1-tunnelBlend), rz, depthT, tiny:true };
        }
        const scaleT = FOV_T/(FOV_T+depthT);
        const sxT=W*0.5+n.tx*scaleT, syT=H*0.5+n.ty*scaleT;
        const facT=Math.max(0,1-depthT/FAR_CLIP);
        const fac=facS*(1-tunnelBlend)+facT*tunnelBlend;
        return { sx:sxS*(1-tunnelBlend)+sxT*tunnelBlend, sy:syS*(1-tunnelBlend)+syT*tunnelBlend, fac, rz, depthT, tiny:false };
      });

      // Edges
      const drawEdges=(edgeList,alpha_mult,isTunnelEdge)=>{
        edgeList.forEach(([i,j])=>{
          const a=projected[i],b=projected[j];
          if(!a||!b) return;
          if(isTunnelEdge && tunnelBlend>0.3){
            const za=nodes[i].tz-flyZ, zb=nodes[j].tz-flyZ;
            if(Math.abs(za-zb)>TUBE_LEN*0.35) return;
          }
          const avg=(a.fac+b.fac)/2;
          const alpha=isTunnelEdge?(0.06+avg*0.54)*alpha_mult:(0.22+avg*0.22)*alpha_mult;
          if(alpha<0.04) return;
          ctx.beginPath(); ctx.moveTo(a.sx,a.sy); ctx.lineTo(b.sx,b.sy);
          ctx.strokeStyle=`hsla(${215+(1-avg)*25},68%,55%,${alpha.toFixed(2)})`;
          ctx.lineWidth=0.5+avg*1.2; ctx.stroke();
        });
      };
      drawEdges(sphereEdges,1-tunnelBlend,false);
      drawEdges(tunnelEdges,tunnelBlend,true);

      // Nodes
      nodes.map((n,i)=>({n,p:projected[i]}))
        .sort((a,b)=>a.p.fac-b.p.fac)
        .forEach(({n,p})=>{
          if(p.tiny && tunnelBlend>0.5) return; // skip far-clip nodes in tunnel
          const alpha=0.05+p.fac*0.92;
          const dotR=0.8+p.fac*8.0;
          if(p.fac>0.6){
            const pulse=0.55+0.45*Math.sin(t*1.7+n.phase);
            const gr=ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,dotR*4);
            gr.addColorStop(0,`hsla(${n.hue},85%,62%,${(p.fac*0.25*pulse).toFixed(2)})`);
            gr.addColorStop(1,'transparent');
            ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(p.sx,p.sy,dotR*4,0,Math.PI*2); ctx.fill();
          }
          ctx.beginPath(); ctx.arc(p.sx,p.sy,Math.max(0.5,dotR),0,Math.PI*2);
          ctx.fillStyle=`hsla(${n.hue},82%,48%,${alpha.toFixed(2)})`; ctx.fill();
          if(n.label && p.fac>0.75 && dotR>4.5){
            const fs=Math.min(10,dotR*1.5);
            ctx.font=`700 ${fs}px "JetBrains Mono",monospace`;
            ctx.textAlign='center'; ctx.textBaseline='bottom';
            ctx.fillStyle=`hsla(${n.hue},65%,30%,${(alpha*0.82).toFixed(2)})`;
            ctx.fillText(n.label,p.sx,p.sy-dotR-2);
          }
        });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize); };
  },[]);

  return <canvas ref={canvasRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}/>;
}
