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
  const layers = [
    { name: 'SDK / CLI Layer', desc: '@locelith/core · /react · /angular · /vanilla', color: 'var(--blue)', side: 'Client' },
    { name: 'Vault Server', desc: 'HMAC auth · AST scanner · PII filter · Cache · SLM proxy', color: 'var(--purple)', side: 'Edge' },
    { name: 'Business API', desc: 'JWT · Prisma ORM · Usage tracking · Stripe webhooks', color: 'var(--cyan)', side: 'Platform' },
    { name: 'AI Inference Layer', desc: 'FastAPI · Locelith-7B GGUF · Double-Pass pipeline', color: 'var(--amber)', side: 'Intelligence' },
    { name: 'Data Layer', desc: 'PostgreSQL (relational) · MongoDB (translations) · File cache (JSON)', color: 'var(--green)', side: 'Persistence' },
  ];

  return (
    <Slide id="s15" className="slide slide-light">
      <div className="cols-2-3" style={{ gap: 56, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Global Architecture</div>
          <h2 className="title-md" style={{ marginBottom: 16 }}>Five layers.<br /><span className="grad">Zero single point of failure.</span></h2>
          <p className="body-sm" style={{ marginBottom: 28 }}>
            A micro-service design with three independent Node.js processes, a Python inference service, and a dual-database persistence strategy — all connected through authenticated HTTP.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[{ label: 'Services', val: '3 Node.js + 1 FastAPI' }, { label: 'Databases', val: 'PostgreSQL + MongoDB' }, { label: 'SDK packages', val: '4 (npm published)' }, { label: 'Auth model', val: 'JWT + HMAC-SHA256' }].map(i => (
              <div key={i.label} style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--t4)', width: 100, flexShrink: 0 }}>{i.label}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--t2)', fontWeight: 500 }}>{i.val}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {layers.map((l, i) => (
            <motion.div key={l.name} variants={vLeft} custom={i + 1}
              style={{ display: 'flex', gap: 16, padding: '16px 20px', borderRadius: 12, background: `${l.color}08`, border: `1px solid ${l.color}22`, alignItems: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: l.color, marginBottom: 3 }}>{l.name}</div>
                <div className="body-xs">{l.desc}</div>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>{l.side}</div>
            </motion.div>
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
          <p className="body-sm" style={{ marginBottom: 28 }}>
            The Vault Server receives an authenticated scan request, parses source files into Abstract Syntax Trees, extracts UI string literals at the node level, sanitises PII, checks a three-tier cache, and proxies remaining strings to the local SLM.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Authentication', val: 'HMAC-SHA256 · 5-minute window' },
              { label: 'AST Parsing', val: '@babel/parser · React · Angular' },
              { label: 'Cache Strategy', val: 'JSON file → PostgreSQL → SLM' },
              { label: 'PII Guard', val: 'Regex + NER masking pipeline' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ background: 'rgba(37,99,235,0.08)', padding: '10px 14px', fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--blue)', width: 120, flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.label}</div>
                <div style={{ padding: '10px 14px', fontSize: '0.78rem', color: 'var(--t3)', display: 'flex', alignItems: 'center' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={vUp} custom={1}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Request Flow</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { step: 'SDK', desc: 'CLI request + HMAC signature', color: 'var(--blue)' },
              { step: 'Auth', desc: 'Verify signature · check timestamp', color: 'var(--blue)' },
              { step: 'AST', desc: 'Parse files · extract string nodes', color: 'var(--purple)' },
              { step: 'PII', desc: 'Detect & mask sensitive data', color: 'var(--purple)' },
              { step: 'Cache L1', desc: 'JSON file hit? Return immediately', color: 'var(--cyan)' },
              { step: 'Cache L2', desc: 'PostgreSQL hit? Return & update L1', color: 'var(--cyan)' },
              { step: 'SLM', desc: 'Inference via Double-Pass pipeline', color: 'var(--amber)' },
              { step: 'Inject', desc: 'Rewrite source files · insert hooks', color: 'var(--green)' },
            ].map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 14px', borderRadius: 8, background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <div style={{ width: 60, fontFamily: 'var(--mono)', fontSize: '0.68rem', color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--t3)' }}>{s.desc}</div>
              </div>
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
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">SDK Architecture</div>
          <h2 className="title-md">One command. Every framework.</h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 20, marginBottom: 28 }}>
          {[
            { pkg: '@locelith/core', abbr: 'CLI', color: 'var(--blue)', cmds: ['init', 'run', 'verify', 'revert', 'restore', 'backups', 'clean'], desc: 'The CLI engine. 7 commands. Manages the full pipeline from initialisation to source code rewriting and GDPR cleanup.' },
            { pkg: '@locelith/react', abbr: 'R', color: '#00D8FF', cmds: ['<LocelithProvider>', 'useTranslation()', '<LanguageSelector />'], desc: 'React Context provider + runtime hook. Zero-reload language switching with lazy-loaded locale bundles.' },
            { pkg: 'locelith-angular', abbr: 'A', color: '#DD0031', cmds: ['locelithTranslate (pipe)', 'LocelithModule', 'Angular DI'], desc: 'Angular module with a declarative template pipe. Fully compatible with Angular dependency injection.' },
            { pkg: '@locelith/vanilla', abbr: 'JS', color: 'var(--amber)', cmds: ['locelith.t("key")', 'ESM + CJS dual output'], desc: 'Zero-dependency JS API. Works in any JavaScript environment including legacy apps.' },
          ].map((s, i) => (
            <motion.div key={s.pkg} variants={vUp} custom={i + 1} className="card" style={{ display: 'flex', gap: 18, padding: '22px 26px', borderTop: `2px solid ${s.color}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontFamily: 'var(--mono)' }}>{s.abbr}</div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 700, color: s.color, marginBottom: 8 }}>{s.pkg}</div>
                <p className="body-xs" style={{ marginBottom: 12, lineHeight: 1.6 }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {s.cmds.map(c => <span key={c} style={{ fontFamily: 'var(--mono)', fontSize: '0.63rem', background: 'var(--bg2)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 4, color: 'var(--t3)' }}>{c}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={vUp} custom={5} style={{ padding: '16px 24px', borderRadius: 12, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: 'var(--green)' }}>[ + ]</div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--green)', marginBottom: 2, fontSize: '0.9rem' }}>Production Deployment</div>
            <div className="body-xs">GGUF Q4_K_M · llama.cpp · Dynamic LoRA loading at runtime · CPU-only inference · ~$5/month on Railway</div>
          </div>
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
              { db: 'PostgreSQL', role: 'Primary relational store', entities: ['User · Subscription · ApiKey', 'Project · UsageLog · Invoice'], color: 'var(--blue)', why: 'ACID compliance for billing & identity' },
              { db: 'MongoDB', role: 'Translation document store', entities: ['Translation · Locale · Domain', 'Cache · BackTranslation'], color: 'var(--green)', why: 'Flexible schema for multilingual pair storage' },
              { db: 'JSON Cache', role: 'File-system L1 cache', entities: ['Per-project locale files', 'Key → translated string'], color: 'var(--amber)', why: 'Zero-latency resolution for known strings' },
            ].map(d => (
              <div key={d.db} className="card" style={{ padding: '18px 22px', borderLeft: `3px solid ${d.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: d.color }}>{d.db}</span>
                  <span className="body-xs">{d.role}</span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--t4)', marginBottom: 6 }}>{d.entities.join(' · ')}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--t3)', fontStyle: 'italic' }}>→ {d.why}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={vUp} custom={1}>
          <div className="eyebrow">Security Model</div>
          <h2 className="title-md" style={{ marginBottom: 24 }}>Security by design,<br /><span className="accent-purple">not by addition.</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Request Signing', val: 'HMAC-SHA256 with shared secret + 5-min timestamp window prevents replay attacks' },
              { label: 'Password Storage', val: 'bcrypt with cost factor 12 — computation intentionally slow' },
              { label: 'Session Management', val: 'Short-lived JWTs with refresh token rotation' },
              { label: 'PII Sanitisation', val: 'Regex + NER pipeline strips emails, phones, IDs before any SLM inference' },
              { label: 'Data Erasure', val: 'Cascade delete across all entities on GDPR erasure request' },
              { label: 'Source Privacy', val: 'Source code strings processed locally — never persisted to disk' },
            ].map((item, i) => (
              <motion.div key={item.label} variants={vFade} custom={i + 2}
                style={{ display: 'flex', gap: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{ width: 4, flexShrink: 0, borderRadius: 2, background: 'var(--purple)', alignSelf: 'stretch' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--purple)', marginBottom: 3 }}>{item.label}</div>
                  <div className="body-xs">{item.val}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
