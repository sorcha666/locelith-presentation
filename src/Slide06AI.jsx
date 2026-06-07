import { motion } from 'framer-motion';
import { Section, fadeUp, AnimCount, AnimBar } from './components';

const pipelineSteps = [
  { num: '01', label: 'OPUS Corpus', sub: '4.5M UI pairs · 112 langs · GNOME/KDE/Ubuntu/Mozilla', color: 'var(--blue-mid)', icon: '📥' },
  { num: '02', label: 'Seed Scraping', sub: '3,149 UI strings scraped from React libs & industry sites', color: 'var(--purple)', icon: '🕷️' },
  { num: '03', label: 'Knowledge Distillation', sub: '326K pairs · 10 teacher models · back-translation verification', color: '#D97706', icon: '🧪' },
  { num: '04', label: 'Data Preparation', sub: 'Junk filter · length-ratio filter · 510-pair benchmark held out', color: '#059669', icon: '🧹' },
  { num: '05', label: 'QLoRA Fine-Tuning', sub: 'Unsloth · packing=True · r=64 · α=128 · 1 epoch / 500K pairs', color: 'var(--blue-mid)', icon: '🏋️' },
  { num: '06', label: 'BLEU / chrF Evaluation', sub: '510-pair benchmark · 17 langs · 6 UI domains · sacrebleu', color: 'var(--purple)', icon: '📊' },
];

const benchmarkData = [
  { model: '0.5B', bleu: 18.2, chrf: 34.1, color: '#EF4444', selected: false },
  { model: '1.5B', bleu: 31.4, chrf: 52.7, color: '#F59E0B', selected: false },
  { model: '3B',   bleu: 44.8, chrf: 66.3, color: '#8B5CF6', selected: false },
  { model: '7B',   bleu: 61.34, chrf: 83.42, color: 'var(--blue-mid)', selected: true },
  { model: '14B',  bleu: 65.1, chrf: 87.2, color: '#059669', selected: false },
];

export default function Slide06AI() {
  return (
    <div className="slide" id="slide-6" style={{ background: 'var(--bg2)' }}>
      <div className="slide-content">
        <Section>
          <motion.div variants={fadeUp} custom={0}>
            <div className="slide-label">Chapter 4 — AI Component</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              The Locelith <span className="gradient-text">SLM</span> — Training &amp; Results
            </h2>
            <p className="lead" style={{ maxWidth: 720, marginBottom: 36 }}>
              Qwen-2.5 fine-tuned via <strong style={{ color: 'var(--blue-mid)' }}>QLoRA</strong> on 4.5M UI pairs across 112 languages.
              The 7B adapter achieves <strong style={{ color: 'var(--purple)' }}>BLEU 61.34 / chrF 83.42</strong> at just 5.8 GB VRAM — a <strong style={{ color: '#059669' }}>+18.4 BLEU gain</strong> over the base model.
            </p>
          </motion.div>

          <div className="grid-2" style={{ gap: 28 }}>
            {/* Timeline */}
            <motion.div variants={fadeUp} custom={1}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>
                🔬 Training Pipeline
              </div>
              <div className="timeline">
                {pipelineSteps.map((s, i) => (
                  <motion.div key={s.num} className="timeline-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}>
                    <div className="timeline-dot" style={{ background: s.color, boxShadow: `0 0 0 3px ${s.color}20` }} />
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1rem' }}>{s.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem', color: s.color, marginBottom: 2 }}>{s.num}. {s.label}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div variants={fadeUp} custom={2} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Stats grid */}
              <div className="grid-2" style={{ gap: 12 }}>
                {[
                  { val: 61.34, label: 'BLEU Score', sub: '7B · Selected', color: 'var(--blue-mid)', bg: '#EFF6FF' },
                  { val: 83.42, label: 'chrF Score', sub: 'Character F-score', color: 'var(--purple)', bg: '#F5F3FF' },
                  { val: 18.4,  label: 'BLEU Gain', sub: 'vs. base model', color: '#059669', bg: '#ECFDF5' },
                  { val: 5.8,   label: 'VRAM (GB)', sub: 'at 4-bit NF4', color: '#D97706', bg: '#FFFBEB' },
                ].map(s => (
                  <div key={s.label} className="stat-card" style={{ background: s.bg, border: `1px solid ${s.color}20` }}>
                    <div className="stat-number" style={{ color: s.color }}>
                      <AnimCount value={s.val} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--navy)', marginBottom: 2 }}>{s.label}</div>
                    <div className="stat-label">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* BLEU bar chart */}
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                  BLEU Score by Model Scale
                </div>
                {benchmarkData.map(b => (
                  <div key={b.model} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.76rem', fontWeight: 700, color: b.selected ? b.color : 'var(--navy)' }}>
                        Qwen-2.5 {b.model}
                        {b.selected && <span style={{ marginLeft: 8, fontSize: '0.62rem', color: b.color, background: `${b.color}15`, padding: '1px 6px', borderRadius: 4 }}>★ SELECTED</span>}
                      </span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', color: b.color, fontWeight: 700 }}>{b.bleu}</span>
                    </div>
                    <AnimBar value={b.bleu} max={100} color={b.color} />
                  </div>
                ))}
              </div>

              {/* Double-Pass */}
              <div className="card-blue" style={{ padding: 18 }}>
                <div style={{ fontWeight: 700, color: 'var(--blue-mid)', marginBottom: 10, fontSize: '0.88rem' }}>
                  🔄 Double-Pass Any-to-Any Pipeline
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  {['🇫🇷 Any Language', '→', 'Pass 1: Base model', '→', '🇬🇧 English pivot', '→', 'Pass 2: Locelith', '→', '🇪🇸 Any Target'].map((item, i) => (
                    <span key={i} style={{
                      padding: i % 2 === 1 ? '0 2px' : '5px 10px',
                      borderRadius: 8,
                      fontSize: '0.72rem',
                      fontWeight: i % 2 === 1 ? 400 : 600,
                      color: i % 2 === 1 ? 'var(--muted)' : 'var(--navy)',
                      background: i % 2 === 1 ? 'transparent' : 'white',
                      border: i % 2 === 1 ? 'none' : '1px solid rgba(37,99,235,0.2)',
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
      <div className="slide-num">06 / 09</div>
    </div>
  );
}
