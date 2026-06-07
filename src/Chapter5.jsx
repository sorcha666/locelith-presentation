/**
 * CHAPTER 5 — Implementation & AI (corrected to match actual project)
 */
import { motion } from 'framer-motion';
import { Slide, vUp, vLeft, vFade, Num, Bar, Type } from './Motion';

export function S19Ch5Intro() {
  return (
    <Slide id="s19" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 05</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>Implementation &amp;<br /><span className="grad">AI Development</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>Engineering execution — technology choices, pipeline architecture, translation providers, and quality assurance.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

export function S20TechStack() {
  const stack = [
    { cat: 'SaaS Frontend', color: 'var(--blue)', items: ['Vite', 'React 18', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'TanStack Query', 'Recharts', 'React Router'] },
    { cat: 'Business API', color: 'var(--purple)', items: ['Node.js', 'Express', 'Prisma ORM', 'PostgreSQL', 'JWT', 'bcrypt', 'Stripe SDK', 'Zod'] },
    { cat: 'Vault Server', color: 'var(--amber)', items: ['Node.js', 'Express', 'Babel Parser', 'Puppeteer', 'HMAC-SHA256', 'Alibaba Qwen-plus', 'Groq Cloud'] },
    { cat: 'SDK & Tooling', color: 'var(--green)', items: ['@locelith/core (CLI)', '@locelith/react', 'locelith-angular', '@locelith/vanilla', 'Rollup', 'MCP SDK', 'Railway'] },
  ];
  return (
    <Slide id="s20" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Technology Stack</div>
          <h2 className="title-md">Every tool chosen for a reason.</h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 20 }}>
          {stack.map((s, i) => (
            <motion.div key={s.cat} variants={vUp} custom={i + 1} className="card" style={{ borderTop: `2px solid ${s.color}` }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: s.color, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{s.cat}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.items.map(it => (
                  <span key={it} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', background: `${s.color}0D`, border: `1px solid ${s.color}25`, color: s.color, padding: '4px 10px', borderRadius: 6 }}>{it}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function S21Terminal() {
  return (
    <Slide id="s21" className="slide slide-lighter">
      <div className="cols-3-2" style={{ gap: 56, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Live Pipeline Demo</div>
          <h2 className="title-md" style={{ marginBottom: 16 }}>From source code<br />to <span className="grad">multilingual app.</span><br />One command.</h2>
          <p className="body-sm">The pipeline syncs with the Vault Server, scans ASTs, sanitises PII, resolves cache hits, calls Alibaba Qwen-plus for translations, and rewrites all source files — fully automated.</p>
        </motion.div>
        <motion.div variants={vUp} custom={1}>
          <div className="term">
            <div className="term-bar">
              <div className="term-dot d-red"/><div className="term-dot d-yellow"/><div className="term-dot d-green"/>
              <span style={{ marginLeft: 10, fontFamily: 'var(--mono)', fontSize: '0.68rem', color: '#64748B' }}>bash — my-react-app</span>
            </div>
            <div className="term-body">
              <div className="term-line"><span className="tc-prompt">$ </span><span className="tc-cmd"><Type text="locelith run" delay={500} /></span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">Framework detected: React 18 (JSX)</span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">AST scan complete — 247 strings extracted</span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">PII sanitised (2 email addresses masked)</span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">Translations: Alibaba Qwen-plus · 5 languages</span></div>
              <div className="term-line"><span className="tc-ok">✔</span> <span className="tc-info">Source rewrite: t() injected in 34 files</span></div>
              <div className="term-line"><span className="tc-success">✔ Done. Your app now speaks 5 languages.</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

/* S22 — Multi-Provider Translation Architecture */
export function S22Providers() {
  return (
    <Slide id="s22" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Translation Infrastructure</div>
          <h2 className="title-md">Multi-provider strategy.<br /><span className="grad">Zero single point of failure.</span></h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 32, marginBottom: 32 }}>
          {[
            { name: 'Alibaba Cloud · Qwen-plus', role: 'Primary provider', color: 'var(--blue)', desc: 'State-of-the-art multilingual model with strong coverage across Arabic, French, German, Italian and 100+ languages. Selected for translation quality and competitive API pricing.', badges: ['qwen-plus', '100+ langs', 'Primary'] },
            { name: 'Groq Cloud · LLaMA 3.3 70B', role: 'Fallback provider', color: 'var(--purple)', desc: 'Ultra-fast inference via Groq LPU. Activated automatically when Alibaba API is unavailable, ensuring continuous pipeline operation with no manual intervention.', badges: ['llama-3.3-70b', 'Failover', 'Low latency'] },
          ].map((p, i) => (
            <motion.div key={p.name} variants={vUp} custom={i + 1} className="card" style={{ borderLeft: `3px solid ${p.color}` }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{p.role}</div>
              <div style={{ fontWeight: 700, color: p.color, marginBottom: 12, fontSize: '1rem' }}>{p.name}</div>
              <p className="body-sm" style={{ marginBottom: 14 }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.badges.map(b => <span key={b} className="chip" style={{ color: p.color, borderColor: `${p.color}33`, background: `${p.color}0A`, fontSize: '0.62rem' }}>{b}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={vUp} custom={3}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Provider Selection Logic</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'nowrap', overflowX: 'auto' }}>
            {[
              { label: 'ALIBABA_API_KEY?', color: 'var(--blue)' },
              null,
              { label: 'Use qwen-plus', color: 'var(--green)' },
              null,
              { label: 'GROQ_API_KEY?', color: 'var(--purple)' },
              null,
              { label: 'Use llama-3.3-70b', color: 'var(--amber)' },
              null,
              { label: 'Fallback: Alibaba', color: 'var(--red)' },
            ].map((item, i) => item === null
              ? <div key={i} className="flow-arrow">→</div>
              : <div key={i} className="flow-node" style={{ borderColor: item.color, background: `${item.color}0A`, textAlign: 'center', minWidth: 130 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '0.78rem', color: item.color }}>{item.label}</div>
                </div>
            )}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

/* S23 — Quality Assurance Pipeline */
export function S23Quality() {
  return (
    <Slide id="s23" className="slide slide-lighter">
      <div className="cols-2" style={{ gap: 56, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Quality Assurance</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>Translation quality<br /><span className="grad">scored automatically.</span></h2>
          <p className="body-sm" style={{ marginBottom: 28 }}>A dedicated QualityService evaluates every translated string using a trained Keras model (quality_model.h5) — built on 400K+ synthetic quality labels — before results are cached or returned to the client.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Training data', val: '400K+ synthetic quality-labelled string pairs' },
              { label: 'Model', val: 'Keras H5 neural net (quality_model.h5)' },
              { label: 'Outputs', val: 'Quality score 0–1 · Accept / Flag / Reject' },
              { label: 'PII guard', val: 'DataSanitizationService strips emails, phones, IDs' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ background: 'rgba(37,99,235,0.08)', padding: '9px 14px', fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--blue)', width: 130, flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.label}</div>
                <div style={{ padding: '9px 14px', fontSize: '0.78rem', color: 'var(--t3)' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={vUp} custom={1}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Quality Pipeline Flow</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { step: 'Input', desc: 'Raw translated string from Alibaba / Groq', color: 'var(--blue)' },
              { step: 'Sanitise', desc: 'DataSanitizationService — PII detection & masking', color: 'var(--purple)' },
              { step: 'Score', desc: 'QualityService — Keras model inference', color: 'var(--amber)' },
              { step: 'Gate', desc: 'Score ≥ 0.7 → Accept · 0.4–0.7 → Flag · < 0.4 → Reject', color: 'var(--cyan)' },
              { step: 'Cache', desc: 'Accepted strings saved to MongoDB + JSON L1', color: 'var(--green)' },
              { step: 'Return', desc: 'Quality-verified translation delivered to SDK', color: 'var(--green)' },
            ].map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '9px 14px', borderRadius: 8, background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <div style={{ width: 68, fontFamily: 'var(--mono)', fontSize: '0.68rem', color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--t3)' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

/* S24 — PipelineService Architecture */
export function S24Pipeline() {
  return (
    <Slide id="s24" className="slide slide-light">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">Core Engine — PipelineService</div>
          <h2 className="title-md">The 56KB orchestrator that<br /><span className="grad">connects every subsystem.</span></h2>
        </motion.div>
        <div className="cols-3" style={{ gap: 16, marginBottom: 32 }}>
          {[
            { cat: 'Detection', color: 'var(--blue)', items: ['detectFramework()', 'resolveProjectRoot()', 'loadProjectConfig()', '.Locelithignore parser'] },
            { cat: 'Scanning', color: 'var(--purple)', items: ['ReactScanner (46KB)', 'AngularScanner', 'VanillaScanner', 'PuppeteerDOMExtractor', 'ESLintExtractor'] },
            { cat: 'Transformation', color: 'var(--cyan)', items: ['ReactReplacer (45KB)', 'ReactInjector', 'AngularReplacer', 'AngularInjector', 'VanillaReplacer'] },
            { cat: 'Translation', color: 'var(--amber)', items: ['translateStrings()', 'AlibabaService', 'GroqService', 'QualityService', 'DataSanitizationService'] },
            { cat: 'Storage', color: 'var(--green)', items: ['BackupService', 'RevertService', 'StorageService', 'I18nService', 'UsageReporter'] },
            { cat: 'Compliance', color: 'var(--red)', items: ['GDPRService', 'PII masking', 'Cascade delete', 'Right to erasure', 'Audit logging'] },
          ].map((d, i) => (
            <motion.div key={d.cat} variants={vUp} custom={i + 1} className="card" style={{ borderTop: `2px solid ${d.color}`, padding: '18px 16px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: d.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{d.cat}</div>
              {d.items.map(it => (
                <div key={it} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: '0.74rem', color: 'var(--t3)', marginBottom: 4 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: d.color, flexShrink: 0, marginTop: 5 }} />
                  {it}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* S25 — SaaS Platform Pages */
export function S25SaaS() {
  return (
    <Slide id="s25" className="slide slide-lighter">
      <div>
        <motion.div variants={vUp} custom={0} style={{ marginBottom: 40 }}>
          <div className="eyebrow">SaaS Web Platform</div>
          <h2 className="title-md">A complete developer portal.<br /><span className="grad">End to end.</span></h2>
        </motion.div>
        <div className="cols-2" style={{ gap: 20, marginBottom: 28 }}>
          {[
            { page: 'Index — Landing Page', desc: 'Marketing homepage: product overview, pricing plans, feature comparison, CTA to sign up.', color: 'var(--blue)' },
            { page: 'SignUp / SignIn', desc: 'Authentication with bcrypt-hashed passwords, JWT session tokens, and form validation via Zod.', color: 'var(--purple)' },
            { page: 'Dashboard', desc: 'Developer workspace: API key management, usage statistics (Recharts), project overview, subscription status.', color: 'var(--cyan)' },
            { page: 'Documentation', desc: 'Full interactive developer reference: CLI guide, SDK integration, API endpoints, code examples.', color: 'var(--green)' },
            { page: 'Admin Panel', desc: 'Internal management: user accounts, subscription oversight, usage monitoring, GDPR erasure controls.', color: 'var(--amber)' },
            { page: 'Scraper Dashboard', desc: 'Puppeteer DOM extraction interface: trigger web scraping jobs and inspect extracted translation strings.', color: 'var(--red)' },
          ].map((p, i) => (
            <motion.div key={p.page} variants={vUp} custom={i + 1}
              style={{ display: 'flex', gap: 14, padding: '14px 18px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div style={{ width: 4, background: p.color, borderRadius: 4, alignSelf: 'stretch', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--t1)', marginBottom: 3 }}>{p.page}</div>
                <div className="body-xs">{p.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={vUp} custom={7}>
          <div style={{ display: 'flex', gap: 16, padding: '16px 22px', borderRadius: 12, background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.12)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--blue)', fontSize: '0.82rem' }}>API Routes:</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['auth', 'apiKeys', 'stripe', 'subscriptions', 'translations', 'usage', 'admin', 'health'].map(r => (
                <span key={r} style={{ fontFamily: 'var(--mono)', fontSize: '0.63rem', background: 'var(--bg2)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 4, color: 'var(--t3)' }}>/{r}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

/* S26 — Deployment */
export function S26Deployment() {
  return (
    <Slide id="s26" className="slide slide-light">
      <div className="cols-2" style={{ gap: 56, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Production Deployment</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>Three services.<br /><span className="grad-green">One platform.</span></h2>
          <p className="body-sm" style={{ marginBottom: 32 }}>All services deployed on Railway with auto-restart, health check endpoints, and environment-based provider selection. No GPU required — translation is delegated to cloud AI APIs.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Business API', val: 'Node.js + Express · PostgreSQL via Prisma · Stripe webhooks' },
              { label: 'Vault Server', val: 'Node.js + Express · AST pipeline · Alibaba + Groq proxy' },
              { label: 'SaaS Frontend', val: 'Vite build → static files · served via Railway CDN' },
              { label: 'Translation', val: 'Alibaba Qwen-plus (primary) · Groq Cloud (fallback)' },
              { label: 'MCP Server', val: '7 tools via @modelcontextprotocol/sdk · stdio transport' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ background: 'rgba(16,185,129,0.08)', padding: '9px 14px', fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--green)', width: 120, flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.label}</div>
                <div style={{ padding: '9px 14px', fontSize: '0.78rem', color: 'var(--t3)' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={vUp} custom={1} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Service Architecture</div>
          {[
            { name: 'SaaS Frontend (Vite + React 18)', color: 'var(--blue)', port: '5173' },
            { name: 'Business API (Express)', color: 'var(--purple)', port: '3000' },
            { name: 'Vault Server (Express + Pipeline)', color: 'var(--amber)', port: '3001' },
            { name: 'MCP Server (stdio)', color: 'var(--green)', port: 'stdio' },
          ].map((s, i) => (
            <div key={s.name} style={{ height: 56, borderRadius: 10, background: `${s.color}08`, border: `1px solid ${s.color}22`, display: 'flex', alignItems: 'center', paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 600, color: s.color }}>{s.name}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--t4)' }}>:{s.port}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}
