import { motion } from 'framer-motion';
import { Section, fadeUp, GlowDivider } from './components';

export default function Slide02Context() {
  return (
    <div className="slide" id="slide-2" style={{ background: 'var(--bg2)' }}>
      <div className="slide-content">
        <Section>
          <motion.div variants={fadeUp} custom={0}>
            <div className="slide-label">Chapter 1 — Context</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              General Context &amp; <span className="gradient-text">Host Organisation</span>
            </h2>
            <p className="lead" style={{ maxWidth: 680, marginBottom: 40 }}>
              A final-year Master's internship at <strong style={{ color: 'var(--blue-mid)' }}>Synervy Technologies</strong>, addressing a fundamental structural gap in modern web development tooling.
            </p>
          </motion.div>

          <div className="grid-2" style={{ gap: 28, marginBottom: 36 }}>
            {/* Host Org */}
            <motion.div variants={fadeUp} custom={1} className="card-blue" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div className="icon-circle" style={{ background: 'white', border: '1px solid rgba(37,99,235,0.2)', fontSize: '1.5rem' }}>🏢</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--navy)' }}>Synervy Technologies</div>
                  <div style={{ color: 'var(--blue-mid)', fontSize: '0.78rem', fontWeight: 600 }}>Host Organisation · Sousse, Tunisia</div>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.7, marginBottom: 20 }}>
                An external IT company specialising in digital technologies and AI-driven innovation, providing the technical environment, mentorship, and resources that made the Locelith framework a reality.
              </p>
              <div className="divider-blue" />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Full-Stack Engineering', 'AI Research', 'SaaS Products'].map(t => (
                  <span key={t} className="tag tag-blue">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Academic */}
            <motion.div variants={fadeUp} custom={2} className="card-purple" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div className="icon-circle" style={{ background: 'white', border: '1px solid rgba(124,58,237,0.2)', fontSize: '1.5rem' }}>🎓</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--navy)' }}>ISITCOM</div>
                  <div style={{ color: 'var(--purple)', fontSize: '0.78rem', fontWeight: 600 }}>Institut Supérieur · Hammam Sousse</div>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.7, marginBottom: 20 }}>
                Master's in Computer Science &amp; Multimedia. Final-year PFE spanning full-stack engineering, NLP research, and production AI deployment over 24 weeks.
              </p>
              <div className="divider-blue" />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Master 2025–2026', 'Computer Science', 'AI Engineering'].map(t => (
                  <span key={t} className="tag tag-purple">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 4 deliverables */}
          <motion.div variants={fadeUp} custom={3}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
              PROJECT SCOPE — 4 MAJOR DELIVERABLES
            </div>
            <div className="grid-4">
              {[
                { num: '01', label: 'Core Pipeline', desc: 'AST Vault Server', icon: '⚙️', color: 'var(--blue-mid)' },
                { num: '02', label: 'Custom SLM', desc: 'Qwen-2.5 · 112 langs', icon: '🧠', color: 'var(--purple)' },
                { num: '03', label: 'SaaS Platform', desc: 'Marketing + Dashboard', icon: '🌐', color: '#059669' },
                { num: '04', label: 'SDK Packages', desc: '@locelith/core + 3 more', icon: '📦', color: '#D97706' },
              ].map(d => (
                <motion.div key={d.num} className="card"
                  style={{ padding: '20px 16px', textAlign: 'center', cursor: 'default' }}
                  whileHover={{ y: -4, boxShadow: `0 12px 28px ${d.color}18` }}
                  transition={{ duration: 0.2 }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{d.icon}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: d.color, fontWeight: 700, marginBottom: 5, letterSpacing: '0.1em' }}>DELIVERABLE {d.num}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--navy)', marginBottom: 4 }}>{d.label}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>{d.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Methodology badge */}
          <motion.div variants={fadeUp} custom={4}
            style={{ marginTop: 24, padding: '18px 24px', borderRadius: 14, background: '#FFFBEB', border: '1px solid rgba(217,119,6,0.2)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: '1.6rem' }}>🗂️</span>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 2 }}>
                Methodology: <span className="gradient-text-warm">Scrumban</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                12 sprints · 24 weeks · Kanban visual flow board · WIP limit 2 · On-demand backlog replenishment
              </div>
            </div>
          </motion.div>
        </Section>
      </div>
      <div className="slide-num">02 / 09</div>
    </div>
  );
}
