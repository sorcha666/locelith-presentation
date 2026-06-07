/**
 * CHAPTER 1 — General Context & Host Organisation
 */
import { motion } from 'framer-motion';
import { Slide, vUp, vLeft, vFade, Num } from './Motion';

export function S01Cover() {
  return (
    <Slide id="s01" className="slide slide-light" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: 780, position: 'relative', zIndex: 2 }}>
        <motion.div variants={vUp} custom={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <img src="/locelithai.png" alt="Locelith" style={{ height: 56, objectFit: 'contain' }} />
            <div style={{ width: 1, height: 40, background: 'var(--border2)' }} />
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--t4)', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.7 }}>
              PFA — 2025 / 2026<br />EPI Digital School · Sousse
            </div>
          </div>
        </motion.div>

        <motion.div variants={vUp} custom={1}>
          <h1 className="title-xl" style={{ marginBottom: 16 }}>Locelith</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--t3)', lineHeight: 1.55, fontWeight: 400, marginBottom: 48, maxWidth: 600 }}>
            An AI-assisted framework for automating the extraction, translation, and management of multilingual content in web applications.
          </p>
        </motion.div>

        <motion.div variants={vUp} custom={2} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 52 }}>
          {['AST Pipeline', 'Alibaba Qwen-plus', '112 Languages', 'SaaS Platform', 'Multi-framework SDK'].map(t => (
            <span key={t} className="chip chip-blue">{t}</span>
          ))}
        </motion.div>

        <motion.div variants={vUp} custom={3} style={{ display: 'flex', gap: 40 }}>
          {[
            { name: 'Oussama Elkamel', role: '4th Grade Software Engineer' },
            { name: 'Sarra Chtioui', role: '4th Grade AI Engineer' },
          ].map(a => (
            <div key={a.name}>
              <div style={{ fontWeight: 700, color: 'var(--t1)', marginBottom: 3 }}>{a.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--blue)' }}>{a.role}</div>
            </div>
          ))}
        </motion.div>
      </div>

    </Slide>
  );
}

export function S02Ch1Intro() {
  return (
    <Slide id="s02" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 01</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>General Context &amp;<br /><span className="grad">Host Organisation</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>Understanding the globalisation imperative and why software localisation is a strategic engineering challenge.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S03Stat() {
  return (
    <Slide id="s03" className="slide slide-lighter">
      <div className="cols-2" style={{ gap: 80, alignItems: 'center' }}>
        <motion.div variants={vLeft} custom={0}>
          <div className="stat-block" style={{ marginBottom: 40 }}>
            <div className="stat-value" style={{ color: 'var(--blue)' }}><Num value={72.4} suffix="%" /></div>
            <div className="stat-label">of consumers prefer their native language</div>
          </div>
          <div className="stat-block" style={{ marginBottom: 40 }}>
            <div className="stat-value" style={{ color: 'var(--purple)' }}><Num value={40} suffix="%" /></div>
            <div className="stat-label">higher conversion with localised UIs</div>
          </div>
          <div className="stat-block">
            <div className="stat-value" style={{ color: 'var(--cyan)' }}><Num value={7600} suffix="" prefix="$" /></div>
            <div className="stat-label">global localisation market size (billions)</div>
          </div>
        </motion.div>

        <motion.div variants={vUp} custom={1}>
          <div className="eyebrow">The Globalisation Imperative</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>Language is the first barrier to global reach.</h2>
          <p className="subtitle" style={{ marginBottom: 28 }}>
            Modern software products are deployed across dozens of countries from day one. Yet the infrastructure to support multilingual applications remains fundamentally broken — slow, expensive, and manual.
          </p>
          <div className="rule-grad" />
          <p className="body-sm">Sources: CSA Research · Common Sense Advisory · Statista 2024</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S04Tax() {
  return (
    <Slide id="s04" className="slide slide-light">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 48 }}>
          <div className="eyebrow">The Problem</div>
          <h2 className="title-lg">The Localisation Tax</h2>
        </motion.div>
        <div className="cols-3" style={{ gap: 20, marginBottom: 40 }}>
          {[
            { pct: '25–30%', label: 'of total development effort', desc: 'Average overhead added by internationalisation when introduced late in the lifecycle.', color: 'var(--blue)', chip: 'Engineering Cost' },
            { pct: '58%', label: 'of teams delayed a launch', desc: 'Product launches delayed due to localisation bottlenecks, according to industry surveys.', color: 'var(--amber)', chip: 'Business Impact' },
            { pct: '$∞', label: 'API cost for scale', desc: 'Commercial translation APIs charge per character — costs that scale linearly and unpredictably with product growth.', color: 'var(--red)', chip: 'Privacy Risk' },
          ].map((d, i) => (
            <motion.div key={d.chip} variants={vUp} custom={i + 1} className="card card-accent-blue" style={{ borderTopColor: d.color }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '2.8rem', fontWeight: 900, color: d.color, marginBottom: 8, letterSpacing: '-0.04em' }}>{d.pct}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--t2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.label}</div>
              <p className="body-sm" style={{ marginBottom: 14 }}>{d.desc}</p>
              <span className="chip" style={{ color: d.color, borderColor: `${d.color}33`, background: `${d.color}0A`, fontSize: '0.65rem' }}>{d.chip}</span>
            </motion.div>
          ))}
        </div>
        <motion.div variants={vUp} custom={4} className="quote-block">
          <p className="quote-text">"No existing tool takes a developer from raw source code to a production-ready multilingual application in a single automated step."</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S05Host() {
  return (
    <Slide id="s05" className="slide slide-lighter">
      <div className="cols-2-3" style={{ gap: 64, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Host Organisation</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>Synervy Technologies</h2>
          <p className="body-sm" style={{ marginBottom: 28, lineHeight: 1.8 }}>
            An external IT company based in Sousse, Tunisia, specialising in digital technologies and AI-driven product development. The internship took place over 24 weeks, providing the engineering context and research environment for this work.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['AI Engineering', 'SaaS Products', 'NLP Research', 'Full-Stack'].map(t => (
              <span key={t} className="chip chip-blue">{t}</span>
            ))}
          </div>
        </motion.div>
        <motion.div variants={vUp} custom={1} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Institution', val: 'EPI Digital School — École Polytechnique Internationale, Sousse' },
            { label: 'Degree', val: 'End-of-Year Project (PFA) — Software & AI Engineering · 4th Grade' },
            { label: 'Project Period', val: 'February — July 2026 · 24 weeks' },
            { label: 'Methodology', val: 'Scrumban · 12 sprints · Kanban flow · WIP limit 2' },
            { label: 'Supervisors', val: 'Academic & industrial joint supervision' },
          ].map((item, i) => (
            <motion.div key={item.label} variants={vUp} custom={i + 2}
              style={{ display: 'flex', gap: 16, padding: '14px 18px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div style={{ width: 4, background: 'var(--blue)', borderRadius: 4, alignSelf: 'stretch' }} />
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--t2)', lineHeight: 1.5 }}>{item.val}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}

export function S06Objectives() {
  return (
    <Slide id="s06" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 48 }}>
          <div className="eyebrow">Project Objectives</div>
          <h2 className="title-lg">Four deliverables.<br /><span className="grad">One ecosystem.</span></h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 20 }}>
          {[
            { n: '01', title: 'AST Translation Pipeline', body: 'A Vault Server that automatically scans source code, extracts UI strings via AST analysis, translates them via Alibaba Qwen-plus or Groq Cloud, and rewrites source files — end to end.', color: 'var(--blue)', chips: ['Vault Server', 'AST', 'HMAC-SHA256'] },
            { n: '02', title: 'AI Quality Pipeline', body: 'A translation quality scoring system built on a trained Keras model (400K+ synthetic pairs) with PII sanitisation via DataSanitizationService and multi-provider fallback (Alibaba → Groq).', color: 'var(--purple)', chips: ['Keras', 'QualityService', 'Alibaba', 'Groq'] },
            { n: '03', title: 'SaaS Management Platform', body: 'A complete web application covering subscription management, developer documentation, API key governance, usage analytics, admin panel, and a Stripe-integrated billing portal.', color: 'var(--cyan)', chips: ['Vite', 'React 18', 'Stripe', 'Recharts'] },
            { n: '04', title: 'Multi-Framework SDK', body: 'Four published npm packages — @locelith/core (CLI), @locelith/react, locelith-angular, @locelith/vanilla — enabling any team to integrate localisation via a single CLI command.', color: 'var(--green)', chips: ['React', 'Angular', 'CLI', 'npm'] },
          ].map((d, i) => (
            <motion.div key={d.n} variants={vUp} custom={i + 1} className="card"
              style={{ display: 'flex', gap: 20, padding: '24px 28px', borderLeft: `3px solid ${d.color}`, borderRadius: 12 }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '2.5rem', fontWeight: 900, color: d.color, opacity: 0.15, lineHeight: 1, flexShrink: 0, letterSpacing: '-0.04em' }}>{d.n}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--t1)', marginBottom: 8 }}>{d.title}</div>
                <p className="body-sm" style={{ marginBottom: 14 }}>{d.body}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {d.chips.map(c => <span key={c} className="chip" style={{ borderColor: `${d.color}44`, background: `${d.color}0C`, color: d.color, fontSize: '0.62rem' }}>{c}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
