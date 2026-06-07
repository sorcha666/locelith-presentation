import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './Background';

import { S01Cover, S02Ch1Intro, S03Stat, S04Tax, S05Host, S06Objectives } from './Chapter1';
import { S07Ch2Intro, S08Workflow, S09Comparison, S10Problem, S11Ch3Intro, S12Actors, S13NFR } from './Chapter23';
import { S14Ch4Intro, S15Architecture, S16Vault, S17SDK, S18Database } from './Chapter4';
import { S19Ch5Intro, S20TechStack, S21Terminal, S22Providers, S23Quality, S24Pipeline, S25SaaS, S26Deployment } from './Chapter5';
import { S27Ch6Intro, S28AST, S29Ch7Intro, S30Achievements, S31Perspectives, S32Closing } from './Chapter67';

const SLIDES = [
  { id: 's01', ch: 0, label: 'Cover' },
  { id: 's02', ch: 1, label: 'Ch.1 Context' },
  { id: 's03', ch: 1, label: 'Impact' },
  { id: 's04', ch: 1, label: 'Tax' },
  { id: 's05', ch: 1, label: 'Host Org' },
  { id: 's06', ch: 1, label: 'Objectives' },
  { id: 's07', ch: 2, label: 'Ch.2 SoA' },
  { id: 's08', ch: 2, label: 'Workflow' },
  { id: 's09', ch: 2, label: 'Comparison' },
  { id: 's10', ch: 2, label: 'Problem' },
  { id: 's11', ch: 3, label: 'Ch.3 Specs' },
  { id: 's12', ch: 3, label: 'Actors' },
  { id: 's13', ch: 3, label: 'NFR' },
  { id: 's14', ch: 4, label: 'Ch.4 Arch' },
  { id: 's15', ch: 4, label: 'Architecture' },
  { id: 's16', ch: 4, label: 'Vault' },
  { id: 's17', ch: 4, label: 'SDK' },
  { id: 's18', ch: 4, label: 'Database' },
  { id: 's19', ch: 5, label: 'Ch.5 Impl' },
  { id: 's20', ch: 5, label: 'Stack' },
  { id: 's21', ch: 5, label: 'Demo' },
  { id: 's22', ch: 5, label: 'Providers' },
  { id: 's23', ch: 5, label: 'Quality' },
  { id: 's24', ch: 5, label: 'Pipeline' },
  { id: 's25', ch: 5, label: 'SaaS Platform' },
  { id: 's26', ch: 5, label: 'Deployment' },
  { id: 's27', ch: 6, label: 'Ch.6 Tests' },
  { id: 's28', ch: 6, label: 'Validation' },
  { id: 's29', ch: 7, label: 'Ch.7 Concl.' },
  { id: 's30', ch: 7, label: 'Achievements' },
  { id: 's31', ch: 7, label: 'Perspectives' },
  { id: 's32', ch: 7, label: 'Closing' },
];

const CH_COLORS = ['#4F6EF7', '#4F6EF7', '#8B5CF6', '#06B6D4', '#F59E0B', '#10B981', '#EF4444', '#4F6EF7'];

export default function App() {
  const [active, setActive] = useState(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
    lenisRef.current = lenis;
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const obs = SLIDES.map((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(i); }, { threshold: 0.4 });
      o.observe(el);
      return o;
    }).filter(Boolean);
    return () => obs.forEach(o => o.disconnect());
  }, []);

  const goTo = idx => {
    const el = document.getElementById(SLIDES[idx].id);
    if (el) lenisRef.current?.scrollTo(el, { duration: 1.2, easing: t => 1 - Math.pow(1 - t, 4) });
  };

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(Math.min(active + 1, SLIDES.length - 1));
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(Math.max(active - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const pct = ((active + 1) / SLIDES.length) * 100;
  const cur = SLIDES[active];

  return (
    <>
      <Background />

      {/* Top progress bar */}
      <div className="progress-bar" style={{ width: `${pct}%` }} />

      {/* Chapter nav */}
      <nav className="chapter-nav">
        {[1,2,3,4,5,6,7].map(ch => {
          const isCurCh = cur.ch === ch;
          return (
            <div key={ch}
              className={`chapter-nav-dot${isCurCh ? ' active' : ''}`}
              title={`Chapter ${ch}`}
              style={isCurCh ? { background: CH_COLORS[ch] } : {}}
              onClick={() => { const first = SLIDES.findIndex(s => s.ch === ch); if (first >= 0) goTo(first); }}
            />
          );
        })}
      </nav>

      {/* Slide counter */}
      <AnimatePresence mode="wait">
        <motion.div key={active} className="slide-counter"
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}>
          <span>{String(active + 1).padStart(2, '0')}</span> / {String(SLIDES.length).padStart(2, '0')} — {cur.label}
        </motion.div>
      </AnimatePresence>

      <div className="nav-hint">
        <span>↑↓</span> navigate
      </div>

      {/* All slides */}
      <main>
        <S01Cover />
        <S02Ch1Intro />
        <S03Stat />
        <S04Tax />
        <S05Host />
        <S06Objectives />
        <S07Ch2Intro />
        <S08Workflow />
        <S09Comparison />
        <S10Problem />
        <S11Ch3Intro />
        <S12Actors />
        <S13NFR />
        <S14Ch4Intro />
        <S15Architecture />
        <S16Vault />
        <S17SDK />
        <S18Database />
        <S19Ch5Intro />
        <S20TechStack />
        <S21Terminal />
        <S22Providers />
        <S23Quality />
        <S24Pipeline />
        <S25SaaS />
        <S26Deployment />
        <S27Ch6Intro />
        <S28AST />
        <S29Ch7Intro />
        <S30Achievements />
        <S31Perspectives />
        <S32Closing />
      </main>
    </>
  );
}
