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
      title: 'Evaluation',
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

/* ─── S21: EVALUATION & BENCHMARKING ─── */
export function S21Benchmark() {
  return (
    <Slide id="s21" className="slide slide-light">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <motion.div variants={vUp} custom={0} style={{ textAlign: 'center', marginBottom: 12, flexShrink: 0 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Multi-Scale Evaluation</div>
          <h2 className="title-md">Finding the <span className="grad">Capacity Threshold.</span></h2>
        </motion.div>

        {/* Charts Grid with Embedded Metrics */}
        <motion.div variants={vUp} custom={1} style={{ display: 'flex', gap: 14, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
          {[
            { scale: '0.5B', img: '/0_5b_chart.png', bleu: '12.45', chrf: '35.60', vram: '~0.8 GB', verdict: 'Capacity Collapse', color: 'var(--red)' },
            { scale: '1.5B', img: '/1_5b_chart.png', bleu: '40.78', chrf: '72.61', vram: '~1.5 GB', verdict: 'Underpowered', color: 'var(--amber)' },
            { scale: '3B', img: '/3b_chart.png', bleu: '48.21', chrf: '76.14', vram: '~2.8 GB', verdict: 'Moderate', color: 'var(--t3)' },
            { scale: '7B', img: '/7b_chart.png', bleu: '61.34', chrf: '83.42', vram: '~5.8 GB', verdict: '🏆 Winner', color: 'var(--green)', glow: true },
            { scale: '14B', img: '/14b_chart.png', bleu: '65.10', chrf: '85.91', vram: '~11.0 GB', verdict: 'Exceeds VRAM', color: 'var(--blue)' },
          ].map(c => (
            <div key={c.scale} style={{ 
              background: c.glow ? 'rgba(16,185,129,0.05)' : '#fff', 
              borderRadius: 14, 
              padding: '12px 12px 10px', 
              border: c.glow ? '2px solid var(--green)' : '1px solid var(--border)', 
              textAlign: 'center', 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 380,
              boxShadow: c.glow ? '0 8px 30px rgba(16,185,129,0.15)' : 'none'
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 900, marginBottom: 6, flexShrink: 0, color: c.glow ? 'var(--green)' : 'var(--t1)' }}>{c.scale}</div>
              
              {/* Image — grows to fill available space */}
              <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <img src={c.img} alt={`${c.scale} Benchmark`} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6, border: '1px solid var(--border2)' }} />
              </div>
              
              {/* Compact Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 6px', marginBottom: 8, textAlign: 'left', flexShrink: 0 }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--t3)' }}>BLEU</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textAlign: 'right', color: 'var(--t1)' }}>{c.bleu}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--t3)' }}>chrF</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textAlign: 'right', color: 'var(--t1)' }}>{c.chrf}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--t3)' }}>HW Fit</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--t1)' }}>{c.vram}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--t3)' }}>Verdict</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, textAlign: 'right', color: c.color }}>{c.verdict}</div>
              </div>

              <div style={{ 
                background: `color-mix(in srgb, ${c.color} 15%, transparent)`, 
                color: c.color, 
                padding: '6px 0', 
                borderRadius: 6, 
                fontSize: '0.72rem', 
                fontWeight: 800,
                flexShrink: 0
              }}>
                {c.verdict}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}


/* ─── S22: DEPLOYMENT & BUGS ─── */
export function S22Deployment() {
  return (
    <Slide id="s22" className="slide slide-lighter">
      <div className="cols-2" style={{ gap: 50, alignItems: 'center', height: '100%' }}>
        <motion.div variants={vLeft} custom={0}>
          <div className="eyebrow">Local Production</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>Deployment &amp; <span style={{ color: 'var(--red)' }}>Bug Resolution.</span></h2>
          <p className="body-sm" style={{ marginBottom: 24 }}>
            Deploying a 7B model locally required aggressive optimization to fit the 4GB target hardware, alongside resolving critical generative bugs during inference.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--surface)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ padding: '4px 8px', background: 'rgba(37,99,235,0.1)', color: 'var(--blue)', borderRadius: 4, fontSize: '0.7rem', fontWeight: 800 }}>STACK</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--t1)' }}>4-bit GGUF via llama.cpp</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>We exported the LoRA weights into 4-bit GGUF. This reduced VRAM from ~16GB to 5.8GB, enabling fast CPU-based inference via llama.cpp and a FastAPI server.</div>
            </div>

            <div style={{ background: 'var(--surface)', padding: 16, borderRadius: 12, border: '1px solid var(--border)', borderLeft: '4px solid var(--amber)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ padding: '4px 8px', background: 'rgba(245,158,11,0.1)', color: 'var(--amber)', borderRadius: 4, fontSize: '0.7rem', fontWeight: 800 }}>BUG 01</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--t1)' }}>Infinite Repetition Loop</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}><strong>Issue:</strong> Model generated gibberish loops (e.g., "hello hello hello").<br/><strong>Fix:</strong> Removed repetition_penalty which was blocking the End-Of-Sequence (EOS) token, and implemented a strict clean_translation post-processor.</div>
            </div>

            <div style={{ background: 'var(--surface)', padding: 16, borderRadius: 12, border: '1px solid var(--border)', borderLeft: '4px solid var(--red)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', borderRadius: 4, fontSize: '0.7rem', fontWeight: 800 }}>BUG 02</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--t1)' }}>Double-Pass Hallucinations</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}><strong>Issue:</strong> Direct Non-English to Non-English translation hallucinated wildly.<br/><strong>Fix:</strong> Implemented an automated "Any-to-English-to-Any" pivot architecture in the API.</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={vUp} custom={1} style={{ background: '#0F172A', borderRadius: 16, padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.3)', color: '#E2E8F0', fontFamily: 'var(--mono)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: 16 }}>// Double-Pass Pivot Architecture</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ fontSize: '0.85rem' }}>Source: <span style={{ color: '#F87171' }}>"Bonjour"</span> (FR)</div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, background: 'rgba(56,189,248,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(56,189,248,0.2)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#38BDF8' }} />
            <div>
              <div style={{ fontSize: '0.7rem', color: '#7DD3FC', marginBottom: 4 }}>Pass 1 (Base Qwen-2.5)</div>
              <div style={{ fontSize: '0.85rem' }}>Pivot: <span style={{ color: '#E0F2FE' }}>"Hello"</span> (EN)</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(16,185,129,0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(16,185,129,0.2)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
            <div>
              <div style={{ fontSize: '0.7rem', color: '#6EE7B7', marginBottom: 4 }}>Pass 2 (Locelith Adapter)</div>
              <div style={{ fontSize: '0.85rem' }}>Target: <span style={{ color: '#D1FAE5' }}>"Hola"</span> (ES)</div>
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
