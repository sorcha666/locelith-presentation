import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

/* ── Shared animation variants ── */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.4,0,0.2,1] } }),
};
export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.4,0,0.2,1] } }),
};
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4,0,0.2,1] } }),
};

/* ── Animated section wrapper ── */
export function Section({ children, className = '', id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated counter ── */
export function AnimCount({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isFloat = !Number.isInteger(value);
  const decimals = isFloat ? (String(value).split('.')[1] || '').length : 0;
  return (
    <span ref={ref}>
      {prefix}
      {inView ? <CountUp end={value} duration={2.2} separator="," decimals={decimals} decimal="." /> : '0'}
      {suffix}
    </span>
  );
}

/* ── Typewriter ── */
export function Typewriter({ text, delay = 0, speed = 50 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--mono)' }}>
      {displayed}
      {displayed.length < text.length && <span style={{ animation: 'blink 1s infinite', opacity: 1 }}>|</span>}
    </span>
  );
}

/* ── Animated bar (no label required) ── */
export function AnimBar({ value, max = 100, color, label, subLabel }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const pct = (value / max) * 100;
  const safeVal = typeof value === 'number' ? value : 0;

  return (
    <div ref={ref} style={{ marginBottom: 4 }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'baseline' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{label}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color }}>
            {inView ? <CountUp end={safeVal} duration={1.8} decimals={1} decimal="." /> : '0'}{subLabel}
          </span>
        </div>
      )}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: inView ? `${pct}%` : '0%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Glow divider ── */
export function GlowDivider({ color = 'var(--cyan)' }) {
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      margin: '32px 0',
      opacity: 0.5,
    }} />
  );
}
