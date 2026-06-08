/**
 * CHAPTER 2 — State of the Art & Problematic
 * CHAPTER 3 — Specifications & Requirements
 */
import { motion } from 'framer-motion';
import { Slide, vUp, vLeft, vFade } from './Motion';

export function S07Ch2Intro() {
  return (
    <Slide id="s07" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 02</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>State of the Art &amp;<br /><span className="grad">Problematic</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>What exists today — and why it is not enough.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S08Workflow() {
  const steps = [
    { step: '01', label: 'Developer spots text', note: 'Manual identification across thousands of files' },
    { step: '02', label: 'Wraps in t() hook', note: 'Error-prone, incomplete, undocumented' },
    { step: '03', label: 'Exports .json files', note: 'Fragile format, no version control strategy' },
    { step: '04', label: 'Sends to translator', note: '3–6 week turnaround, no context provided' },
    { step: '05', label: 'Re-imports translations', note: 'Manual diff, frequent regressions' },
    { step: '06', label: 'Repeat for every update', note: 'Every content change restarts the cycle' },
  ];
  return (
    <Slide id="s08" className="slide slide-lighter">
      <div className="cols-3-2" style={{ gap: 64, alignItems: 'center' }}>
        <div>
          <motion.div variants={vUp} custom={0} style={{ marginBottom: 36 }}>
            <div className="eyebrow">Current Industry Workflow</div>
            <h2 className="title-md">How teams localise today.<br /><span style={{ color: 'var(--red)' }}>It is broken by design.</span></h2>
          </motion.div>
          <div className="tl">
            {steps.map((s, i) => (
              <motion.div key={s.step} variants={vUp} custom={i + 1} className="tl-item">
                <div className="tl-dot" style={{ borderColor: i === 5 ? 'var(--red)' : 'var(--blue)', background: 'var(--surface)' }} />
                <div style={{ display: 'flex', gap: 14 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', paddingTop: 2, width: 24, flexShrink: 0 }}>{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--t1)', marginBottom: 2 }}>{s.label}</div>
                    <div className="body-xs">{s.note}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div variants={vUp} custom={7} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Consequence</div>
          {[
            { val: '6–12 weeks', desc: 'average time to localise a medium-sized web app' },
            { val: '3× rework', desc: 'when product copy changes post-launch' },
          ].map(r => (
            <div key={r.val} className="card" style={{ padding: '18px 22px', borderLeft: '3px solid var(--border2)' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.02em', marginBottom: 4 }}>{r.val}</div>
              <div className="body-xs">{r.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}

export function S09Comparison() {
  const rows = [
    { f: 'Automatic string detection',   manual: false, api: false, crowdin: false, i18n: null,  locelith: true },
    { f: 'UI-domain AI translation',     manual: false, api: null,  crowdin: null,  i18n: false, locelith: true },
    { f: 'Source code transformation',   manual: false, api: false, crowdin: false, i18n: false, locelith: true },
    { f: 'On-premise inference',         manual: null,  api: false, crowdin: false, i18n: null,  locelith: true },
    { f: '112+ languages',               manual: null,  api: true,  crowdin: true,  i18n: null,  locelith: true },
    { f: 'Full pipeline automation',     manual: false, api: false, crowdin: false, i18n: false, locelith: true },
  ];
  const t = v => v === true ? '+' : v === false ? '−' : '';
  const clr = v => v === true ? 'var(--green)' : v === false ? 'var(--t4)' : 'var(--t4)';

  return (
    <Slide id="s09" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Comparative Analysis</div>
          <h2 className="title-md">No existing solution closes<br />the full gap.</h2>
        </motion.div>
        <motion.div variants={vUp} custom={1} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Capability</th>
                <th style={{ textAlign: 'center' }}>Manual</th>
                <th style={{ textAlign: 'center' }}>Cloud API</th>
                <th style={{ textAlign: 'center' }}>Crowdin</th>
                <th style={{ textAlign: 'center' }}>i18next</th>
                <th style={{ textAlign: 'center', color: 'var(--blue)', background: 'rgba(37,99,235,0.06)' }}>Locelith</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr key={r.f} variants={vFade} custom={i + 2}>
                  <td style={{ fontWeight: 500 }}>{r.f}</td>
                  {[r.manual, r.api, r.crowdin, r.i18n].map((v, j) => (
                    <td key={j} style={{ textAlign: 'center', color: clr(v), fontFamily: 'var(--mono)', fontSize: '0.9rem', fontWeight: 700 }}>{t(v)}</td>
                  ))}
                  <td style={{ textAlign: 'center', color: 'var(--blue)', fontFamily: 'var(--mono)', fontSize: '1rem', fontWeight: 800, background: 'rgba(37,99,235,0.04)' }}>{t(r.locelith)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S10Problem() {
  return (
    <Slide id="s10" className="slide slide-lighter" style={{ minHeight: '70vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Research Question</div>
        </motion.div>
        <motion.div variants={vUp} custom={1}>
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: 700, lineHeight: 1.35, color: 'var(--t1)', marginBottom: 32, letterSpacing: '-0.02em' }}>
            How can we design a unified, privacy-preserving localisation system that takes a developer from <em style={{ color: 'var(--blue)', fontStyle: 'normal' }}>raw source code</em> to a <em style={{ color: 'var(--purple)', fontStyle: 'normal' }}>production-ready multilingual application</em> with a single automated pipeline?
          </h2>
        </motion.div>
        <motion.div variants={vUp} custom={2} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Automation', 'Privacy-Preserving', 'AI-Assisted', 'Open Source', 'Production-Ready'].map(t => (
            <span key={t} className="chip chip-purple">{t}</span>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}

export function S11Ch3Intro() {
  return (
    <Slide id="s11" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 03</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>Specifications &amp;<br /><span className="grad">Requirements Analysis</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>Systematically deriving what the system must achieve from first principles.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S12Actors() {
  return (
    <Slide id="s12" className="slide slide-light">
      <div className="cols-2" style={{ gap: 48, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">System Actors</div>
          <h2 className="title-md" style={{ marginBottom: 28 }}>Three roles.<br />Distinct responsibilities.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { role: 'Developer', color: 'var(--blue)', actions: ['Register & subscribe to plans', 'Run CLI translation pipeline', 'Manage API keys via dashboard', 'Integrate SDK into production apps'] },
              { role: 'Administrator', color: 'var(--purple)', actions: ['Manage user subscriptions (Stripe)', 'Monitor system performance', 'Ensure platform security', 'Handle GDPR data compliance'] },
              { role: 'AI Engineer', color: 'var(--cyan)', actions: ['Monitor SLM inference metrics', 'Manage translation datasets', 'Evaluate BLEU and chrF metrics'] },
            ].map(a => (
              <div key={a.role} className="card" style={{ borderLeft: `3px solid ${a.color}`, padding: '16px 20px' }}>
                <div style={{ fontWeight: 800, color: a.color, fontSize: '0.9rem', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{a.role}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {a.actions.map(ac => (
                    <div key={ac} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'var(--t3)' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                      {ac}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={vUp} custom={1} style={{ display: 'flex', flexDirection: 'column', alignSelf: 'stretch' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Core Use Case Diagram</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', borderRadius: 12, border: '1px solid var(--border)', padding: 10 }}>
            <img src="/global_usecase.png" alt="Global Use Case Diagram" style={{ width: '100%', maxHeight: 460, objectFit: 'contain' }} />
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S13NFR() {
  return (
    <Slide id="s13" className="slide slide-lighter">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Non-Functional Requirements</div>
          <h2 className="title-md">Quality attributes that define the system's character.</h2>
        </motion.div>
        <div className="cols-3" style={{ gap: 16 }}>
          {[
            { title: 'Performance', color: 'var(--blue)', items: ['<100 ms cached string resolution', '<60 s full pipeline on medium app', 'Parallel translation batching'] },
            { title: 'Security', color: 'var(--purple)', items: ['HMAC-SHA256 request signing', 'bcrypt password hashing', 'JWT session management'] },
            { title: 'Privacy (GDPR)', color: 'var(--cyan)', items: ['Data minimisation principle', 'PII masked prior to SLM translation', 'Right to erasure supported'] },
            { title: 'Availability', color: 'var(--green)', items: ['Business API high uptime', 'Typical SaaS platform reliability', 'Railway auto-restart policy'] },
            { title: 'Extensibility', color: 'var(--amber)', items: ['Modular AST parser architecture', 'Ready for Vue.js & Svelte', 'New language pair training'] },
            { title: 'Usability & Compat.', color: 'var(--purple-light)', items: ['Simple CLI interface', 'Intuitive dashboard', 'Consistent across React/Angular/Vanilla'] },
          ].map((d, i) => (
            <motion.div key={d.title} variants={vUp} custom={i + 1} className="card" style={{ borderTop: `2px solid ${d.color}` }}>
              <div style={{ fontWeight: 800, color: d.color, fontSize: '0.9rem', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {d.items.map(it => (
                  <div key={it} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.76rem', color: 'var(--t3)' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: d.color, flexShrink: 0, marginTop: 6 }} />
                    {it}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
