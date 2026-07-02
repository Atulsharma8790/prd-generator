'use client'
import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import type { PRDInput } from '@/lib/types'
import { EXAMPLE_INPUT, PRODUCT_TYPES, STAGES } from '@/lib/config'

interface Props { onGenerate: (input: PRDInput) => void; isLoading: boolean }
const EMPTY: PRDInput = { productName: '', productType: 'Web App', stage: 'MVP', targetAudience: '', problemStatement: '', proposedSolution: '', coreFeatures: '', constraints: '', successMetrics: '' }

export default function PRDForm({ onGenerate, isLoading }: Props) {
  const [form, setForm] = useState<PRDInput>(EMPTY)
  function set<K extends keyof PRDInput>(k: K, v: string) { setForm(f => ({ ...f, [k]: v })) }
  const canSubmit = form.productName.trim() && form.problemStatement.trim() && form.proposedSolution.trim() && form.targetAudience.trim()

  return (
    <div className="rounded-2xl p-6 space-y-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Product Details</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Describe your product idea — AI generates a complete, implementation-ready PRD</p>
        </div>
        <button onClick={() => setForm(EXAMPLE_INPUT)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: 'rgba(13,148,136,0.1)', color: '#5EEAD4', border: '1px solid rgba(13,148,136,0.25)' }}>
          <Sparkles size={12} /> Load Example
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Product Name <span style={{ color: 'var(--accent-teal)' }}>*</span></label>
          <input value={form.productName} onChange={e => set('productName', e.target.value)} placeholder="e.g. TeamPulse" className="input-themed" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Product Type</label>
          <select value={form.productType} onChange={e => set('productType', e.target.value)} className="input-themed">
            {PRODUCT_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Stage</label>
          <select value={form.stage} onChange={e => set('stage', e.target.value)} className="input-themed">
            {STAGES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Target Audience <span style={{ color: 'var(--accent-teal)' }}>*</span></label>
        <input value={form.targetAudience} onChange={e => set('targetAudience', e.target.value)} placeholder="Who is this for? Be specific — role, company size, industry…" className="input-themed" />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Problem Statement <span style={{ color: 'var(--accent-teal)' }}>*</span></label>
        <textarea value={form.problemStatement} onChange={e => set('problemStatement', e.target.value)} rows={3} placeholder="What specific problem does this solve? What pain does your target audience currently experience?" className="input-themed resize-y" />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Proposed Solution <span style={{ color: 'var(--accent-teal)' }}>*</span></label>
        <textarea value={form.proposedSolution} onChange={e => set('proposedSolution', e.target.value)} rows={3} placeholder="How does your product solve it? What's the core insight or mechanism?" className="input-themed resize-y" />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Core Features / Capabilities</label>
        <textarea value={form.coreFeatures} onChange={e => set('coreFeatures', e.target.value)} rows={4} placeholder="List the key features you have in mind (bullet points are fine)…" className="input-themed resize-y" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Constraints <span style={{ color: 'var(--text-dimmer)' }}>(optional)</span></label>
          <textarea value={form.constraints} onChange={e => set('constraints', e.target.value)} rows={3} placeholder="Technical, budget, timeline, regulatory, integration constraints…" className="input-themed resize-y" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Success Metrics <span style={{ color: 'var(--text-dimmer)' }}>(optional)</span></label>
          <textarea value={form.successMetrics} onChange={e => set('successMetrics', e.target.value)} rows={3} placeholder="How will you measure success? KPIs, adoption targets, revenue goals…" className="input-themed resize-y" />
        </div>
      </div>

      <button onClick={() => onGenerate(form)} disabled={!canSubmit || isLoading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white disabled:opacity-40" style={{ background: 'var(--accent-grad)' }}>
        {isLoading ? <><Loader2 size={16} className="animate-spin" /> Generating PRD…</> : <><Sparkles size={16} /> Generate PRD</>}
      </button>
    </div>
  )
}
