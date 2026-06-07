/**
 * Speaker Notes Panel — press N to toggle
 * Shows concise talking points for the current slide
 */

export const NOTES = {
  s01: {
    speaker: 'Both',
    text: `Good morning to the jury, our professors, and everyone present today.

We are Sarra Chtioui and Oussama Elkamel, fourth-year students in Software and AI Engineering at EPI Digital School Sousse. Today we are proud to present our end-of-year project: Locelith.

Locelith is an AI-assisted framework that fully automates the localisation lifecycle of web applications — from extracting text in the source code, to translating it with AI, to delivering it at runtime in the user's language. All of this happens with a single command, without any manual file management.

We will walk you through seven chapters covering the context, the state of the art, our specifications, the architecture we designed, the implementation we built, our tests, and our conclusions. Let's begin.`,
  },

  s02: {
    speaker: 'Oussama',
    text: `Chapter 1 — General Context and Host Organisation.

In this chapter, we will explain why the problem of software localisation is not just a translation challenge — it is a deep engineering and business problem that the industry has not yet fully solved. We will also present the host organisation and the academic framework of this project.`,
  },

  s03: {
    speaker: 'Oussama',
    text: `Let's start with the numbers, because they tell a very clear story.

72.4% of consumers say they prefer to use a product in their native language. Not "it would be nice" — they prefer it. 40% higher conversion rates are recorded on platforms that are localised compared to those that are English-only. And the global localisation market has already reached 7,600 billion dollars.

What this tells us is simple: language is the first barrier to global reach. You can build the best product in the world, but if it only speaks one language, you have already excluded the majority of your potential users from day one.

And yet, the infrastructure to support multilingual applications remains, today, fundamentally broken. It is slow, expensive, and manual. That is the problem Locelith was built to solve.`,
  },

  s05: {
    speaker: 'Oussama',
    text: `This project was carried out over 24 weeks within Synervy Technologies — an IT company based in Sousse, Tunisia, specialising in AI-driven product development and SaaS solutions. The company provided the engineering environment, the infrastructure, and the real-world product context that shaped every decision in this project.

Institutionally, this work is submitted as our End-of-Year Project at EPI Digital School — École Polytechnique Internationale, under joint academic and industrial supervision.

The project ran from February to July 2026. We adopted a Scrumban methodology — combining the structure of Scrum sprints with the flow control of Kanban — across 12 sprints, with a WIP limit of two tasks per developer at any time. This allowed us to maintain velocity while managing the complexity of building four simultaneous deliverables.

Those four deliverables are: the AST Translation Pipeline, the AI Quality Pipeline, the SaaS Management Platform, and the Multi-Framework SDK. Together, they form one integrated ecosystem — which we will detail throughout this presentation.`,
  },
  s07: {
    speaker: 'Sarra',
    text: `Chapter 2 — we surveyed the existing landscape: i18next, react-intl, Lokalise, Crowdin, Google Translate API, DeepL. All require manual string extraction and file management. None automate the full pipeline. None handle PII by default.`,
  },
  s08: {
    speaker: 'Sarra',
    text: `Current developer workflow:\nExtract strings manually → create locale files → send to translation API → integrate runtime library → repeat for every release.\n\nLocelith replaces this entire chain with one CLI command.`,
  },
  s09: {
    speaker: 'Sarra',
    text: `Comparison table: evaluate tools on automation, code-awareness, PII protection, runtime SDK, SaaS management.\n\nLocelith is the only solution that scores positively across all five axes.`,
  },
  s10: {
    speaker: 'Sarra',
    text: `The market gap: there is no tool that is simultaneously:\n• Code-aware (AST-level, not regex)\n• Privacy-safe (PII masking before any external call)\n• End-to-end (source code → runtime delivery)\n\nThat gap is exactly what Locelith was built to fill.`,
  },
  s11: {
    speaker: 'Sarra',
    text: `Chapter 3 — Specifications. We defined requirements from three user personas: the developer, the SaaS admin, and the end user. Adopted Scrumban methodology for agile delivery across 12 sprints.`,
  },
  s12: {
    speaker: 'Sarra',
    text: `Use case actors:\n• Developer: runs CLI, integrates SDK\n• Admin: manages subscriptions, API keys, billing\n• End User: switches language at runtime with zero reload\n\nFunctional requirements derived from each actor's needs.`,
  },
  s13: {
    speaker: 'Sarra',
    text: `Non-functional requirements:\n• Performance: cache-first, <50ms response for known strings\n• Security: HMAC-SHA256 + JWT + PII masking\n• Reliability: multi-provider fallback (Alibaba → Groq)\n• GDPR: full data erasure on request\n• Availability: independent microservice deploy`,
  },
  s14: {
    speaker: 'Oussama',
    text: `Chapter 4 — Architecture. Five independent layers. No single point of failure. Each service deployable and scalable independently.`,
  },
  s15: {
    speaker: 'Oussama',
    text: `Five layers:\n1. SDK/CLI (client-side, npm packages)\n2. Vault Server (auth, AST, PII, cache, AI proxy)\n3. Business API (JWT, Prisma, Stripe webhooks)\n4. AI Inference (Alibaba Qwen-plus + Groq Cloud)\n5. Data (PostgreSQL + MongoDB + JSON file cache)\n\nServices: 3 Node.js + 1 AI proxy · Auth: JWT + HMAC-SHA256`,
  },
  s16: {
    speaker: 'Oussama',
    text: `Vault Server flow:\nSDK sends HMAC-SHA256 signed request → Auth validates (5-min window) → @babel/parser builds AST → string nodes extracted → PII masked → Cache L1 (JSON) → Cache L2 (PostgreSQL) → Alibaba Qwen-plus/Groq → rewrite source files.\n\nKey: AST-level extraction — surgical precision, never touches non-UI code.`,
  },
  s17: {
    speaker: 'Oussama',
    text: `Four SDK packages, all npm-published:\n• @locelith/core — CLI engine, 7 commands\n• @locelith/react — Context provider + useTranslation() hook\n• locelith-angular — declarative pipe + Angular DI\n• @locelith/vanilla — zero-dependency ESM/CJS API\n\nOne command to localise any app.`,
  },
  s18: {
    speaker: 'Oussama',
    text: `Database strategy: right tool for each job.\n• PostgreSQL — ACID: users, subscriptions, API keys, invoices\n• MongoDB — flexible schema: translation documents, locale pairs\n• JSON cache — zero-latency L1 resolution\n\nSecurity: HMAC-SHA256, bcrypt cost 12, JWT rotation, PII masking, cascade GDPR delete. Source strings never persisted to disk.`,
  },
  s19: {
    speaker: 'Sarra',
    text: `Chapter 5 — Implementation. Sarra presents the technical build: AI quality pipeline, CLI demo, SaaS platform, and deployment.`,
  },
  s20: {
    speaker: 'Sarra',
    text: `Tech stack:\n• Vault Server: Node.js + Express\n• Business API: Node.js + Prisma ORM\n• AI: Alibaba Qwen-plus (primary) + Groq Cloud (fallback)\n• SaaS Portal: Vite + React 18 + Recharts + Stripe\n• SDK: TypeScript, published to npm`,
  },
  s21: {
    speaker: 'Sarra',
    text: `Live CLI demonstration:\n1. locelith init → creates config + API key setup\n2. locelith run → scans AST → translates → rewrites source files\n3. Runtime: useTranslation() hook serves locale in-browser\n\nPoint out: zero manual file editing required.`,
  },
  s22: {
    speaker: 'Sarra',
    text: `Multi-provider AI strategy:\n• Primary: Alibaba Qwen-plus — best for Arabic, Chinese, Southeast Asian\n• Fallback: Groq Cloud — ultra-low latency, fast failover\n\nProvider is selected per-request based on availability and string language pair. Transparent to the developer.`,
  },
  s23: {
    speaker: 'Sarra',
    text: `AI Quality Pipeline:\n• Keras model trained on 400,000+ synthetic translation pairs\n• Scores each translation: Accept / Review / Reject\n• Rejection → automatic retry with fallback provider\n• PII sanitisation runs BEFORE any AI call (regex + NER masking)`,
  },
  s24: {
    speaker: 'Sarra',
    text: `Full pipeline flow:\nAST extract → PII mask → Cache check → AI translate (Qwen-plus) → Quality score (Keras) → Pass? Store + inject. Fail? → Groq retry → Score again → Flag for human review if still failing.\n\nTwo-pass design guarantees quality at scale.`,
  },
  s25: {
    speaker: 'Sarra',
    text: `SaaS Management Platform:\n• Subscription tiers with Stripe Checkout\n• API key management with usage caps\n• Real-time usage charts via Recharts\n• Admin panel: user management, override keys\n• Developer docs integrated in-portal`,
  },
  s26: {
    speaker: 'Sarra',
    text: `Deployment:\n• Vault Server + Business API → Railway (containerised)\n• SaaS Portal → Vercel (edge CDN)\n• MongoDB Atlas + Supabase (PostgreSQL)\n• CI: GitHub Actions — test → build → deploy on push to main`,
  },
  s27: {
    speaker: 'Oussama',
    text: `Chapter 6 — Tests & Validation. Three testing dimensions: unit tests (Jest), AI model evaluation, SDK integration tests.`,
  },
  s28: {
    speaker: 'Oussama',
    text: `Test results:\n• Unit: Auth middleware, AST extractor, PII detector, cache resolver — all critical paths covered\n• Keras model: evaluated on 10,000 held-out pairs — precision & recall metrics\n• SDK integration: full CLI flow tested on real React and Angular scaffolds\n• AST false-positive rate reduced from 12% to under 2% through visitor pattern refinement`,
  },
  s29: {
    speaker: 'Both',
    text: `Chapter 7 — Conclusion. We return to the core problem and show what Locelith delivers against it.`,
  },
  s30: {
    speaker: 'Oussama',
    text: `Achievements in 24 weeks:\n✓ Production Vault Server (AST + HMAC + 3-tier cache)\n✓ AI Quality Pipeline (Keras + PII + multi-provider)\n✓ SaaS Platform (Stripe + analytics + admin)\n✓ 4 npm SDK packages (React, Angular, Vanilla, CLI)\n✓ 112 languages supported`,
  },
  s31: {
    speaker: 'Oussama',
    text: `Roadmap:\n• Vue.js SDK — complete major frontend ecosystem\n• Contextual translation — use AST graph for semantic context\n• Offline mode — local inference for strict data residency\n• Translation memory — cross-project reuse of approved pairs`,
  },
  s32: {
    speaker: 'Both',
    text: `Closing:\n"Localisation is not a feature. For global software, it is the foundation."\n\nLocelith makes that foundation invisible to the developer and effortless for the user.\n\nThank you — we are ready for your questions.\n\n🎯 Key answers ready:\n• Why Qwen-plus? → multilingual strength + cost\n• Quality? → Keras model + retry pipeline\n• Security? → PII masking + no source persistence\n• Billing? → Stripe webhooks + usage tracking`,
  },
};

export default function NotesPanel({ slideId, onClose }) {
  const note = NOTES[slideId];
  if (!note) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 80,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(700px, 90vw)',
      background: 'rgba(10, 15, 30, 0.94)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(99, 140, 255, 0.25)',
      borderRadius: 16,
      padding: '20px 28px',
      zIndex: 9999,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      color: '#E2E8F0',
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#7C9FF7',
          }}>
            🎤 Speaker Notes
          </div>
          <span style={{
            fontSize: '0.58rem', padding: '2px 8px', borderRadius: 100,
            background: 'rgba(99,140,255,0.15)', color: '#93B4FF',
            border: '1px solid rgba(99,140,255,0.25)',
          }}>
            {note.speaker}
          </span>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: '#64748B',
          cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '0 4px',
        }}>✕</button>
      </div>

      {/* Notes text */}
      <div style={{
        fontSize: '0.78rem', lineHeight: 1.75, color: '#CBD5E1',
        whiteSpace: 'pre-wrap', maxHeight: '45vh', overflowY: 'auto',
      }}>
        {note.text}
      </div>

      {/* Footer hint */}
      <div style={{ marginTop: 14, fontSize: '0.58rem', color: '#475569', textAlign: 'right' }}>
        Press N to close
      </div>
    </div>
  );
}
