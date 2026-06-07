import { motion } from 'framer-motion';
import { Section, fadeUp } from './components';

const astResults = [
  { framework: 'React (JSX)', strings: 247, rate: '100%' },
  { framework: 'Angular (HTML)', strings: 183, rate: '100%' },
  { framework: 'Vanilla JS', strings: 91, rate: '100%' },
  { framework: 'Mixed / Edge Cases', strings: 34, rate: '100%' },
];

const securityTests = [
  { scenario: 'Missing API Key', expected: '401 Unauthorized' },
  { scenario: 'Expired HMAC Signature (>5 min)', expected: '403 Forbidden' },
  { scenario: 'Replayed Request (same timestamp)', expected: '403 Forbidden' },
  { scenario: 'SQL Injection in translation key', expected: 'Input sanitised' },
  { scenario: 'PII in source string (email)', expected: 'Masked before SLM' },
];

const slmValidation = [
  { env: 'GPU — bitsandbytes 4-bit NF4', bleu: 61.34, chrf: 83.42, latency: '~2.1s', note: 'Training environment baseline' },
  { env: 'CPU — GGUF Q4_K_M via llama.cpp', bleu: 60.91, chrf: 82.87, latency: '~8.4s', note: '−0.43 BLEU delta — quality maintained in production' },
];

const e2eTests = [
  { cmd: 'npx locelith init', note: 'Config + .ignore + translations/ scaffolded correctly' },
  { cmd: 'npx locelith translate --langs=fr,es', note: '247 strings · 5 langs · 34 files updated' },
  { cmd: 'npx locelith revert --dry-run', note: 'Preview only — no writes applied' },
  { cmd: 'npx locelith verify', note: '0 missing keys · 0 mismatches detected' },
  { cmd: 'Stripe checkout → webhook → activation', note: 'Subscription active within 2 seconds' },
  { cmd: 'Admin GDPR erasure (cascading delete)', note: 'User + translations + API keys removed cleanly' },
];

export default function Slide08Tests() {
  return (
    <div className="slide" id="slide-8" style={{ background: 'var(--bg2)' }}>
      <div className="slide-content">
        <Section>
          <motion.div variants={fadeUp} custom={0}>
            <div className="slide-label">Chapter 5 — Testing &amp; Validation</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              Tests &amp; <span className="gradient-text">Quality Assurance</span>
            </h2>
            <p className="lead" style={{ maxWidth: 680, marginBottom: 36 }}>
              Validation across 4 dimensions: AST pipeline correctness, API security, SLM production fidelity, and end-to-end integration. <strong style={{ color: '#059669' }}>All tests passed.</strong>
            </p>
          </motion.div>

          <div className="grid-2" style={{ gap: 24 }}>
            {/* Left */}
            <motion.div variants={fadeUp} custom={1} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* AST */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue-mid)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                  🔍 AST Pipeline Validation
                </div>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <table className="comp-table">
                    <thead>
                      <tr>
                        <th>Framework</th>
                        <th style={{ textAlign: 'center' }}>Strings</th>
                        <th style={{ textAlign: 'center' }}>Replaced</th>
                        <th style={{ textAlign: 'center' }}>Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {astResults.map(r => (
                        <tr key={r.framework}>
                          <td style={{ fontWeight: 600, fontSize: '0.82rem' }}>{r.framework}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--mono)', color: 'var(--blue-mid)', fontWeight: 700 }}>{r.strings}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--mono)', color: 'var(--blue-mid)', fontWeight: 700 }}>{r.strings}</td>
                          <td style={{ textAlign: 'center', color: '#059669', fontWeight: 700 }}>{r.rate} ✅</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Security */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                  🛡️ API Security Tests
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {securityTests.map((t, i) => (
                    <motion.div key={t.scenario}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', borderRadius: 10, background: 'white', border: '1px solid var(--border)' }}>
                      <span style={{ color: '#059669', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>✅</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--navy)' }}>{t.scenario}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Expected: {t.expected}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div variants={fadeUp} custom={2} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* SLM GPU vs CPU */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                  🧠 SLM Production Benchmark — GPU vs CPU
                </div>
                {slmValidation.map(s => (
                  <div key={s.env} className="card" style={{ padding: '18px 20px', marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--navy)', marginBottom: 12 }}>{s.env}</div>
                    <div style={{ display: 'flex', gap: 24, marginBottom: 8 }}>
                      {[{ label: 'BLEU', val: s.bleu, color: 'var(--blue-mid)' }, { label: 'chrF', val: s.chrf, color: 'var(--purple)' }, { label: 'Latency', val: s.latency, color: '#D97706' }].map(m => (
                        <div key={m.label} style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: 900, color: m.color }}>{m.val}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 600 }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontStyle: 'italic' }}>{s.note}</div>
                  </div>
                ))}
              </div>

              {/* E2E */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                  🔗 End-to-End Integration Tests
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {e2eTests.map((t, i) => (
                    <motion.div key={t.cmd}
                      initial={{ opacity: 0, x: 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', borderRadius: 10, background: 'white', border: '1px solid var(--border)' }}>
                      <span style={{ color: '#059669', fontWeight: 700, flexShrink: 0 }}>✅</span>
                      <div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 2 }}>{t.cmd}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{t.note}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '14px 18px', borderRadius: 12, background: '#ECFDF5', border: '1px solid rgba(5,150,105,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '1.5rem' }}>✅</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#065F46' }}>All tests passed — 100% pipeline coverage</div>
                  <div style={{ fontSize: '0.75rem', color: '#374151' }}>0 critical bugs at submission date.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
      <div className="slide-num">08 / 09</div>
    </div>
  );
}
