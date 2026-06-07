import { motion } from 'framer-motion';
import { Section, fadeUp, Typewriter } from './components';

const sdks = [
  { pkg: '@locelith/core', icon: '⚡', color: 'var(--blue-mid)', bg: '#EFF6FF', desc: 'CLI engine — 9 commands powering the entire pipeline', cmds: ['init', 'translate', 'revert', 'verify', 'backup', 'restore'] },
  { pkg: '@locelith/react', icon: '⚛️', color: '#0EA5E9', bg: '#F0F9FF', desc: 'React Context provider + useTranslation() hook', cmds: ['LocelithProvider', 'useTranslation()', 'LanguageSelector'] },
  { pkg: '@locelith/angular', icon: '🅰️', color: '#DC2626', bg: '#FEF2F2', desc: 'Angular module with locelithTranslate pipe', cmds: ['locelithTranslate', 'Angular DI', 'Template-level'] },
  { pkg: '@locelith/vanilla', icon: '🌐', color: '#D97706', bg: '#FFFBEB', desc: 'Framework-agnostic JS API — zero dependencies', cmds: ['locelith.t("key")', 'Plain JavaScript', 'ESM + CJS'] },
];

const techStack = [
  { cat: 'Frontend', items: ['React 18', 'Vite 5', 'TailwindCSS', 'shadcn/ui', 'TanStack Query', 'Recharts'], color: 'var(--blue-mid)' },
  { cat: 'Backend', items: ['Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'MongoDB', 'JWT'], color: 'var(--purple)' },
  { cat: 'AI / ML', items: ['Python', 'FastAPI', 'Unsloth', 'QLoRA', 'llama.cpp', 'GGUF'], color: '#D97706' },
  { cat: 'DevOps', items: ['Railway', 'Docker', 'GitHub', 'Rollup', 'Stripe', 'HMAC'], color: '#059669' },
];

export default function Slide07Realisation() {
  return (
    <div className="slide" id="slide-7" style={{ background: 'var(--bg)' }}>
      <div className="slide-content">
        <Section>
          <motion.div variants={fadeUp} custom={0}>
            <div className="slide-label">Chapter 5 — Implementation</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              Réalisation &amp; <span className="gradient-text">Everything We Built</span>
            </h2>
            <p className="lead" style={{ maxWidth: 700, marginBottom: 28 }}>
              4 SDK packages, a complete SaaS platform, an AST pipeline, production AI deployment, Stripe billing, MCP server integration, and a full admin panel — built in 24 weeks.
            </p>
          </motion.div>

          {/* Terminal */}
          <motion.div variants={fadeUp} custom={1} style={{ marginBottom: 28 }}>
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-dot t-red" /><div className="terminal-dot t-yellow" /><div className="terminal-dot t-green" />
                <span style={{ marginLeft: 10, fontSize: '0.72rem', color: '#6E7681', fontFamily: 'var(--mono)' }}>bash — my-react-app</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line"><span className="t-prompt">$ </span><span className="t-cmd"><Typewriter text="npx locelith translate --langs=fr,es,ar,de" delay={400} speed={38} /></span></div>
                <div className="terminal-line"><span className="t-success">✔</span> <span className="t-info">Framework detected: React (JSX)</span></div>
                <div className="terminal-line"><span className="t-success">✔</span> <span className="t-info">AST scan complete — 247 strings extracted</span></div>
                <div className="terminal-line"><span className="t-success">✔</span> <span className="t-info">PII sanitised (2 email addresses masked)</span></div>
                <div className="terminal-line"><span className="t-success">✔</span> <span className="t-info">Cache hit: 189 strings (PostgreSQL cache)</span></div>
                <div className="terminal-line"><span className="t-success">✔</span> <span className="t-info">SLM inference: 58 new translations in 4.2s</span></div>
                <div className="terminal-line"><span className="t-success">✔</span> <span className="t-info">AST replacement: t() hooks injected in 34 files</span></div>
                <div className="terminal-line"><span className="t-success">✔</span> <span style={{ color: '#34D399', fontWeight: 700 }}>Done! Your app now speaks 4 languages. 🌍</span></div>
              </div>
            </div>
          </motion.div>

          <div className="grid-2" style={{ gap: 24 }}>
            {/* SDK packages */}
            <motion.div variants={fadeUp} custom={2}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                📦 SDK Packages (published on npm)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {sdks.map((s, i) => (
                  <motion.div key={s.pkg} className="sdk-card"
                    style={{ background: s.bg, border: `1px solid ${s.color}18` }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -3, boxShadow: `0 8px 24px ${s.color}18` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span>{s.icon}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 700, color: s.color }}>{s.pkg}</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#374151', marginBottom: 8 }}>{s.desc}</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {s.cmds.slice(0, 3).map(c => (
                        <span key={c} style={{ fontFamily: 'var(--mono)', fontSize: '0.63rem', background: 'white', border: '1px solid var(--border)', padding: '2px 7px', borderRadius: 4, color: 'var(--navy)' }}>{c}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div variants={fadeUp} custom={3} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Tech stack */}
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>🛠️ Technology Stack</div>
                {techStack.map(t => (
                  <div key={t.cat} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ width: 68, flexShrink: 0, fontFamily: 'var(--mono)', fontSize: '0.66rem', color: t.color, fontWeight: 700, paddingTop: 3 }}>{t.cat}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {t.items.map(it => (
                        <span key={it} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', background: `${t.color}0D`, border: `1px solid ${t.color}22`, color: t.color, padding: '2px 7px', borderRadius: 4 }}>{it}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Extended services */}
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>🔗 Extended Services</div>
                {[
                  { icon: '🕷️', t: 'Web Scraping Pipeline', d: '3,149 UI strings auto-scraped from React libraries' },
                  { icon: '☁️', t: 'Groq Cloud Fallback', d: 'Maintains 100% uptime when SLM is unavailable' },
                  { icon: '🤖', t: 'MCP Server (7 tools)', d: 'AI-agent integration via Model Context Protocol' },
                  { icon: '💳', t: 'Stripe Integration', d: 'Checkout · webhooks · billing portal · invoices' },
                ].map(s => (
                  <div key={s.t} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--navy)', marginBottom: 2 }}>{s.t}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Production banner */}
              <div style={{ padding: '16px 20px', borderRadius: 12, background: '#ECFDF5', border: '1px solid rgba(5,150,105,0.2)', display: 'flex', gap: 14, alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>🚀</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#065F46', fontSize: '0.88rem', marginBottom: 2 }}>Production Deployment — CPU on Railway</div>
                  <div style={{ fontSize: '0.76rem', color: '#374151' }}>GGUF Q4_K_M via llama.cpp · Dynamic LoRA loading at runtime · ~$5/month · Zero GPU cost</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
      <div className="slide-num">07 / 09</div>
    </div>
  );
}
