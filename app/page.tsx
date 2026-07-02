'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import PasscodeModal from '@/components/PasscodeModal'
import PRDForm from '@/components/PRDForm'
import PRDReport from '@/components/PRDReport'
import { useAuth } from '@/context/auth'
import type { PRDInput, PRDOutput } from '@/lib/types'

export default function Home() {
  const { getHeaders } = useAuth()
  const [showPasscode, setShowPasscode] = useState(false)
  const [pending, setPending] = useState<PRDInput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [output, setOutput] = useState<PRDOutput | null>(null)
  const [lastInput, setLastInput] = useState<PRDInput | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function generate(input: PRDInput) {
    const headers = getHeaders()
    if (!headers['x-access-code']) { setPending(input); setShowPasscode(true); return }
    setIsLoading(true); setError(null)
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(input) })
      if (!res.ok) { const e = await res.json().catch(() => ({ error: 'Generation failed' })); throw new Error(e.error) }
      setOutput(await res.json()); setLastInput(input)
    } catch (e) { setError(e instanceof Error ? e.message : 'Something went wrong') }
    finally { setIsLoading(false) }
  }

  function handleUnlocked() { if (pending) { generate(pending); setPending(null) } }
  function handleLock() { setOutput(null); setLastInput(null); setError(null) }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {showPasscode && <PasscodeModal onClose={() => setShowPasscode(false)} onUnlocked={handleUnlocked} />}
      <Header onShowPasscode={() => setShowPasscode(true)} onLock={handleLock} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {!output && !isLoading && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: 'rgba(13,148,136,0.1)', color: 'var(--accent-teal)', border: '1px solid rgba(13,148,136,0.25)' }}>
              📋 Personas · Roadmap · Risks · Metrics
            </div>
            <h1 className="text-4xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>AI PRD Generator</h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Describe your product idea and get a complete, structured Product Requirements Document — personas, use cases, feature roadmap, risks, and open questions — in seconds.
            </p>
            <div className="flex items-center justify-center gap-6 mt-5 flex-wrap">
              {['User Personas', 'Use Cases', 'Feature Roadmap', 'Risk Analysis', 'Success Metrics', 'Open Questions'].map(f => (
                <span key={f} className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)' }}>✓</span> {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5' }}>
            <span>⚠</span><span className="text-sm">{error}</span>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 animate-pulse" style={{ background: 'var(--accent-grad)' }}>
              <span className="text-3xl">📋</span>
            </div>
            <p className="font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>Generating Your PRD…</p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>AI is building personas, use cases, feature roadmap, and risk analysis</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {['Building personas', 'Mapping use cases', 'Prioritising features', 'Analysing risks'].map((s, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full animate-pulse" style={{ background: 'var(--bg-card)', color: 'var(--text-dimmer)', border: '1px solid var(--border-default)', animationDelay: `${i * 0.3}s` }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {!isLoading && !output && <PRDForm onGenerate={generate} isLoading={isLoading} />}
        {!isLoading && output && lastInput && <PRDReport output={output} input={lastInput} onReset={() => { setOutput(null); setLastInput(null); setError(null) }} />}
      </main>

      <footer className="py-4 border-t text-center mt-auto" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-xs" style={{ color: 'var(--text-dimmer)' }}>AI-generated PRDs · Validate with your team · For planning purposes only</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-dimmer)' }}></p>
      </footer>
    </div>
  )
}
