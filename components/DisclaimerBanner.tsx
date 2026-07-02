'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { if (!sessionStorage.getItem('prd_disclaimer_dismissed')) setVisible(true) }, [])
  if (!visible) return null
  return (
    <div className="w-full flex items-center justify-between gap-4 px-4 py-2.5" style={{ background: 'rgba(13,148,136,0.1)', borderBottom: '1px solid rgba(13,148,136,0.2)', color: '#5EEAD4' }}>
      <p className="flex-1 text-center text-xs"><strong>AI-generated PRDs</strong> are a starting point — review with your team, validate assumptions, and refine before committing to build.</p>
      <button onClick={() => { sessionStorage.setItem('prd_disclaimer_dismissed', '1'); setVisible(false) }} className="shrink-0 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  )
}
