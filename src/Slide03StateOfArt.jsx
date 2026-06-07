import { motion } from 'framer-motion';
import { Section, fadeUp, GlowDivider } from './components';

const problems = [
  { icon: '🔍', title: 'The Extraction Problem', color: '#DC2626', bg: '#FEF2F2', border: 'rgba(220,38,38,0.15)', desc: 'No tool auto-detects hardcoded UI strings in source code. Teams manually hunt across thousands of JSX/Angular lines — slow and systematically incomplete.' },
  { icon: '🌐', title: 'The Translation Quality Problem', color: '#D97706', bg: '#FFFBEB', border: 'rgba(217,119,6,0.15)', desc: '"Save" → "Rescue". "Cancel" → "Annul". General-purpose APIs fail on imperative UI strings. Medium SaaS apps accumulate thousands of dollars/year in API fees.' },
  { icon: '🔒', title: 'The Privacy Problem', color: 'var(--purple)', bg: '#F5F3FF', border: 'rgba(124,58,237,0.15)', desc: 'Sending source code strings to third-party cloud APIs raises serious GDPR concerns. For sensitive domains, it is legally risky or contractually prohibited.' },
  { icon: '✍️', title: 'The Code Rewriting Problem', color: 'var(--blue-mid)', bg: '#EFF6FF', border: 'rgba(37,99,235,0.15)', desc: 'Even when translations exist, injecting t("key") back into every string is mechanical, error-prone, and never automated by any existing localisation platform.' },
];

const comparison = [
  { feature: 'Auto string detection', manual: '❌', api: '❌', crowdin: '❌', i18next: '⚠️', locelith: '✅' },
  { feature: 'AI translation (UI-domain)', manual: '❌', api: '⚠️', crowdin: '⚠️', i18next: '❌', locelith: '✅' },
  { feature: 'Source code transform', manual: '❌', api: '❌', crowdin: '❌', i18next: '❌', locelith: '✅' },
  { feature: 'On-premise inference', manual: '—', api: '❌', crowdin: '❌', i18next: '—', locelith: '✅' },
  { feature: 'Zero inference cost', manual: '✅', api: '❌', crowdin: '❌', i18next: '✅', locelith: '✅' },
  { feature: '112+ languages', manual: '👤', api: '✅', crowdin: '✅', i18next: '—', locelith: '✅' },
  { feature: 'SaaS management + SDK', manual: '❌', api: '❌', crowdin: '⚠️', i18next: '⚠️', locelith: '✅' },
];

export default function Slide03StateOfArt() {
  return (
    <div className="slide" id="slide-3" style={{ background: 'var(--bg)' }}>
      <div className="slide-content">
        <Section>
          <motion.div variants={fadeUp} custom={0}>
            <div className="slide-label">Chapter 1 — State of the Art</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              Problematic &amp; <span className="gradient-text">The Localisation Gap</span>
            </h2>
            <p className="lead" style={{ maxWidth: 720, marginBottom: 36 }}>
              Internationalising a codebase adds <strong style={{ color: '#DC2626' }}>25–30% of total development effort</strong>. 58% of teams have delayed launches due to localisation bottlenecks. No existing tool closes the full gap.
            </p>
          </motion.div>

          <div className="grid-2" style={{ gap: 16, marginBottom: 32 }}>
            {problems.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} custom={i + 1}
                style={{ padding: '20px 22px', borderRadius: 14, background: p.bg, border: `1px solid ${p.border}`, display: 'flex', gap: 14 }}>
                <div style={{ fontSize: '1.6rem', flexShrink: 0, marginTop: 2 }}>{p.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: p.color, marginBottom: 6 }}>{p.title}</div>
                  <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <motion.div variants={fadeUp} custom={5}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
              Competitive Landscape — Existing Solutions vs Locelith
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th style={{ textAlign: 'center' }}>Manual</th>
                    <th style={{ textAlign: 'center' }}>API-based</th>
                    <th style={{ textAlign: 'center' }}>Crowdin</th>
                    <th style={{ textAlign: 'center' }}>i18next</th>
                    <th style={{ textAlign: 'center', color: 'var(--blue-mid)' }}>Locelith ✦</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature}>
                      <td style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.82rem' }}>{row.feature}</td>
                      <td style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem' }}>{row.manual}</td>
                      <td style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem' }}>{row.api}</td>
                      <td style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem' }}>{row.crowdin}</td>
                      <td style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem' }}>{row.i18next}</td>
                      <td style={{ textAlign: 'center', color: 'var(--blue-mid)', fontWeight: 700, fontSize: '0.9rem', background: '#EFF6FF' }}>{row.locelith}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </Section>
      </div>
      <div className="slide-num">03 / 09</div>
    </div>
  );
}
