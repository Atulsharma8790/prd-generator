import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { verifyPasscode, unauthorizedResponse } from '@/lib/auth'
import { buildPrompt } from '@/lib/prompts'
import type { PRDInput } from '@/lib/types'

const client = new Anthropic()

export async function POST(req: Request) {
  if (!verifyPasscode(req)) return unauthorizedResponse()
  const input: PRDInput = await req.json()
  if (!input.productName || !input.problemStatement || !input.proposedSolution) {
    return NextResponse.json({ error: 'Product name, problem statement, and proposed solution are required' }, { status: 400 })
  }
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 6000,
    messages: [{ role: 'user', content: buildPrompt(input) }],
  })
  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  try {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON found')
    return NextResponse.json(JSON.parse(match[0]))
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
  }
}
