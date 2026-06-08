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
      items: ['Vault Server — AST · PII · Cache · Rewriter · GDPR', 'Locelith SLM (FastAPI primary) + Groq Cloud (fallback)', 'Web Scraping Pipeline (Axios/Cheerio + MongoDB)'],
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <motion.div variants={vUp} custom={0} style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="eyebrow">Global Architecture</div>
          <h2 className="title-md">Three-tier architecture.<br /><span className="grad">Zero single point of failure.</span></h2>
        </motion.div>

        {/* HORIZONTAL ARCHITECTURE DIAGRAM */}
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 16, width: '100%' }}>
          
          {/* CLIENT TIER */}
          <motion.div variants={vUp} custom={1} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, borderRadius: 16, background: 'color-mix(in srgb, var(--amber) 8%, var(--surface))', border: '2px solid color-mix(in srgb, var(--amber) 30%, transparent)', position: 'relative' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, textAlign: 'center' }}>Tier 1</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--amber)', marginBottom: 16, textAlign: 'center' }}>Client Layer</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['React SPA (Dashboard)', '@locelith/react SDK', 'CLI Tool (npx locelith)', 'Marketing Website'].map(item => (
                <div key={item} style={{ fontSize: '0.75rem', color: 'var(--t2)', background: 'var(--surface)', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>{item}</div>
              ))}
            </div>
          </motion.div>

          {/* ARROW → */}
          <motion.div variants={vFade} custom={1.5} style={{ display: 'flex', alignItems: 'center', color: 'var(--border2)', flexShrink: 0 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </motion.div>

          {/* BACKEND TIER (Gateway + Services) */}
          <motion.div variants={vUp} custom={2} style={{ flex: 1.2, display: 'flex', flexDirection: 'column', padding: 20, borderRadius: 16, background: 'color-mix(in srgb, var(--blue) 8%, var(--surface))', border: '2px solid color-mix(in srgb, var(--blue) 30%, transparent)', position: 'relative' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, textAlign: 'center' }}>Tier 2</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--blue)', marginBottom: 16, textAlign: 'center' }}>Application Logic</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: 8, border: '1px solid var(--blue)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--blue)', marginBottom: 4, textAlign: 'center' }}>API Gateway</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--t3)', textAlign: 'center' }}>JWT Auth · HMAC-SHA256 · Rate Limiting</div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', padding: '4px 0' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--border2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="5 12 12 19 19 12"></polyline></svg>
              </div>
              <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: 8, border: '1px solid var(--cyan)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--cyan)', marginBottom: 4, textAlign: 'center' }}>Service Layer</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--t3)', textAlign: 'center' }}>Vault Server (AST / PII / GDPR)<br/>Locelith SLM Inference (FastAPI)</div>
              </div>
            </div>
          </motion.div>

          {/* ARROW → */}
          <motion.div variants={vFade} custom={2.5} style={{ display: 'flex', alignItems: 'center', color: 'var(--border2)', flexShrink: 0 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </motion.div>

          {/* DATA TIER */}
          <motion.div variants={vUp} custom={3} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, borderRadius: 16, background: 'color-mix(in srgb, var(--green) 8%, var(--surface))', border: '2px solid color-mix(in srgb, var(--green) 30%, transparent)', position: 'relative' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, textAlign: 'center' }}>Tier 3</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--green)', marginBottom: 16, textAlign: 'center' }}>Persistence</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['PostgreSQL (Prisma)', 'MongoDB (Translations)', 'Railway Volume Cache'].map(item => (
                <div key={item} style={{ fontSize: '0.75rem', color: 'var(--t2)', background: 'var(--surface)', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 48, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

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
          <h2 className="title-md" style={{ marginBottom: 20 }}>More than just an<br /><span style={{ color: 'var(--blue)' }}>AST pipeline.</span></h2>
          <p className="body-sm" style={{ marginBottom: 24 }}>
            The Vault is the central intelligence of Locelith. It acts as an Express.js secure proxy that not only drives the translation pipeline, but also orchestrates API key security, GDPR data erasure, and database management.
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
            {/* Vertical connecting line */}
            <div style={{ position: 'absolute', left: 19, top: 20, bottom: 20, width: 2, background: 'var(--border2)', zIndex: 0 }} />
            
            {[
              { step: '1', label: 'Framework Detection', desc: 'package.json inspection → selects Strategy', color: 'var(--blue)' },
              { step: '2', label: 'AST Scan', desc: 'Babel parser walks JSX tree, extracts strings', color: 'var(--blue)' },
              { step: '3', label: 'PII Sanitise', desc: 'Masks sensitive data with reversible placeholders', color: 'var(--purple)' },
              { step: '4', label: 'SLM Inference', desc: 'Queries cache, translates missing strings via AI', color: 'var(--cyan)' },
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 36 }}>
          <div className="eyebrow">SDK Architecture</div>
          <h2 className="title-md">Four packages. Every framework.<br /><span className="grad">One pipeline command.</span></h2>
        </motion.div>
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
