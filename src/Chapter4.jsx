/**
 * CHAPTER 4 — Design, Conception & Architecture
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
          <p className="subtitle" style={{ margin: '0 auto' }}>Revealing Locelith as a complete engineering ecosystem — component by component.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S15Architecture() {
  const tiers = [
    {
      name: 'Client Layer',
      color: 'var(--amber)',
      tag: 'Frontend',
      items: ['React SPA (Dashboard + Marketing)', '@locelith/react · /angular · /vanilla SDK', 'CLI Tool (npx locelith)', 'Marketing Website (Vite 5)'],
    },
    {
      name: 'API Gateway',
      color: 'var(--blue)',
      tag: 'Backend',
      items: ['JWT Authentication Middleware', 'HMAC-SHA256 Request Signing', 'Rate Limiting & Subscription Guard', 'Stripe Webhook Handler (Express.js)'],
    },
    {
      name: 'Service Layer',
      color: 'var(--cyan)',
      tag: 'Core Services',
      items: ['Vault Server — AST · PII · Cache · Rewriter · GDPR', 'Alibaba Cloud AI (primary) + Groq Cloud (fallback)', 'Web Scraping Pipeline (Axios/Cheerio + MongoDB)'],
    },
    {
      name: 'Persistence Layer',
      color: 'var(--green)',
      tag: 'Data',
      items: ['PostgreSQL via Prisma (Users, Billing, API Keys)', 'MongoDB via Mongoose (Translations, Locales)', 'JSON Cache on Railway Volume (L1 zero-latency)'],
    },
  ];

  return (
    <Slide id="s15" className="slide slide-light">
      <div className="cols-2" style={{ gap: 56, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Global Architecture</div>
          <h2 className="title-md" style={{ marginBottom: 16 }}>Three-tier design.<br /><span className="grad">Zero single point of failure.</span></h2>
          <p className="body-sm" style={{ marginBottom: 28 }}>
            An independent micro-service design: three Node.js processes, one FastAPI inference server, and a dual-database persistence strategy — all connected through authenticated HTTP.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Full-Stack', val: 'Node.js · Express · React · Vite · Prisma' },
              { label: 'AI Stack', val: 'Unsloth · PEFT · TRL · llama.cpp · FastAPI' },
              { label: 'Infra', val: 'Railway · Docker · GGUF · Stripe' },
              { label: 'Auth Model', val: 'JWT + HMAC-SHA256' },
            ].map(i => (
              <div key={i.label} style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--t4)', width: 80, flexShrink: 0 }}>{i.label}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--t2)', fontWeight: 500 }}>{i.val}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', width: '100%', maxWidth: 480 }}>
          {tiers.map((t, i) => (
            <div key={t.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <motion.div variants={vLeft} custom={i + 1}
                style={{ width: '100%', padding: '14px 18px', borderRadius: 12, background: `color-mix(in srgb, ${t.color} 8%, var(--surface))`, border: `2px solid color-mix(in srgb, ${t.color} 30%, transparent)`, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{t.tag}</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: t.color, marginBottom: 10 }}>{t.name}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 8px' }}>
                  {t.items.map(item => (
                    <span key={item} style={{ fontSize: '0.68rem', color: 'var(--t3)', background: 'var(--surface)', padding: '3px 8px', borderRadius: 6, border: '1px solid var(--border)' }}>{item}</span>
                  ))}
                </div>
              </motion.div>
              {i < tiers.length - 1 && (
                <motion.div variants={vFade} custom={i + 1.5} style={{ color: 'var(--border2)', padding: '6px 0' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><polyline points="18 16 12 22 6 16"></polyline></svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function S16Vault() {
  return (
    <Slide id="s16" className="slide slide-lighter">
      <div className="cols-2" style={{ gap: 48, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Core Component — Vault Server</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>The AST pipeline is the<br /><span style={{ color: 'var(--blue)' }}>engineering heart</span> of Locelith.</h2>
          <p className="body-sm" style={{ marginBottom: 24 }}>
            A multi-stage Express.js server with a Babel AST scanner, PII sanitisation, HMAC auth, and AST-based code rewriter. Supports React, Angular, and Vanilla JS via the <strong>Strategy pattern</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Authentication', val: 'HMAC-SHA256 · 5-min replay-prevention window' },
              { label: 'AST Parser', val: '@babel/parser — walks JSX tree, extracts string nodes' },
              { label: 'Cache Strategy', val: 'JSON file (L1) → PostgreSQL (L2) → SLM inference' },
              { label: 'PII Guard', val: 'Regex masks emails, phones, cards with reversible placeholders' },
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
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>5-Stage Pipeline</div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Vertical connecting line */}
            <div style={{ position: 'absolute', left: 19, top: 20, bottom: 20, width: 2, background: 'var(--border2)', zIndex: 0 }} />
            
            {[
              { step: '1', label: 'Framework Detection', desc: 'package.json inspection → select Strategy', color: 'var(--blue)' },
              { step: '2', label: 'AST Scan', desc: 'Babel parser walks JSX tree, extracts strings', color: 'var(--blue)' },
              { step: '3', label: 'PII Sanitise', desc: 'Masks emails, phones, card numbers with placeholders', color: 'var(--purple)' },
              { step: '4', label: 'SLM Translate', desc: '3-level cache: JSON → PostgreSQL → SLM inference', color: 'var(--cyan)' },
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

export function S17SDK() {
  return (
    <Slide id="s17" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 36 }}>
          <div className="eyebrow">SDK Architecture</div>
          <h2 className="title-md">Four packages. Every framework.<br /><span className="grad">One pipeline command.</span></h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 16, marginBottom: 20 }}>
          {[
            { pkg: '@locelith/core', abbr: 'CLI', color: 'var(--blue)', cmds: ['init', 'translate', 'scan', 'replace', 'backup'], desc: 'The CLI engine — 5 commands covering the full pipeline from initialisation to source code rewriting, backup and GDPR cleanup.' },
            { pkg: '@locelith/react', abbr: 'R', color: '#00D8FF', cmds: ['<LocelithProvider>', 'useTranslation()', '<LanguageSelector />'], desc: 'React Context provider + runtime hook. Zero-reload language switching with lazy-loaded locale bundles.' },
            { pkg: 'locelith-angular', abbr: 'A', color: '#DD0031', cmds: ['locelithTranslate (pipe)', 'LocelithModule', 'Angular DI'], desc: 'Angular module with a declarative template pipe. Fully compatible with Angular dependency injection.' },
            { pkg: '@locelith/vanilla', abbr: 'JS', color: 'var(--amber)', cmds: ['locelith.t("key")', 'ESM + CJS dual output'], desc: 'Zero-dependency JS API. Works in any JavaScript environment including legacy apps.' },
          ].map((s, i) => (
            <motion.div key={s.pkg} variants={vUp} custom={i + 1} className="card" style={{ display: 'flex', gap: 16, padding: '20px 22px', borderTop: `2px solid ${s.color}` }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: `color-mix(in srgb, ${s.color} 15%, transparent)`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontFamily: 'var(--mono)', fontSize: '0.75rem' }}>{s.abbr}</div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700, color: s.color, marginBottom: 6 }}>{s.pkg}</div>
                <p className="body-xs" style={{ marginBottom: 10, lineHeight: 1.6 }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {s.cmds.map(c => <span key={c} style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', background: 'var(--bg2)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 4, color: 'var(--t3)' }}>{c}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={vUp} custom={5} style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'Strategy', desc: 'Per-framework scanner & replacer' },
            { label: 'Observer (SSE)', desc: 'Real-time pipeline events' },
            { label: 'Repository', desc: 'Prisma data access layer' },
            { label: 'Facade', desc: 'Unified SDK API surface' },
            { label: 'Command', desc: 'CLI command encapsulation' },
          ].map(p => (
            <div key={p.label} style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.12)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--blue)', marginBottom: 3 }}>{p.label}</div>
              <div style={{ fontSize: '0.66rem', color: 'var(--t4)' }}>{p.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}

export function S18Database() {
  return (
    <Slide id="s18" className="slide slide-lighter">
      <div className="cols-2" style={{ gap: 48 }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Data Architecture</div>
          <h2 className="title-md" style={{ marginBottom: 24 }}>Dual-database strategy.<br /><span className="accent-cyan">Right tool for each job.</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { db: 'PostgreSQL', role: 'Primary relational store (Prisma ORM)', entities: ['User · Subscription · ApiKey', 'Project · UsageLog · Invoice'], color: 'var(--blue)', why: 'ACID compliance for billing & identity' },
              { db: 'MongoDB', role: 'Translation document store (Mongoose)', entities: ['Translation · Locale · Domain', 'Cache · BackTranslation'], color: 'var(--green)', why: 'Flexible schema for multilingual pair storage' },
              { db: 'JSON Cache', role: 'File-system L1 cache (Railway Volume)', entities: ['Per-project locale files', 'Key → translated string (zero-latency)'], color: 'var(--amber)', why: 'Zero-latency resolution for known strings' },
            ].map(d => (
              <div key={d.db} className="card" style={{ padding: '16px 20px', borderLeft: `3px solid ${d.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: d.color }}>{d.db}</span>
                  <span className="body-xs">{d.role}</span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--t4)', marginBottom: 4 }}>{d.entities.join(' · ')}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--t3)', fontStyle: 'italic' }}>→ {d.why}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={vUp} custom={1}>
          <div className="eyebrow">Security Model</div>
          <h2 className="title-md" style={{ marginBottom: 24 }}>Security by design,<br /><span className="accent-purple">not by addition.</span></h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Middleware Chain (every request)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { label: 'Rate Limiter', color: 'var(--amber)' },
                { label: 'JWT Middleware', color: 'var(--blue)' },
                { label: 'Subscription Guard', color: 'var(--cyan)' },
                { label: 'Route Handler', color: 'var(--green)' },
              ].map((m, i) => (
                <div key={m.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', padding: '10px 16px', borderRadius: 8, background: `color-mix(in srgb, ${m.color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${m.color} 25%, transparent)`, fontWeight: 700, fontSize: '0.82rem', color: m.color, textAlign: 'center' }}>{m.label}</div>
                  {i < 3 && <div style={{ width: 2, height: 12, background: 'var(--border2)', margin: '0 auto' }} />}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Request Signing', val: 'HMAC-SHA256 · shared secret · 5-min timestamp window' },
              { label: 'Password Storage', val: 'bcrypt cost factor 10' },
              { label: 'PII Sanitisation', val: 'Regex strips emails, phones, IDs before SLM inference' },
              { label: 'Data Erasure', val: 'Cascade delete across all entities (GDPR compliance)' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{ width: 4, flexShrink: 0, borderRadius: 2, background: 'var(--purple)', alignSelf: 'stretch' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.76rem', color: 'var(--purple)', marginBottom: 2 }}>{item.label}</div>
                  <div className="body-xs">{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
