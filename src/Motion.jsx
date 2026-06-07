import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Variants for Zoom and Smooth Motion ── */
export const vUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i=0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i*0.12, ease: [0.16,1,0.3,1] } }),
};
export const vLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: (i=0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: i*0.12, ease: [0.16,1,0.3,1] } }),
};
export const vScale = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: (i=0) => ({ opacity: 1, scale: 1, transition: { duration: 0.8, delay: i*0.1, ease: [0.16,1,0.3,1] } }),
};
export const vFade = {
  hidden:  { opacity: 0 },
  visible: (i=0) => ({ opacity: 1, transition: { duration: 0.6, delay: i*0.1 } }),
};

/* Container variant for the deep zoom slide effect */
const vContainer = {
  hidden: { opacity: 0, scale: 0.85, y: 60, z: -100 },
  visible: { 
    opacity: 1, scale: 1, y: 0, z: 0, 
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1 
    } 
  }
};

/* ── Slide wrapper with Deep Zoom Effect ── */
export function Slide({ id, children, className = 'slide slide-light', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  
  return (
    <section ref={ref} id={id} className={className} style={style}>
      <motion.div 
        className="slide-inner"
        variants={vContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ── Animated number (custom, no react-countup — incompatible with React 19) ── */
export function Num({ value, decimals, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const dec = decimals ?? (!Number.isInteger(value) ? String(value).split('.')[1]?.length ?? 0 : 0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000; // ms
    const start = performance.now();
    const raf = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(parseFloat((eased * value).toFixed(dec)));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, value, dec]);

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })}{suffix}
    </span>
  );
}

/* ── Animated bar ── */
export function Bar({ pct, color = 'var(--blue)', winner = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="bar-track">
      <div className="bar-fill" style={{ width: inView ? `${pct}%` : '0%', background: color }} />
    </div>
  );
}

/* ── Typewriter ── */
export function Type({ text, delay = 0, speed = 42 }) {
  const [out, setOut] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const t0 = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setOut(text.slice(0, ++i));
        if (i >= text.length) clearInterval(iv);
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t0);
  }, [inView, text, delay, speed]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--mono)' }}>
      {out}
      {out.length < text.length && <span style={{ animation: 'blink 1s infinite', marginLeft: 1 }}>█</span>}
    </span>
  );
}
