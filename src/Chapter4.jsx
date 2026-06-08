/**
 * CHAPTER 4 — Architecture & System Design
 * 2 slides: Full ecosystem map + Pipeline flow
 */
import { motion } from 'framer-motion';
import { Slide, vUp, vLeft, vFade } from './Motion';

export function S14Ch4Intro() {
  return (
    <Slide id="s14" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 04</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>Architecture &amp;<br /><span className="grad">System Design</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>The complete Locelith ecosystem — from CLI to SLM to SaaS platform.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

/* ─── S15: FULL ECOSYSTEM MAP ─── */
export function S15Architecture() {
  return (
    <Slide id="s15" className="slide slide-light">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: 14 }}>

        {/* HEADER */}
        <motion.div variants={vUp} custom={0} style={{ textAlign: 'center' }}>
          <div className="eyebrow">System Architecture — A to Z</div>
          <h2 className="title-md">The complete <span className="grad">Locelith ecosystem.</span></h2>
        </motion.div>

        {/* TOP: SaaS Platform */}
        <motion.div variants={vUp} custom={1} style={{ padding: '12px 20px', borderRadius: 12, background: 'color-mix(in srgb, var(--blue) 7%, var(--surface))', border: '2px solid color-mix(in srgb, var(--blue) 25%, transparent)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>SaaS Web Platform · Vite 5 + React 18 + TypeScript + TailwindCSS</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            {['Landing Page', 'Dashboard', 'Admin Panel', 'Documentation', 'Scraper UI'].map(p => (
              <span key={p} style={{ fontSize: '0.72rem', color: 'var(--blue)', background: 'var(--surface)', padding: '4px 12px', borderRadius: 6, border: '1px solid var(--border)', fontWeight: 600 }}>{p}</span>
            ))}
          </div>
        </motion.div>

        {/* CENTER: 3-column diagram */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>

          {/* LEFT: Developer side */}
          <motion.div variants={vLeft} custom={2} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: '12px 14px', borderRadius: 10, background: 'color-mix(in srgb, var(--amber) 8%, var(--surface))', border: '2px solid color-mix(in srgb, var(--amber) 30%, transparent)', textAlign: 'center', flex: 1 }}>
              <div style={{ fontWeight: 800, color: 'var(--amber)', marginBottom: 6, fontSize: '0.82rem' }}>Developer Workspace</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--t3)' }}>React · Angular · Vanilla JS projects</div>
            </div>
            <div style={{ padding: '12px 14px', borderRadius: 10, background: 'color-mix(in srgb, var(--blue) 8%, var(--surface))', border: '2px solid color-mix(in srgb, var(--blue) 30%, transparent)', textAlign: 'center', flex: 1 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--blue)', fontWeight: 800, marginBottom: 4 }}>@locelith/core CLI</div>
              <div style={{ fontSize: '0.63rem', color: 'var(--t3)' }}>init · translate · scan · replace · backup</div>
            </div>
            <div style={{ padding: '12px 14px', borderRadius: 10, background: 'color-mix(in srgb, var(--cyan) 8%, var(--surface))', border: '2px solid color-mix(in srgb, var(--cyan) 30%, transparent)', textAlign: 'center', flex: 1 }}>
              <div style={{ fontWeight: 800, color: 'var(--cyan)', marginBottom: 6, fontSize: '0.82rem' }}>Runtime SDK Packages</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {['@locelith/react', 'locelith-angular', '@locelith/vanilla'].map(p => (
                  <span key={p} style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--cyan)' }}>{p}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ARROW → */}
          <motion.div variants={vFade} custom={2.5} style={{ display: 'flex', alignItems: 'center', color: 'var(--border2)', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.div>

          {/* CENTER: Backend services stack */}
          <motion.div variants={vUp} custom={3} style={{ flex: 1.3, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ padding: '12px 14px', borderRadius: 10, background: 'color-mix(in srgb, var(--purple) 8%, var(--surface))', border: '2px solid color-mix(in srgb, var(--purple) 30%, transparent)', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--purple)', fontSize: '0.82rem', marginBottom: 4 }}>Business API</div>
              <div style={{ fontSize: '0.63rem', color: 'var(--t3)' }}>Express · Prisma · JWT · bcrypt · Stripe</div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--border2)', lineHeight: 1 }}>↓</div>
            <div style={{ padding: '12px 14px', borderRadius: 10, background: 'color-mix(in srgb, var(--blue) 8%, var(--surface))', border: '2px solid color-mix(in srgb, var(--blue) 30%, transparent)', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--blue)', fontSize: '0.82rem', marginBottom: 4 }}>Vault Server</div>
              <div style={{ fontSize: '0.63rem', color: 'var(--t3)' }}>HMAC Auth · AST Scan · PII Guard · Cache · GDPR</div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--border2)', lineHeight: 1 }}>↓</div>
            <div style={{ padding: '12px 14px', borderRadius: 10, background: 'color-mix(in srgb, var(--cyan) 8%, var(--surface))', border: '2px solid color-mix(in srgb, var(--cyan) 30%, transparent)', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--cyan)', fontSize: '0.82rem', marginBottom: 4 }}>Locelith SLM</div>
              <div style={{ fontSize: '0.63rem', color: 'var(--t3)', marginBottom: 6 }}>FastAPI · GGUF Q4_K_M · llama.cpp · QualityModel</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--cyan)', background: 'var(--surface)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', fontWeight: 700 }}>BLEU 61.34</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--cyan)', background: 'var(--surface)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', fontWeight: 700 }}>chrF 83.42</span>
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--t4)', fontStyle: 'italic' }}>↑ fallback: Alibaba Qwen-plus / Groq LLaMA 3.3</div>
          </motion.div>

          {/* ARROW → */}
          <motion.div variants={vFade} custom={3.5} style={{ display: 'flex', alignItems: 'center', color: 'var(--border2)', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.div>

          {/* RIGHT: Data stores */}
          <motion.div variants={vLeft} custom={4} style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'PostgreSQL', sub: 'Users · Billing · API Keys', color: 'var(--blue)' },
              { name: 'MongoDB', sub: 'Translations · Locales', color: 'var(--green)' },
              { name: 'JSON Cache', sub: 'Railway Volume · L1 zero-latency', color: 'var(--amber)' },
            ].map(db => (
              <div key={db.name} style={{ padding: '12px 14px', borderRadius: 10, background: `color-mix(in srgb, ${db.color} 6%, var(--surface))`, border: `1px solid color-mix(in srgb, ${db.color} 22%, transparent)`, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 700, color: db.color, fontSize: '0.8rem', marginBottom: 4 }}>{db.name}</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--t4)' }}>{db.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM: Infrastructure bar */}
        <motion.div variants={vUp} custom={5} style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--t4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 8 }}>Infrastructure</span>
          {['Railway (Cloud hosting)', 'Docker containers', 'Stripe (Payments)', 'MCP Server (7 AI tools)'].map(i => (
            <span key={i} style={{ fontSize: '0.7rem', color: 'var(--green)', fontWeight: 600, padding: '3px 10px', borderRadius: 6, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>· {i}</span>
          ))}
        </motion.div>

      </div>
    </Slide>
  );
}

/* ─── S16: 5-STAGE VAULT PIPELINE ─── */
export function S16Vault() {
  return (
    <Slide id="s16" className="slide slide-lighter">
      <div className="cols-2" style={{ gap: 48, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Core Component — Vault Server</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>More than just an<br /><span style={{ color: 'var(--blue)' }}>AST pipeline.</span></h2>
          <p className="body-sm" style={{ marginBottom: 24 }}>
            The Vault is the central intelligence of Locelith. It acts as an Express.js secure proxy that orchestrates the translation pipeline, API key security, GDPR data erasure, and database management.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Security Core', val: 'HMAC-SHA256 Auth · Replay attack prevention' },
              { label: 'Data Manager', val: 'GDPR cascading deletion · Project management' },
              { label: 'Cache Strategy', val: 'JSON file (L1) → PostgreSQL (L2) → SLM inference' },
              { label: 'PII Guard', val: 'Regex masks emails, phones, cards before inference' },
              { label: 'Design Pattern', val: 'Strategy — per-framework scanner & replacer classes' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ background: 'rgba(37,99,235,0.08)', padding: '9px 13px', fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--blue)', width: 130, flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.label}</div>
                <div style={{ padding: '9px 13px', fontSize: '0.76rem', color: 'var(--t3)', display: 'flex', alignItems: 'center' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={vUp} custom={1}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Core Translation Workflow</div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ position: 'absolute', left: 19, top: 20, bottom: 20, width: 2, background: 'var(--border2)', zIndex: 0 }} />
            {[
              { step: '1', label: 'Framework Detection', desc: 'package.json inspection → selects Strategy class', color: 'var(--blue)' },
              { step: '2', label: 'AST Scan', desc: 'Babel parser walks JSX/HTML tree, extracts strings', color: 'var(--blue)' },
              { step: '3', label: 'PII Sanitise', desc: 'Masks sensitive data with reversible placeholders', color: 'var(--purple)' },
              { step: '4', label: 'SLM Inference & Scoring', desc: 'Translates strings + scores quality via QualityModel', color: 'var(--cyan)' },
              { step: '5', label: 'AST Rewrite', desc: "Injects t('key') + useTranslation imports into source", color: 'var(--green)' },
            ].map((s, i) => (
              <motion.div key={s.step} variants={vLeft} custom={i + 2} style={{ display: 'flex', gap: 16, alignItems: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: `2px solid ${s.color}`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: '0.85rem', fontWeight: 800, flexShrink: 0, boxShadow: '0 0 0 4px var(--bg)' }}>
                  {s.step}
                </div>
                <div style={{ flex: 1, background: 'var(--surface)', padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: s.color, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--t3)' }}>{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
