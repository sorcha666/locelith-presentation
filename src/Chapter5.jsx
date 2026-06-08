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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <motion.div variants={vUp} custom={0} style={{ textAlign: 'center', marginBottom: 20 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Multi-Scale Evaluation</div>
          <h2 className="title-md">Finding the <span className="grad">Capacity Threshold.</span></h2>
          <p className="subtitle" style={{ margin: '0 auto', maxWidth: 800 }}>Evaluated on a 510-pair held-out benchmark across 5 parameter scales. At 0.5B, the model collapses due to insufficient attention heads for 112 languages.</p>
        </motion.div>

        {/* Charts Grid */}
        <motion.div variants={vUp} custom={1} style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
          {[
            { scale: '0.5B', img: '/0_5b_chart.png' },
            { scale: '1.5B', img: '/1_5b_chart.png' },
            { scale: '3B', img: '/3b_chart.png' },
            { scale: '7B', img: '/7b_chart.png' },
            { scale: '14B', img: '/14b_chart.png' },
          ].map(c => (
            <div key={c.scale} style={{ background: '#fff', borderRadius: 8, padding: 8, border: '1px solid var(--border)', textAlign: 'center', width: '18%' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, marginBottom: 6, color: 'var(--t1)' }}>{c.scale}</div>
              <img src={c.img} alt={`${c.scale} Benchmark`} style={{ width: '100%', height: 'auto', borderRadius: 4 }} />
            </div>
          ))}
        </motion.div>

        {/* Winner Table */}
        <motion.div variants={vUp} custom={2} className="card" style={{ padding: 0, overflow: 'hidden', margin: '0 auto', width: '100%', maxWidth: 900 }}>
          <table className="data-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Model Scale</th>
                <th style={{ textAlign: 'center' }}>BLEU</th>
                <th style={{ textAlign: 'center' }}>chrF</th>
                <th style={{ textAlign: 'center' }}>4-bit VRAM</th>
                <th>Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>0.5B</td>
                <td style={{ textAlign: 'center', color: 'var(--red)' }}>12.45</td>
                <td style={{ textAlign: 'center', color: 'var(--red)' }}>35.60</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>~0.8 GB</td>
                <td style={{ color: 'var(--red)' }}>Capacity Collapse</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>3B</td>
                <td style={{ textAlign: 'center' }}>48.21</td>
                <td style={{ textAlign: 'center' }}>76.14</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>~2.8 GB</td>
                <td style={{ color: 'var(--t3)' }}>Moderate, lacks depth</td>
              </tr>
              <tr style={{ background: 'rgba(16,185,129,0.05)' }}>
                <td style={{ fontWeight: 800, color: 'var(--green)' }}>7B (Winner)</td>
                <td style={{ textAlign: 'center', color: 'var(--green)', fontWeight: 800 }}>61.34</td>
                <td style={{ textAlign: 'center', color: 'var(--green)', fontWeight: 800 }}>83.42</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)', color: 'var(--green)' }}>~5.8 GB</td>
                <td style={{ color: 'var(--green)', fontWeight: 800 }}>Optimal Quality/Cost</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>14B</td>
                <td style={{ textAlign: 'center', color: 'var(--blue)' }}>65.10</td>
                <td style={{ textAlign: 'center', color: 'var(--blue)' }}>85.91</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>~11.0 GB</td>
                <td style={{ color: 'var(--amber)' }}>Exceeds 4GB target</td>
              </tr>
            </tbody>
          </table>
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
