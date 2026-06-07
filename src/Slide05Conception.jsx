import { motion } from 'framer-motion';
import { Section, fadeUp } from './components';

const layers = [
  { name: 'CLI / SDK Layer', items: ['@locelith/core', '@locelith/react', '@locelith/angular', '@locelith/vanilla'], color: 'var(--blue-mid)', bg: '#EFF6FF', icon: '📦' },
  { name: 'Vault Server (API Gateway)', items: ['HMAC-SHA256 Auth', 'AST Scanner', 'PII Sanitisation', 'Multi-level Cache'], color: 'var(--purple)', bg: '#F5F3FF', icon: '⚙️' },
  { name: 'Business API + Dashboard', items: ['JWT Auth', 'Prisma ORM', 'Stripe Billing', 'Usage Analytics'], color: '#059669', bg: '#ECFDF5', icon: '🌐' },
  { name: 'AI Inference Layer', items: ['Locelith SLM (7B)', 'FastAPI Endpoint', 'Double-Pass Pipeline', 'LRU Cache'], color: '#D97706', bg: '#FFFBEB', icon: '🧠' },
  { name: 'Data Layer', items: ['PostgreSQL (primary)', 'MongoDB (translations)', 'JSON file cache', 'OPUS corpus'], color: '#0891B2', bg: '#ECFEFF', icon: '🗄️' },
];

const umlDiagrams = [
  { name: 'Global Use Case Diagram', desc: 'Developer, Administrator, Stripe — with «include» dependencies on Login' },
  { name: 'Sequence Diagram 1', desc: 'Execute Translation Pipeline — CLI → Vault → SLM → Code Output' },
  { name: 'Sequence Diagram 2', desc: 'Subscribe to Plan — Developer → Stripe → Webhook → Activation' },
  { name: 'Activity Diagram', desc: 'Translation logic flow with PII sanitisation and cache lookup branching' },
  { name: 'Global Class Diagram', desc: 'Persistence model: User, ApiKey, Translation, Subscription, Project' },
];

export default function Slide05Conception() {
  return (
    <div className="slide" id="slide-5" style={{ background: 'var(--bg)' }}>
      <div className="slide-content">
        <Section>
          <motion.div variants={fadeUp} custom={0}>
            <div className="slide-label">Chapter 3 — System Conception</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              Architecture &amp; <span className="gradient-text">System Design</span>
            </h2>
            <p className="lead" style={{ maxWidth: 700, marginBottom: 36 }}>
              A <strong style={{ color: 'var(--blue-mid)' }}>micro-service architecture</strong> with 3 independent Node.js processes, a dual-database strategy (PostgreSQL + MongoDB), and a local AI inference layer.
            </p>
          </motion.div>

          <div className="grid-2" style={{ gap: 28, alignItems: 'start' }}>
            {/* Architecture layers */}
            <motion.div variants={fadeUp} custom={1}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
                🏛️ System Architecture — 5 Layers
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {layers.map((l, i) => (
                  <motion.div key={l.name}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ padding: '14px 16px', borderRadius: 12, background: l.bg, border: `1px solid ${l.color}22`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>{l.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.84rem', color: l.color, marginBottom: 5 }}>{l.name}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {l.items.map(it => (
                          <span key={it} style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', color: '#374151', background: 'white', border: '1px solid var(--border)', padding: '2px 7px', borderRadius: 4 }}>{it}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: UML + design decisions */}
            <motion.div variants={fadeUp} custom={2} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* UML diagrams */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span>📊</span> UML Diagrams
                </div>
                {umlDiagrams.map((d, i) => (
                  <div key={d.name} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 12, marginBottom: 12, borderBottom: i < umlDiagrams.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--bg3)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, color: 'var(--blue-mid)', fontWeight: 700 }}>{i + 1}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--navy)', marginBottom: 2 }}>{d.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key design decisions */}
              <div className="card-blue" style={{ padding: 24 }}>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>🎯 Key Design Decisions</div>
                {[
                  { d: 'Dual Database Strategy', v: 'PostgreSQL for relational data + MongoDB for flexible translation storage' },
                  { d: 'English Pivot Architecture', v: 'Train only En→X, then use the Double-Pass pipeline for any source language' },
                  { d: 'Multi-level Translation Cache', v: 'JSON file → PostgreSQL → SLM — avoids redundant GPU inference entirely' },
                ].map((item, i) => (
                  <div key={item.d} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < 2 ? '1px solid rgba(37,99,235,0.12)' : 'none' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--blue-mid)', marginBottom: 3 }}>{item.d}</div>
                    <div style={{ fontSize: '0.76rem', color: '#374155' }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
      <div className="slide-num">05 / 09</div>
    </div>
  );
}
