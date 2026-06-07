import { motion } from 'framer-motion';
import { Section, fadeUp, AnimCount } from './components';

const perspectives = [
  { icon: '🌐', title: 'Vue.js & Svelte Support', desc: 'The modular AST parser is already architected for Vue SFC and Svelte template integration.', color: 'var(--blue-mid)', bg: '#EFF6FF' },
  { icon: '🔌', title: 'VS Code Extension', desc: 'A dedicated IDE extension to run Locelith inline — string detection and preview on hover.', color: 'var(--purple)', bg: '#F5F3FF' },
  { icon: '📊', title: 'Continuous Training', desc: 'Validated user corrections exported to a new corpus to iteratively push BLEU scores beyond 65.', color: '#059669', bg: '#ECFDF5' },
  { icon: '🤖', title: 'Expanded MCP Tools', desc: 'Context-aware translation with component semantics and AI-driven key naming suggestions.', color: '#D97706', bg: '#FFFBEB' },
  { icon: '🌍', title: '200+ Languages', desc: 'Extending training to cover 200+ languages including underrepresented African and South-East Asian languages.', color: '#0891B2', bg: '#ECFEFF' },
  { icon: '🚀', title: 'Public npm Release', desc: 'Full open-source release with documentation at docs.locelith.dev and a free tier plan.', color: 'var(--blue-mid)', bg: '#EFF6FF' },
];

const delivered = [
  '🔍 AST-based string detection — React, Angular & Vanilla JS',
  '🧠 Custom SLM — Qwen-2.5 7B fine-tuned via QLoRA · BLEU 61.34',
  '🌐 Complete SaaS platform — marketing, dashboard, admin panel',
  '📦 4 published npm SDK packages with Rollup + obfuscation',
  '🔄 Double-Pass Any-to-Any pipeline — no retraining needed',
  '💳 Stripe billing — webhooks, portal, invoice history',
  '🤖 MCP Server with 7 AI-agent integration tools',
  '🚀 CPU production deployment at ~$5/month on Railway',
];

export default function Slide09Conclusion() {
  return (
    <div className="slide" id="slide-9" style={{ background: 'var(--bg)' }}>
      <div className="slide-content">
        <Section>
          <motion.div variants={fadeUp} custom={0}>
            <div className="slide-label">Conclusion &amp; Perspectives</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              <span className="gradient-text">Locelith</span> — Mission Accomplished
            </h2>
            <p className="lead" style={{ maxWidth: 720, marginBottom: 36 }}>
              The first fully integrated, privacy-preserving web localisation framework: <strong style={{ color: 'var(--blue-mid)' }}>one command</strong> from raw source code to a multilingual, production-ready application.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} custom={1} style={{ marginBottom: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
              {[
                { val: 4500000, label: 'Training Pairs', color: 'var(--blue-mid)', bg: '#EFF6FF' },
                { val: 112,     label: 'Languages',     color: 'var(--purple)',  bg: '#F5F3FF' },
                { val: 61.34,   label: 'BLEU Score',    color: '#059669',        bg: '#ECFDF5' },
                { val: 83.42,   label: 'chrF Score',    color: '#D97706',        bg: '#FFFBEB' },
                { val: 4,       label: 'SDK Packages',  color: '#0891B2',        bg: '#ECFEFF' },
                { val: 24,      label: 'Weeks Built',   color: 'var(--navy)',    bg: 'var(--bg3)' },
              ].map(s => (
                <div key={s.label} className="stat-card" style={{ background: s.bg, border: `1px solid ${s.color}20`, padding: '18px 10px' }}>
                  <div className="stat-number" style={{ color: s.color, fontSize: '1.9rem' }}>
                    <AnimCount value={s.val} />
                  </div>
                  <div className="stat-label" style={{ fontSize: '0.65rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid-2" style={{ gap: 24, marginBottom: 24 }}>
            {/* What was delivered */}
            <motion.div variants={fadeUp} custom={2}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                ✅ What Was Delivered
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {delivered.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    style={{ fontSize: '0.82rem', color: '#1E293B', padding: '10px 14px', borderRadius: 10, background: 'white', border: '1px solid var(--border)', fontWeight: 500 }}>
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Perspectives */}
            <motion.div variants={fadeUp} custom={3}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                🔭 Future Perspectives
              </div>
              <div className="grid-2" style={{ gap: 10 }}>
                {perspectives.map((p, i) => (
                  <motion.div key={p.title}
                    style={{ padding: '16px', borderRadius: 12, background: p.bg, border: `1px solid ${p.color}20`, borderTop: `3px solid ${p.color}` }}
                    whileHover={{ y: -3, boxShadow: `0 8px 24px ${p.color}18` }}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>{p.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: p.color, marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: '0.72rem', color: '#374151', lineHeight: 1.55 }}>{p.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Thank you */}
          <motion.div variants={fadeUp} custom={4}
            style={{ padding: '28px 36px', borderRadius: 20, background: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)', border: '1px solid rgba(37,99,235,0.15)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Inter', fontSize: '2.2rem', fontWeight: 900, marginBottom: 10 }}>
              <span className="gradient-text">Thank You</span> 🌍
            </div>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: 16 }}>
              Oussama Elkamel &amp; Sarra Chtioui · ISITCOM / Synervy Technologies · 2025–2026
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span className="tag tag-blue">locelith.dev</span>
              <span className="tag tag-purple">@locelith/core on npm</span>
              <span className="tag tag-green">Questions welcome 🙋</span>
            </div>
          </motion.div>
        </Section>
      </div>
      <div className="slide-num">09 / 09</div>
    </div>
  );
}
