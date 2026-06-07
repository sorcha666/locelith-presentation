import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

export default function Slide01Cover() {
  const logoSpring = useSpring({
    from: { opacity: 0, scale: 0.75 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 130, friction: 16 },
    delay: 200,
  });

  const tags = ['Qwen-2.5 SLM', 'QLoRA Fine-Tuning', 'AST Pipeline', 'React / Node.js', '112 Languages', 'SaaS Platform'];

  return (
    <div className="slide" id="slide-1" style={{ background: 'transparent', minHeight: '100vh', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="slide-content" style={{ display: 'flex', gap: 64, alignItems: 'center' }}>

        {/* Left: Text */}
        <div style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="slide-label">Final Year Master Internship — PFE 2025/2026</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <h1 className="hero-title" style={{ marginBottom: 8 }}>
              <span className="gradient-text">Locelith</span>
            </h1>
            <h2 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', fontWeight: 500, color: '#334155', lineHeight: 1.5, marginBottom: 32 }}>
              AI-Assisted Automated Web Application<br />
              <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>Internationalisation Framework</strong>
            </h2>
          </motion.div>

          {/* Tags */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {tags.map((t, i) => (
              <motion.span key={t} className="tag tag-blue"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.07 }}>
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* Authors */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
            {[
              { name: 'Oussama Elkamel', role: 'Lead Developer', icon: '👨‍💻' },
              { name: 'Sarra Chtioui', role: 'AI Pipeline Engineer', icon: '🧠' },
            ].map((a) => (
              <div key={a.name} className="card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="icon-circle" style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}>{a.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.95rem' }}>{a.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--blue-mid)', fontWeight: 600 }}>{a.role}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Institution row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Institution', value: 'ISITCOM · Hammam Sousse' },
              { label: 'Host Company', value: 'Synervy Technologies' },
              { label: 'Academic Year', value: '2025 / 2026' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: '0.65rem', color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy)' }}>{item.value}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Animated logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{ flexShrink: 0, width: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

          {/* Glow rings behind logo */}
          <div style={{
            position: 'absolute', width: 320, height: 320, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          }} />
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 60%)' }}
          />

          <motion.img
            src="/locelithai.png"
            alt="Locelith AI Logo"
            className="animate-float"
            style={{ width: 300, height: 300, objectFit: 'contain', position: 'relative', zIndex: 2 }}
          />
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          style={{ color: 'var(--muted2)', fontSize: '0.78rem', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 20, height: 1, background: 'var(--border2)', display: 'inline-block' }} />
          scroll to navigate
          <span style={{ width: 20, height: 1, background: 'var(--border2)', display: 'inline-block' }} />
        </motion.div>
      </motion.div>

      <div className="slide-num" style={{ color: 'var(--muted2)' }}>01 / 09</div>
    </div>
  );
}
