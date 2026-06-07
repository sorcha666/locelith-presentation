/**
 * CHAPTER 5 — Implementation & AI
 */
import { motion } from 'framer-motion';
import { Slide, vUp, vLeft, vFade, Num, Bar, Type } from './Motion';

export function S19Ch5Intro() {
  return (
    <Slide id="s19" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 05</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>Implementation &amp;<br /><span className="grad">AI Development</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>Engineering execution — from technology choices to model training and production deployment.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S20TechStack() {
  const stack = [
    { cat: 'Frontend', color: 'var(--blue)', items: ['Next.js 14', 'React 18', 'TailwindCSS', 'shadcn/ui', 'TanStack Query', 'Recharts'] },
    { cat: 'Backend', color: 'var(--purple)', items: ['NestJS', 'Prisma ORM', 'PostgreSQL', 'MongoDB', 'JWT', 'bcrypt'] },
    { cat: 'AI / ML', color: 'var(--amber)', items: ['Python 3.11', 'FastAPI', 'Transformers', 'Unsloth', 'PEFT', 'QLoRA', 'llama.cpp'] },
    { cat: 'DevOps', color: 'var(--green)', items: ['Docker', 'Railway', 'GitHub Actions', 'Rollup', 'Stripe', 'HMAC'] },
  ];
  return (
    <Slide id="s20" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Technology Stack</div>
          <h2 className="title-md">Every tool chosen for a reason.</h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 20 }}>
          {stack.map((s, i) => (
            <motion.div key={s.cat} variants={vUp} custom={i + 1} className="card" style={{ borderTop: `2px solid ${s.color}` }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: s.color, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{s.cat}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.items.map(it => (
                  <span key={it} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', background: `${s.color}0D`, border: `1px solid ${s.color}25`, color: s.color, padding: '4px 10px', borderRadius: 6 }}>{it}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function S21Terminal() {
  return (
    <Slide id="s21" className="slide slide-lighter">
      <div className="cols-3-2" style={{ gap: 56, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Live Pipeline Demo</div>
          <h2 className="title-md" style={{ marginBottom: 16 }}>From source code<br />to <span className="grad">multilingual app.</span><br />One command.</h2>
          <p className="body-sm">The pipeline detects the framework, parses ASTs, sanitises PII, resolves cache hits, runs SLM inference for misses, and rewrites all source files — fully automated.</p>
        </motion.div>
        <motion.div variants={vUp} custom={1}>
          <div className="term">
            <div className="term-bar">
              <div className="term-dot d-red"/><div className="term-dot d-yellow"/><div className="term-dot d-green"/>
              <span style={{ marginLeft: 10, fontFamily: 'var(--mono)', fontSize: '0.68rem', color: '#64748B' }}>bash — my-react-app</span>
            </div>
            <div className="term-body">
              <div className="term-line"><span className="tc-prompt">$ </span><span className="tc-cmd"><Type text="npx locelith translate --langs=fr,es,ar,de,zh" delay={500} /></span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">Framework detected: React 18 (JSX)</span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">AST scan complete — 247 strings extracted</span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">PII sanitised (2 email addresses masked)</span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">Cache: 189 hits · 58 SLM inferences (4.2s)</span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">Source rewrite: t() injected in 34 files</span></div>
              <div className="term-line"><span className="tc-success">✔ Done. Your app now speaks 5 languages.</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S22Dataset() {
  return (
    <Slide id="s22" className="slide slide-light">
      <div className="cols-2" style={{ gap: 64, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Dataset Construction</div>
          <h2 className="title-md" style={{ marginBottom: 28 }}>4.5 million UI string pairs.<br /><span className="grad">Built from scratch.</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { src: 'OPUS Corpus', pairs: '~4.17M', langs: '112', note: 'GNOME · KDE · Ubuntu · Mozilla open-source UI strings', color: 'var(--blue)' },
              { src: 'Knowledge Distillation', pairs: '~326K', langs: '10', note: '10 teacher models · back-translation verification · quality filtering', color: 'var(--purple)' },
              { src: 'Seed Scraping', pairs: '~3K', langs: '—', note: '3,149 UI strings from React component libraries & industry sites', color: 'var(--cyan)' },
            ].map((d, i) => (
              <motion.div key={d.src} variants={vLeft} custom={i + 1} style={{ display: 'flex', gap: 16, padding: '16px 20px', borderRadius: 12, background: `${d.color}08`, border: `1px solid ${d.color}20` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: d.color, marginBottom: 4, fontSize: '0.9rem' }}>{d.src}</div>
                  <div className="body-xs">{d.note}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '1.2rem', color: d.color }}>{d.pairs}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--t4)' }}>{d.langs} langs</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={vUp} custom={4} style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '6rem', fontWeight: 900, color: 'var(--blue)', lineHeight: 1, letterSpacing: '-0.05em', marginBottom: 12 }}>
            <Num value={4.5} suffix="M" />
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--t3)', marginBottom: 32 }}>training pairs total</div>
          <div className="cols-2" style={{ gap: 14 }}>
            {[{ v: 112, l: 'Languages' }, { v: 510, l: 'Benchmark pairs' }, { v: 17, l: 'Language pairs' }, { v: 6, l: 'UI domains' }].map(s => (
              <div key={s.l} className="card" style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--blue)', letterSpacing: '-0.03em' }}><Num value={s.v} /></div>
                <div style={{ fontSize: '0.72rem', color: 'var(--t4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S23Training() {
  const steps = [
    { n: '01', label: 'Base Model Selection', desc: 'Qwen2.5 chosen for multilingual pretraining coverage across 112 languages and efficient inference characteristics', color: 'var(--blue)' },
    { n: '02', label: 'QLoRA Configuration', desc: 'rank r=64 · α=128 · dropout 0.05 · target: q_proj, v_proj, k_proj · NF4 quantisation', color: 'var(--purple)' },
    { n: '03', label: 'Unsloth Optimisation', desc: 'packing=True for sequence efficiency · 2× faster training · 60% lower VRAM than standard HF Trainer', color: 'var(--cyan)' },
    { n: '04', label: 'Training Run', desc: '1 epoch on 500K pairs · gradient accumulation 4 · AdamW 8-bit · cosine LR schedule', color: 'var(--amber)' },
    { n: '05', label: 'Adapter Merging', desc: 'LoRA weights merged into base for GGUF export · Q4_K_M quantisation for CPU deployment', color: 'var(--green)' },
  ];
  return (
    <Slide id="s23" className="slide slide-lighter">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Training Methodology</div>
          <h2 className="title-md">QLoRA — parameter-efficient fine-tuning<br />at <span className="grad-green">5.8 GB VRAM.</span></h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {steps.map((s, i) => (
            <motion.div key={s.n} variants={vUp} custom={i + 1} className="card" style={{ borderTop: `2px solid ${s.color}`, padding: '20px 16px' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '2rem', fontWeight: 900, color: s.color, opacity: 0.15, marginBottom: 8, letterSpacing: '-0.04em' }}>{s.n}</div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--t1)', marginBottom: 8 }}>{s.label}</div>
              <p className="body-xs" style={{ lineHeight: 1.6 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function S24Benchmark() {
  const models = [
    { name: '0.5B', bleu: 18.2,  chrf: 34.1, vram: 1.2, color: '#94A3B8', selected: false },
    { name: '1.5B', bleu: 31.4,  chrf: 52.7, vram: 2.1, color: '#C084FC', selected: false },
    { name: '3B',   bleu: 44.8,  chrf: 66.3, vram: 3.4, color: '#22D3EE', selected: false },
    { name: '7B',   bleu: 61.34, chrf: 83.42,vram: 5.8, color: '#3B82F6', selected: true  },
    { name: '14B',  bleu: 65.1,  chrf: 87.2, vram: 11.4,color: '#34D399', selected: false },
  ];
  return (
    <Slide id="s24" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Multi-Scale Benchmark · 510 pairs · sacrebleu</div>
          <h2 className="title-md">The 7B model delivers<br /><span className="grad">the optimal quality/cost ratio.</span></h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 48, alignItems: 'center' }}>
          <motion.div variants={vUp} custom={1}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>BLEU Score by model scale</div>
            {models.map((m, i) => (
              <motion.div key={m.name} variants={vFade} custom={i + 2} className={`bar-row${m.selected ? ' bar-winner' : ''}`}>
                <div className="bar-label" style={{ fontWeight: m.selected ? 700 : 400 }}>Qwen-{m.name}</div>
                <Bar pct={(m.bleu / 100) * 100} color={m.color} />
                <div className="bar-val">{m.bleu}</div>
              </motion.div>
            ))}
            <div className="rule-grad" />
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>chrF Score</div>
            {models.map((m, i) => (
              <motion.div key={m.name + 'c'} variants={vFade} custom={i + 7} className={`bar-row${m.selected ? ' bar-winner' : ''}`}>
                <div className="bar-label">{m.name}</div>
                <Bar pct={m.chrf} color={m.color} />
                <div className="bar-val">{m.chrf}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={vUp} custom={2} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: '28px', borderRadius: 16, background: 'rgba(37,99,235,0.06)', border: '2px solid rgba(37,99,235,0.25)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--blue)', marginBottom: 8, letterSpacing: '0.1em', fontWeight: 700 }}>SELECTED · QWEN-2.5 7B</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '3.5rem', fontWeight: 900, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1 }}><Num value={61.34} /></div>
              <div style={{ color: 'var(--t3)', fontSize: '0.8rem', marginTop: 6, fontWeight: 500 }}>BLEU score</div>
              <div className="rule-grad" />
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div><div style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--purple)' }}><Num value={83.42} /></div><div className="body-xs">chrF</div></div>
                <div><div style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--green)' }}>+<Num value={18.4} /></div><div className="body-xs">vs base</div></div>
                <div><div style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--amber)' }}><Num value={5.8} />GB</div><div className="body-xs">VRAM</div></div>
              </div>
            </div>
            <div className="card" style={{ padding: '18px 20px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--t1)', marginBottom: 8 }}>Why not 14B?</div>
              <p className="body-xs" style={{ lineHeight: 1.7 }}>The 14B model gains only +3.76 BLEU (+6%) but requires 11.4 GB VRAM — double the cost. The 7B adapter runs on consumer GPUs and CPU via GGUF. The marginal quality gain does not justify the infrastructure overhead for a production SaaS product.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}

export function S25DoublePass() {
  return (
    <Slide id="s25" className="slide slide-lighter">
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 48 }}>
          <div className="eyebrow">Innovation — Double-Pass Pipeline</div>
          <h2 className="title-md">Any language to any language.<br /><span className="grad">Without retraining.</span></h2>
        </motion.div>
        <motion.div variants={vUp} custom={1} style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'nowrap', overflowX: 'auto', padding: '4px 0' }}>
            {[
              { label: '[ FR ] Input', sub: 'Any source language', color: 'var(--blue)' },
              null,
              { label: 'Pass 1 — Base', sub: 'Adapter disabled', color: 'var(--t4)' },
              null,
              { label: '[ EN ] Pivot', sub: 'Intermediate', color: 'var(--purple)' },
              null,
              { label: 'Pass 2 — Locelith', sub: 'Adapter enabled', color: 'var(--blue)' },
              null,
              { label: '[ AR ] Output', sub: 'Any target language', color: 'var(--cyan)' },
            ].map((item, i) => item === null
              ? <div key={i} className="flow-arrow">→</div>
              : <div key={i} className="flow-node" style={{ borderColor: item.color, background: `${item.color}0A`, textAlign: 'center', minWidth: 120 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: item.color, marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--t4)' }}>{item.sub}</div>
                </div>
            )}
          </div>
        </motion.div>
        <div className="cols-3" style={{ gap: 16 }}>
          {[
            { abbr: 'A2A', title: 'Any-to-Any Translation', body: 'Supports all 112×112 language pairs using only En→X trained weights — no additional training required.', color: 'var(--blue)' },
            { abbr: '1X', title: 'Single Adapter', body: 'One 7B adapter handles the full translation matrix via the English pivot strategy, reducing deployment complexity.', color: 'var(--purple)' },
            { abbr: 'QA', title: 'Quality Validated', body: 'Back-translation testing confirmed that the two-pass approach introduces <2% BLEU degradation vs direct training.', color: 'var(--green)' },
          ].map((d, i) => (
            <motion.div key={d.title} variants={vUp} custom={i + 2} className="card" style={{ borderTop: `2px solid ${d.color}` }}>
              <div style={{ fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '1rem', color: d.color, marginBottom: 10, background: `${d.color}15`, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>{d.abbr}</div>
              <div style={{ fontWeight: 700, color: d.color, marginBottom: 8, fontSize: '0.88rem' }}>{d.title}</div>
              <p className="body-xs" style={{ lineHeight: 1.7 }}>{d.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function S26Deployment() {
  return (
    <Slide id="s26" className="slide slide-light">
      <div className="cols-2" style={{ gap: 56, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Production Deployment</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>CPU inference.<br /><span className="grad-green">~$5 / month.</span></h2>
          <p className="body-sm" style={{ marginBottom: 32 }}>Dynamic LoRA loading merges the base GGUF model and the adapter weights at runtime — eliminating the need for a dedicated GPU server in production.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Quantisation', val: 'GGUF Q4_K_M — 60% size reduction vs FP16' },
              { label: 'Runtime', val: 'llama.cpp — optimised C++ CPU inference' },
              { label: 'LoRA Loading', val: 'Dynamic merge at startup — no static baking needed' },
              { label: 'Platform', val: 'Railway — $5/mo · auto-restart · health checks' },
              { label: 'GPU Delta', val: '−0.43 BLEU vs GPU — quality fully maintained' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ background: 'rgba(16,185,129,0.08)', padding: '9px 14px', fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--green)', width: 120, flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.label}</div>
                <div style={{ padding: '9px 14px', fontSize: '0.78rem', color: 'var(--t3)' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={vUp} custom={1}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Runtime Architecture</div>
          {[
            { top: 'Base Model (GGUF Q4_K_M)', bg: 'rgba(37,99,235,0.08)', border: 'var(--blue)', h: 80 },
            { top: '+ LoRA Adapter weights', bg: 'rgba(124,58,237,0.08)', border: 'var(--purple)', h: 50 },
            { top: '= Merged Inference Model', bg: 'rgba(16,185,129,0.08)', border: 'var(--green)', h: 60, bold: true },
          ].map((b, i) => (
            <div key={b.top} style={{ height: b.h, borderRadius: 10, background: b.bg, border: `1px solid ${b.border}`, display: 'flex', alignItems: 'center', paddingLeft: 20, marginBottom: i < 2 ? 4 : 0, fontWeight: b.bold ? 700 : 500, fontSize: '0.84rem', color: 'var(--t2)' }}>
              {b.top}
            </div>
          ))}
          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            {[{ v: '5.8GB', l: 'VRAM (GPU)' }, { v: '~8s', l: 'CPU latency' }, { v: '60.91', l: 'BLEU (CPU)' }].map(s => (
              <div key={s.l} className="card" style={{ flex: 1, textAlign: 'center', padding: '14px 10px' }}>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--green)' }}>{s.v}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--t4)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
