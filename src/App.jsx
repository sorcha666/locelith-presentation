import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './Background';
import NotesPanel from './Notes';

import { S01Cover, S02Ch1Intro, S03Stat } from './Chapter1';
import { S07Ch2Intro, S08Workflow, S11Ch3Intro, S12Actors, S13NFR } from './Chapter23';
import { S14Ch4Intro, S15Architecture, S16Vault } from './Chapter4';
import { S29Ch7Intro, S30Achievements, S31Perspectives, S32Closing } from './Chapter67';

const SLIDES = [
  { id: 's01', ch: 0, label: 'Cover' },
  { id: 's02', ch: 1, label: 'Ch.1 Context' },
  { id: 's03', ch: 1, label: 'Impact' },
  { id: 's07', ch: 2, label: 'Ch.2 SoA' },
  { id: 's08', ch: 2, label: 'Workflow' },
  { id: 's11', ch: 3, label: 'Ch.3 Specs' },
  { id: 's12', ch: 3, label: 'Actors' },
  { id: 's13', ch: 3, label: 'NFR' },
  { id: 's14', ch: 4, label: 'Ch.4 Arch' },
  { id: 's15', ch: 4, label: 'Architecture' },
  { id: 's16', ch: 4, label: 'Pipeline' },
  { id: 's29', ch: 5, label: 'Ch.5 Concl.' },
  { id: 's30', ch: 5, label: 'Achievements' },
  { id: 's31', ch: 5, label: 'Perspectives' },
  { id: 's32', ch: 5, label: 'Closing' },
];

const CH_COLORS = ['#4F6EF7', '#4F6EF7', '#8B5CF6', '#06B6D4', '#F59E0B', '#10B981', '#EF4444', '#4F6EF7'];

// Chapter title/intro slides — excluded from content slide numbering
const CHAPTER_TITLE_IDS = new Set(['s02','s07','s11','s14','s29']);
const CONTENT_SLIDES = SLIDES.filter(s => !CHAPTER_TITLE_IDS.has(s.id));
const CONTENT_TOTAL  = CONTENT_SLIDES.length;

export default function App() {
  const [active, setActive] = useState(0);
  const lenisRef = useRef(null);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    // smoothWheel: false — we handle wheel events ourselves for snap navigation
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: false });
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
    const COVER_SLIDES  = new Set(['s01']);
    const SPHERE_SLIDES = new Set(['s02','s07','s11','s14','s29','s32']);
    const id = SLIDES[active]?.id;
    if (COVER_SLIDES.has(id))  window.__bgMode = 'cover';
    else if (SPHERE_SLIDES.has(id)) window.__bgMode = 'sphere';
    else window.__bgMode = 'tunnel';
  }, [active]);

  // ── Wheel snap navigation ──
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    let blocked = false;
    const onWheel = e => {
      e.preventDefault();
      if (blocked) return;
      blocked = true;
      setTimeout(() => { blocked = false; }, 750); // debounce: one slide per 750ms
      const next = e.deltaY > 0
        ? Math.min(activeRef.current + 1, SLIDES.length - 1)
        : Math.max(activeRef.current - 1, 0);
      goTo(next);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []); // runs once — uses activeRef to avoid stale closure

  // ── Touch swipe (for tablet presenting) ──
  useEffect(() => {
    let startY = 0;
    const onTouchStart = e => { startY = e.touches[0].clientY; };
    const onTouchEnd   = e => {
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const next = dy > 0
        ? Math.min(activeRef.current + 1, SLIDES.length - 1)
        : Math.max(activeRef.current - 1, 0);
      goTo(next);
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);

  // ── Mouse click navigation (left = next, right = prev, no context menu) ──
  useEffect(() => {
    const onClick = e => {
      // Ignore clicks on interactive elements (nav dots, buttons, links)
      if (e.target.closest('nav, button, a, [role="button"]')) return;
      goTo(Math.min(activeRef.current + 1, SLIDES.length - 1));
    };
    const onContextMenu = e => {
      e.preventDefault(); // suppress right-click menu
      goTo(Math.max(activeRef.current - 1, 0));
    };
    window.addEventListener('click',       onClick);
    window.addEventListener('contextmenu', onContextMenu);
    return () => {
      window.removeEventListener('click',       onClick);
      window.removeEventListener('contextmenu', onContextMenu);
    };
  }, []);

  // ── Keyboard navigation ──
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'n' || e.key === 'N') { setShowNotes(v => !v); return; }
      if (e.key === 'Escape') { setShowNotes(false); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(Math.min(active + 1, SLIDES.length - 1));
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(Math.max(active - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const cur = SLIDES[active];
  const isChapterTitle = CHAPTER_TITLE_IDS.has(cur?.id);
  const contentIdx = isChapterTitle ? null : CONTENT_SLIDES.findIndex(s => s.id === cur?.id) + 1;
  const pct = contentIdx ? (contentIdx / CONTENT_TOTAL) * 100 : ((active + 1) / SLIDES.length) * 100;

  return (
    <>
      <Background />

      {/* Top progress bar */}
      <div className="progress-bar" style={{ width: `${pct}%` }} />

      {/* Slide counter */}
      <AnimatePresence mode="wait">
        <motion.div key={active} className="slide-counter"
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}>
          {isChapterTitle
            ? <span style={{ letterSpacing: '0.08em' }}>Chapter {cur.ch}</span>
            : <><span>{String(contentIdx).padStart(2, '0')}</span> / {String(CONTENT_TOTAL).padStart(2, '0')} — {cur.label}</>}
        </motion.div>
      </AnimatePresence>

      {/* Chapter nav — bottom center */}
      <nav className="chapter-nav">
        {[1,2,3,4,5].map(ch => {
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

      {/* Speaker notes panel — press N */}
      {showNotes && (
        <NotesPanel slideId={SLIDES[active]?.id} onClose={() => setShowNotes(false)} />
      )}

      {/* All slides */}
      <main>
        <S01Cover />
        <S02Ch1Intro />
        <S03Stat />
        <S07Ch2Intro />
        <S08Workflow />
        <S11Ch3Intro />
        <S12Actors />
        <S13NFR />
        <S14Ch4Intro />
        <S15Architecture />
        <S16Vault />
        <S29Ch7Intro />
        <S30Achievements />
        <S31Perspectives />
        <S32Closing />
      </main>
    </>
  );
}
