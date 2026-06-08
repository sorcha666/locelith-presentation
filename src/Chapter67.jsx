/**
 * CHAPTER 6 — Testing & QA
 * CHAPTER 7 — Conclusion & Perspectives
 */
import { motion } from 'framer-motion';
import { Slide, vUp, vLeft, vFade, Num } from './Motion';

export function S27Ch6Intro() {
  return (
    <Slide id="s27" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 06</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>Testing &amp;<br /><span className="grad">Quality Assurance</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>Every architectural claim validated with evidence.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S28AST() {
  return (
    <Slide id="s28" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Pipeline Validation</div>
          <h2 className="title-md">AST extraction: <span className="accent-green">100% replacement rate</span><br />across all target frameworks.</h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 32 }}>
          <motion.div variants={vUp} custom={1}>
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
              <table className="data-table">
                <thead>
                  <tr><th>Framework</th><th style={{ textAlign: 'center' }}>Extracted</th><th style={{ textAlign: 'center' }}>Replaced</th><th style={{ textAlign: 'center' }}>Rate</th></tr>
                </thead>
                <tbody>
                  {[
                    { fw: 'React (JSX)', n: 247 }, { fw: 'Angular (HTML)', n: 183 },
                    { fw: 'Vanilla JS', n: 91 }, { fw: 'Mixed / edge cases', n: 34 },
                  ].map(r => (
                    <tr key={r.fw} className="row-winner">
                      <td style={{ fontWeight: 600 }}>{r.fw}</td>
                      <td style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>{r.n}</td>
                      <td style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>{r.n}</td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--green)' }}>100% ✓</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { t: 'npx locelith init', note: 'Config + .locelithignore + translations/ scaffolded' },
                { t: 'npx locelith translate --langs=fr,es,ar', note: '247 strings · 3 langs · 34 files rewritten' },
                { t: 'npx locelith scan', note: 'Extraction only — 247 strings found, 0 missed' },
                { t: 'npx locelith backup', note: 'Snapshot created before modifications' },
              ].map(item => (
                <div key={item.t} style={{ display: 'flex', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--green)', flexShrink: 0 }}>✓</span>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--t2)', marginBottom: 2, fontWeight: 600 }}>{item.t}</div>
                    <div className="body-xs">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={vUp} custom={2}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>API Security Tests</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {[
                'Missing API Key → 401 Unauthorized',
                'Expired HMAC Signature (>5 min) → 403 Forbidden',
                'Replayed request (same timestamp) → 403 Forbidden',
                'SQL injection in translation key → Input sanitised',
                'PII in source string (email addr.) → Masked before SLM',
              ].map((t, i) => (
                <motion.div key={i} variants={vFade} custom={i + 3}
                  style={{ display: 'flex', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <span style={{ color: 'var(--green)', flexShrink: 0, fontWeight: 700 }}>✓</span>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--t3)' }}>{t}</div>
                </motion.div>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>SLM Quality: GPU vs CPU Production</div>
            {[
              { env: 'GPU · bitsandbytes 4-bit NF4', bleu: 61.34, chrf: 83.42, lat: '~2.1s' },
              { env: 'CPU · GGUF Q4_K_M · llama.cpp', bleu: 60.91, chrf: 82.87, lat: '~8.4s' },
            ].map(s => (
              <div key={s.env} className="card" style={{ padding: '16px 20px', marginBottom: 10 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--t2)', marginBottom: 10 }}>{s.env}</div>
                <div style={{ display: 'flex', gap: 24 }}>
                  {[{ l: 'BLEU', v: s.bleu, c: 'var(--blue)' }, { l: 'chrF', v: s.chrf, c: 'var(--purple)' }, { l: 'Latency', v: s.lat, c: 'var(--amber)' }].map(m => (
                    <div key={m.l} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--sans)', fontSize: '1.3rem', fontWeight: 800, color: m.c }}>{m.v}</div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--t4)' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)', fontSize: '0.76rem', color: 'var(--t3)' }}>
              △ BLEU delta GPU→CPU: <strong style={{ color: 'var(--blue)' }}>−0.43</strong> · Quality fully maintained in production
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}

export function S29Ch7Intro() {
  return (
    <Slide id="s29" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 07</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>Conclusion &amp;<br /><span className="grad">Future Perspectives</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>What was built, what was learned, and where the work leads next.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S30Achievements() {
  return (
    <Slide id="s30" className="slide slide-lighter">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Project Achievements</div>
          <h2 className="title-md">Eight deliverables.<br /><span className="grad">Validated in production.</span></h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 14 }}>
          {[
            { abbr: 'AST', d: 'AST-based extraction', note: 'React · Angular · Vanilla JS · 100% replacement rate across all frameworks', c: 'var(--blue)' },
            { abbr: 'SDK', d: '4 SDK packages published', note: '@locelith/core (CLI) · @locelith/react · locelith-angular · @locelith/vanilla', c: 'var(--purple)' },
            { abbr: 'WEB', d: 'SaaS platform', note: 'Landing · Dashboard · Admin · Documentation · Scraper · Stripe billing', c: 'var(--cyan)' },
            { abbr: 'API', d: 'Business API', note: '9 route groups: auth · apiKeys · stripe · subscriptions · translations · usage · admin', c: 'var(--green)' },
            { abbr: 'QA', d: 'Quality model', note: 'Keras H5 quality scorer trained on 400K+ synthetic pairs · auto-accept/flag/reject', c: 'var(--amber)' },
            { abbr: 'PAY', d: 'Stripe integration', note: 'Checkout · webhooks · billing portal · subscription management', c: 'var(--blue)' },
            { abbr: 'MCP', d: 'MCP Server', note: '7 tools — AI-agent driven localisation automation via @modelcontextprotocol/sdk', c: 'var(--purple)' },
            { abbr: 'OPS', d: 'Cloud deployment', note: 'Railway · Alibaba Qwen-plus + Groq Cloud · no GPU required', c: 'var(--green)' },
          ].map((item, i) => (
            <motion.div key={item.d} variants={vLeft} custom={i + 1}
              style={{ display: 'flex', gap: 14, padding: '14px 18px', borderRadius: 12, background: 'var(--surface)', border: `1px solid var(--border)`, alignItems: 'flex-start' }}>
              <div style={{ width: 42, height: 42, background: `${item.c}15`, color: item.c, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{item.abbr}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--t1)', marginBottom: 3 }}>{item.d}</div>
                <div className="body-xs">{item.note}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function S31Perspectives() {
  return (
    <Slide id="s31" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Future Work</div>
          <h2 className="title-md">The roadmap ahead.</h2>
        </motion.div>
        <div className="cols-3" style={{ gap: 16 }}>
          {[
            { abbr: 'VUE', title: 'Vue.js & Svelte', body: 'The modular AST visitor pattern is architected for Vue SFC and Svelte template support as the next integration targets.', color: 'var(--blue)' },
            { abbr: 'IDE', title: 'VS Code Extension', body: 'An IDE extension for inline string detection, on-hover translation preview, and one-click localisation from the editor.', color: 'var(--purple)' },
            { abbr: 'ML', title: 'Continuous Training', body: 'Validated correction exports from the dashboard will feed back into a continuous fine-tuning loop, pushing BLEU beyond 65.', color: 'var(--cyan)' },
            { abbr: 'I18N', title: '200+ Languages', body: 'Expanding the corpus to include underrepresented African and South-East Asian languages, targeting broader global coverage.', color: 'var(--green)' },
            { abbr: 'AI', title: 'Agentic Localisation', body: 'Extending the MCP server to support autonomous AI agents that can plan and execute full localisation projects from a single prompt.', color: 'var(--amber)' },
            { abbr: 'OSS', title: 'Open Source Release', body: 'Full open-source release on GitHub with docs at docs.locelith.dev and a community-maintained free tier on npm.', color: 'var(--purple-light)' },
          ].map((d, i) => (
            <motion.div key={d.title} variants={vUp} custom={i + 1} className="card"
              style={{ borderTop: `2px solid ${d.color}`, padding: '22px 20px' }}
              whileHover={{ y: -4, boxShadow: `0 16px 40px ${d.color}18` }}>
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

export function S32Closing() {
  return (
    <Slide id="s32" className="slide slide-lighter" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <img src="/locelithai.png" alt="Locelith" style={{ height: 80, objectFit: 'contain', marginBottom: 40, opacity: 0.9 }} />
        </motion.div>
        <motion.div variants={vUp} custom={1}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 600, color: 'var(--t2)', lineHeight: 1.6, marginBottom: 48, letterSpacing: '-0.01em' }}>
            "Locelith demonstrates that modern localisation can evolve from a fragmented, manually maintained process into an <em style={{ color: 'var(--blue)', fontStyle: 'normal' }}>intelligent, automated, privacy-preserving ecosystem</em> powered by efficient language models and scalable engineering practices."
          </p>
        </motion.div>
        <motion.div variants={vUp} custom={2} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          {[
            { n: '61.34', l: 'BLEU Score' }, { n: '112', l: 'Languages' },
            { n: '4.5M', l: 'Training Pairs' }, { n: '4', l: 'SDK Packages' },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding: '18px 28px', textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--blue)', letterSpacing: '-0.03em' }}>{s.n}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--t4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
        <motion.div variants={vUp} custom={3}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--t1)', marginBottom: 8 }}>Oussama Elkamel &amp; Sarra Chtioui</div>
          <div style={{ color: 'var(--t4)', fontSize: '0.85rem', marginBottom: 28 }}>EPI Digital School · Synervy Technologies · PFA 2025–2026</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="chip chip-blue">locelith.dev</span>
            <span className="chip chip-purple">@locelith/core</span>
            <span className="chip chip-green">Questions welcome</span>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
