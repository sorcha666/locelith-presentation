/**
 * CHAPTER 5 — Locelith SLM Engineering
 */
import { motion } from 'framer-motion';
import { Slide, vUp, vLeft, vFade } from './Motion';

export function S19Ch5Intro() {
  return (
    <Slide id="s19" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 05</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>Locelith SLM<br /><span className="grad">Engineering</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>The full machine learning lifecycle: from raw data collection to on-premise CPU deployment.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

/* ─── S20: FULL SLM PIPELINE (5 PHASES) ─── */
export function S20SLMPipeline() {
  const phases = [
    {
      num: '01',
      title: 'Data Collection',
      color: 'var(--blue)',
      items: [
        '5.4M raw UI pairs via OPUS',
        'Scraped Web & React libs',
        'Knowledge Distillation',
        '326K golden teacher pairs'
      ]
    },
    {
      num: '02',
      title: 'Data Preparation',
      color: 'var(--cyan)',
      items: [
        'Global deduplication',
        'Regex junk filtering',
        '10x Prompt Augmentation',
        'Final: 4.5M clean pairs'
      ]
    },
    {
      num: '03',
      title: 'QLoRA Training',
      color: 'var(--purple)',
      items: [
        'Qwen-2.5 Base (4-bit NF4)',
        'LoRA injected (r=16, α=32)',
        '1.18% trainable params',
        'Unsloth + TRL (T4 GPU)'
      ]
    },
    {
      num: '04',
      title: 'Benchmarking',
      color: 'var(--amber)',
      items: [
        'Tested 0.5B through 14B',
        '0.5B capacity collapse',
        '7B Winner Selected',
        'BLEU 61.34 · chrF 83.42'
      ]
    },
    {
      num: '05',
      title: 'CPU Deployment',
      color: 'var(--green)',
      items: [
        '4-bit GGUF quantisation',
        'Double-Pass (Any→EN→Any)',
        'Bug fix: EOS token loop',
        'FastAPI + llama.cpp'
      ]
    }
  ];

  return (
    <Slide id="s20" className="slide slide-lighter">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        
        <motion.div variants={vUp} custom={0} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Machine Learning Lifecycle</div>
          <h2 className="title-md">The <span className="grad">Locelith SLM</span> Pipeline.</h2>
        </motion.div>

        {/* Horizontal Pipeline */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
          {phases.map((p, i) => (
            <motion.div key={p.num} variants={vLeft} custom={i + 1} style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              
              {/* Arrow Connector (except last) */}
              {i < phases.length - 1 && (
                <div style={{ position: 'absolute', top: 24, right: -14, width: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0, color: 'var(--border2)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              )}

              {/* Card */}
              <div style={{ background: 'var(--surface)', borderRadius: 12, border: `1px solid color-mix(in srgb, ${p.color} 20%, var(--border))`, padding: '20px 16px', height: '100%', position: 'relative', zIndex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `color-mix(in srgb, ${p.color} 12%, transparent)`, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 800 }}>
                    {p.num}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--t1)', lineHeight: 1.2 }}>
                    {p.title}
                  </div>
                </div>

                {/* Bullets */}
                <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, margin: 0 }}>
                  {p.items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: 8, fontSize: '0.72rem', color: 'var(--t3)', lineHeight: 1.4 }}>
                      <span style={{ color: p.color, opacity: 0.7, fontSize: '0.6rem', marginTop: 3 }}>▶</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </Slide>
  );
}
