import { motion } from 'framer-motion';
import { Section, fadeUp } from './components';

const functional = [
  { icon: '🔑', text: 'JWT authentication & Stripe subscription management' },
  { icon: '🔍', text: 'AST scanning of React, Angular & Vanilla JS codebases' },
  { icon: '🌐', text: 'AI translation to 112 target languages via Locelith SLM' },
  { icon: '✍️', text: 'Automated source code replacement with i18n hooks' },
  { icon: '⚡', text: 'Single command: npx locelith translate --langs=fr,es,ar' },
  { icon: '🔄', text: 'npx locelith revert with --dry-run preview mode' },
  { icon: '📊', text: 'Real-time usage analytics dashboard' },
  { icon: '🛡️', text: 'PII sanitisation — GDPR-compliant, source never stored' },
];

const nonFunctional = [
  { label: 'Performance', val: '<100ms cached · <60s full pipeline', color: 'var(--blue-mid)' },
  { label: 'Security', val: 'HMAC-SHA256 · bcrypt · JWT sessions', color: 'var(--purple)' },
  { label: 'Privacy', val: 'Data minimisation · PII masked · GDPR erasure', color: '#DC2626' },
  { label: 'Availability', val: '99.5% uptime on Railway · health checks', color: '#059669' },
  { label: 'Extensibility', val: 'Modular AST — Vue.js & Svelte ready', color: '#D97706' },
];

export default function Slide04Specs() {
  return (
    <div className="slide" id="slide-4" style={{ background: 'var(--bg2)' }}>
      <div className="slide-content">
        <Section>
          <motion.div variants={fadeUp} custom={0}>
            <div className="slide-label">Chapter 2 — Requirements Analysis</div>
            <h2 className="section-title" style={{ marginBottom: 40 }}>
              Specifications &amp; <span className="gradient-text">System Requirements</span>
            </h2>
          </motion.div>

          <div className="grid-2" style={{ gap: 28 }}>
            {/* Functional reqs */}
            <motion.div variants={fadeUp} custom={1}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue-mid)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
                Functional Requirements
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {functional.map((f, i) => (
                  <motion.div key={i} className="card"
                    style={{ padding: '11px 16px', display: 'flex', gap: 12, alignItems: 'center' }}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.5 }}>{f.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right col */}
            <motion.div variants={fadeUp} custom={2} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Actors */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
                  System Actors
                </div>
                {[
                  { role: 'Developer', icon: '👨‍💻', color: 'var(--blue-mid)', bg: '#EFF6FF', border: 'rgba(37,99,235,0.15)', desc: 'Browses docs, creates account, subscribes, runs CLI pipeline, manages API keys, monitors analytics, integrates SDK into production apps.' },
                  { role: 'Administrator', icon: '⚙️', color: 'var(--purple)', bg: '#F5F3FF', border: 'rgba(124,58,237,0.15)', desc: 'Manages users, Stripe subscriptions, SLM inference monitoring, scraper configuration, GDPR data erasure workflows.' },
                ].map(a => (
                  <div key={a.role} style={{ padding: '16px 18px', borderRadius: 12, background: a.bg, border: `1px solid ${a.border}`, marginBottom: 10, display: 'flex', gap: 14 }}>
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{a.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: a.color, fontSize: '0.88rem', marginBottom: 4 }}>{a.role}</div>
                      <div style={{ fontSize: '0.78rem', color: '#374151', lineHeight: 1.6 }}>{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Non-functional */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
                  Non-Functional Requirements
                </div>
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  {nonFunctional.map((nf, i) => (
                    <div key={nf.label} style={{ display: 'flex', gap: 0, borderBottom: i < nonFunctional.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <div style={{ width: 100, flexShrink: 0, padding: '12px 14px', fontFamily: 'var(--mono)', fontSize: '0.68rem', color: nf.color, fontWeight: 700, background: 'var(--bg3)', borderRight: '1px solid var(--border)' }}>
                        {nf.label}
                      </div>
                      <div style={{ padding: '12px 14px', fontSize: '0.78rem', color: '#374151' }}>{nf.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
      <div className="slide-num">04 / 09</div>
    </div>
  );
}
