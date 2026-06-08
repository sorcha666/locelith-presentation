/**
 * CHAPTER 5 — Locelith SLM Engineering
 */
import { motion } from 'framer-motion';
import { Slide, vUp, vLeft, vFade, Num } from './Motion';

export function S19Ch5Intro() {
  return (
    <Slide id="s19" className="slide slide-chapter">
      <div style={{ textAlign: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="ch-badge">Chapter 05</div>
          <h2 className="title-lg" style={{ marginBottom: 16 }}>Locelith SLM<br /><span className="grad">Engineering</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>From data curation to quantised CPU deployment.</p>
        </motion.div>
      </div>
    </Slide>
  );
}

/* ─── S20: DATA COLLECTION ─── */
export function S20Data() {
  return (
    <Slide id="s20" className="slide slide-light">
      <div className="cols-2" style={{ gap: 60, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div className="eyebrow">Phase 1 — Corpus Preparation</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>High-quality data is the <span style={{ color: 'var(--blue)' }}>foundation.</span></h2>
          <p className="body-sm" style={{ marginBottom: 24 }}>
            Training a specialised Small Language Model required a highly curated dataset focused explicitly on UI/UX terminology, software strings, and contextual application copy across multiple languages.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { l: 'Corpus Size', v: '4.5 Million parallel instruction pairs', c: 'var(--blue)' },
              { l: 'Data Sources', v: 'OPUS, WMT, synthetic UI terms, open-source repos', c: 'var(--purple)' },
              { l: 'Formatting', v: 'ChatML / Alpaca prompt templates', c: 'var(--cyan)' },
              { l: 'Sanitisation', v: 'Deduplication, length filtering, language identification', c: 'var(--green)' }
            ].map(item => (
              <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.c }} />
                <div style={{ flex: 1, fontWeight: 700, fontSize: '0.8rem', color: 'var(--t1)' }}>{item.l}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--t3)', textAlign: 'right' }}>{item.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={vLeft} custom={1} style={{ position: 'relative' }}>
          <div style={{ background: '#0F172A', borderRadius: 12, padding: 20, color: '#E2E8F0', fontFamily: 'var(--mono)', fontSize: '0.65rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ color: '#94A3B8', marginBottom: 12 }}>// Example Training Pair (ChatML format)</div>
            <div style={{ color: '#38BDF8', marginBottom: 4 }}>&lt;|im_start|&gt;system</div>
            <div style={{ marginBottom: 12 }}>You are an expert software localiser. Translate the following UI text into French. Preserve any variables or HTML tags.</div>
            <div style={{ color: '#38BDF8', marginBottom: 4 }}>&lt;|im_start|&gt;user</div>
            <div style={{ marginBottom: 12 }}>Welcome back, &#123;user.name&#125;!</div>
            <div style={{ color: '#38BDF8', marginBottom: 4 }}>&lt;|im_start|&gt;assistant</div>
            <div style={{ color: '#A7F3D0' }}>Bon retour, &#123;user.name&#125; !&lt;|im_end|&gt;</div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

/* ─── S21: BENCHMARK ─── */
export function S21Benchmark() {
  return (
    <Slide id="s21" className="slide slide-lighter">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div variants={vUp} custom={0} style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Phase 2 — Base Model Selection</div>
          <h2 className="title-md">Benchmarking <span className="grad">Small Language Models.</span></h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>Comparing sub-8B parameter models for zero-shot multilingual translation capabilities before fine-tuning.</p>
        </motion.div>
        
        <motion.div variants={vUp} custom={1} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Model</th>
                <th style={{ textAlign: 'center' }}>Parameters</th>
                <th style={{ textAlign: 'center' }}>Context Window</th>
                <th style={{ textAlign: 'center' }}>Multilingual Eval (Zero-shot)</th>
                <th style={{ textAlign: 'center' }}>Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>LLaMA 3</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>8B</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>8K</td>
                <td style={{ textAlign: 'center', color: 'var(--amber)' }}>Good, but heavily English-biased</td>
                <td style={{ textAlign: 'center', color: 'var(--t4)' }}>Discarded</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Mistral</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>7B v0.3</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)' }}>32K</td>
                <td style={{ textAlign: 'center', color: 'var(--amber)' }}>Moderate linguistic span</td>
                <td style={{ textAlign: 'center', color: 'var(--t4)' }}>Discarded</td>
              </tr>
              <tr style={{ background: 'rgba(16,185,129,0.05)' }}>
                <td style={{ fontWeight: 800, color: 'var(--green)' }}>Qwen 2.5</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)', color: 'var(--green)', fontWeight: 600 }}>7B</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--mono)', color: 'var(--green)', fontWeight: 600 }}>128K</td>
                <td style={{ textAlign: 'center', color: 'var(--green)', fontWeight: 600 }}>Exceptional native multilingualism</td>
                <td style={{ textAlign: 'center', color: 'var(--green)', fontWeight: 800 }}>WINNER</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </Slide>
  );
}

/* ─── S22: TRAINING ─── */
export function S22Training() {
  return (
    <Slide id="s22" className="slide slide-light">
      <div className="cols-2" style={{ gap: 50, alignItems: 'center' }}>
        <motion.div variants={vLeft} custom={0}>
          <div className="eyebrow">Phase 3 — Fine-tuning</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>Parameter-Efficient <span style={{ color: 'var(--purple)' }}>Training.</span></h2>
          <p className="body-sm" style={{ marginBottom: 24 }}>
            Full parameter fine-tuning is prohibitively expensive. We utilised LoRA (Low-Rank Adaptation) via Unsloth to train only 2% of the model's weights while retaining 99% of the performance.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '2rem', fontWeight: 800, color: 'var(--purple)', marginBottom: 4, lineHeight: 1 }}>2x</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--t2)' }}>Faster Training</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--t4)' }}>Powered by Unsloth</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '2rem', fontWeight: 800, color: 'var(--purple)', marginBottom: 4, lineHeight: 1 }}>50%</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--t2)' }}>Less VRAM</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--t4)' }}>Via 4-bit bitsandbytes</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: 4, lineHeight: 1 }}>61.34</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--t2)' }}>BLEU Score</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--t4)' }}>Post-training eval</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: 4, lineHeight: 1 }}>83.42</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--t2)' }}>chrF Score</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--t4)' }}>Post-training eval</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={vUp} custom={1} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: 16, borderRadius: 12, background: 'color-mix(in srgb, var(--blue) 8%, var(--surface))', border: '1px solid color-mix(in srgb, var(--blue) 20%, transparent)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--blue)', marginBottom: 6 }}>1. Base Model</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>Qwen 2.5 7B loaded in 4-bit precision.</div>
          </div>
          <div style={{ padding: 16, borderRadius: 12, background: 'color-mix(in srgb, var(--purple) 8%, var(--surface))', border: '1px solid color-mix(in srgb, var(--purple) 20%, transparent)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--purple)', marginBottom: 6 }}>2. LoRA Adapters</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>Rank (r=16), Alpha=32. Target modules: q_proj, k_proj, v_proj, o_proj.</div>
          </div>
          <div style={{ padding: 16, borderRadius: 12, background: 'color-mix(in srgb, var(--cyan) 8%, var(--surface))', border: '1px solid color-mix(in srgb, var(--cyan) 20%, transparent)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--cyan)', marginBottom: 6 }}>3. Supervised Fine-Tuning (SFT)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>TRL library (HuggingFace) used to align the model specifically for the JSON structural translation task.</div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}

/* ─── S23: DEPLOYMENT ─── */
export function S23Deployment() {
  return (
    <Slide id="s23" className="slide slide-lighter">
      <div className="cols-2" style={{ gap: 50, alignItems: 'center' }}>
        <motion.div variants={vUp} custom={0}>
          <div style={{ padding: 24, background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--blue), var(--green))' }} />
            
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Inference Stack</div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)', fontWeight: 800, fontSize: '1.2rem' }}>⚙️</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--t1)' }}>GGUF Q4_K_M</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>4-bit quantised model format</div>
              </div>
            </div>
            
            <div style={{ width: 2, height: 20, background: 'var(--border)', margin: '0 0 20px 23px' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', fontWeight: 800, fontSize: '1.2rem' }}>🦙</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--t1)' }}>llama.cpp</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>C++ inference engine</div>
              </div>
            </div>

            <div style={{ width: 2, height: 20, background: 'var(--border)', margin: '0 0 20px 23px' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', fontWeight: 800, fontSize: '1.2rem' }}>⚡</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--t1)' }}>FastAPI Server</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>Python web layer on Railway</div>
              </div>
            </div>
            
          </div>
        </motion.div>

        <motion.div variants={vLeft} custom={1}>
          <div className="eyebrow">Phase 4 — Deployment</div>
          <h2 className="title-md" style={{ marginBottom: 20 }}>Cost-efficient <span style={{ color: 'var(--green)' }}>CPU Inference.</span></h2>
          <p className="body-sm" style={{ marginBottom: 24 }}>
            Deploying a 7B model in production typically requires expensive GPUs. By exporting the merged LoRA weights into a 4-bit <strong>GGUF format</strong>, we eliminated the GPU requirement entirely.
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 0, listStyle: 'none' }}>
            {[
              { t: 'Memory Reduction', d: 'Model size reduced from ~15GB to ~4.2GB.' },
              { t: 'CPU Optimised', d: 'llama.cpp utilises AVX2 instructions for fast CPU token generation.' },
              { t: 'Railway Hosted', d: 'Deployed as a standard Docker container on Railway CPU tier.' },
              { t: 'Quality Maintained', d: 'Negligible BLEU delta (−0.43) between FP16 and 4-bit GGUF.' },
            ].map(l => (
              <li key={l.t} style={{ display: 'flex', gap: 12, fontSize: '0.8rem', color: 'var(--t3)' }}>
                <span style={{ color: 'var(--green)' }}>✓</span>
                <span><strong style={{ color: 'var(--t2)' }}>{l.t}:</strong> {l.d}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Slide>
  );
}
