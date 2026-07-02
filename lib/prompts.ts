import type { PRDInput } from './types'

export function buildPrompt(input: PRDInput): string {
  return `You are a Senior Product Manager with 15+ years experience writing PRDs at Google, Stripe, and Atlassian. You write clear, structured, implementation-ready Product Requirements Documents that engineering teams can act on immediately.

Generate a comprehensive PRD for the product described below. Return ONLY valid JSON — no markdown, no text outside the JSON.

PRODUCT DETAILS:
- Name: ${input.productName}
- Type: ${input.productType}
- Stage: ${input.stage}
- Target Audience: ${input.targetAudience}
- Problem: ${input.problemStatement}
- Proposed Solution: ${input.proposedSolution}
- Core Features Envisioned: ${input.coreFeatures}
- Constraints: ${input.constraints || 'None specified'}
- Success Metrics: ${input.successMetrics || 'Not specified'}

Return JSON matching exactly:
{
  "executiveSummary": "3-4 sentence crisp summary covering what the product is, who it's for, the core problem solved, and the key differentiator.",
  "problemStatement": "2-3 paragraph expanded problem statement covering current state, pain points with evidence, and cost of inaction.",
  "targetMarket": "Clear description of the addressable market, estimated size, and why now is the right time.",
  "personas": [
    {
      "name": "First name only",
      "role": "Job title and context",
      "goals": ["goal 1", "goal 2", "goal 3"],
      "painPoints": ["pain 1", "pain 2", "pain 3"],
      "quote": "A realistic quote this person might say about the problem"
    }
  ],
  "useCases": [
    {
      "title": "Use case title",
      "actor": "Which persona",
      "steps": ["Step 1", "Step 2", "Step 3", "Step 4"],
      "outcome": "What the user achieves"
    }
  ],
  "features": [
    {
      "name": "Feature name",
      "description": "1-2 sentence description",
      "priority": "must-have|should-have|nice-to-have",
      "effort": "small|medium|large",
      "milestone": "e.g. MVP / v1.1 / v2.0"
    }
  ],
  "outOfScope": ["thing explicitly out of scope 1", "thing 2", "thing 3"],
  "successMetrics": ["Specific measurable metric 1", "metric 2", "metric 3", "metric 4"],
  "risks": [
    {
      "risk": "Risk description",
      "likelihood": "high|medium|low",
      "impact": "high|medium|low",
      "mitigation": "Specific mitigation strategy"
    }
  ],
  "technicalConsiderations": "2-3 sentences on key technical decisions, integration points, scalability, or architecture considerations relevant to this product.",
  "goToMarket": "2-3 sentences on launch strategy, distribution channels, and initial traction approach.",
  "openQuestions": ["Question that needs answering before building 1", "question 2", "question 3"]
}

Generate 2-3 personas, 3-4 use cases, 6-8 features, 3-5 out-of-scope items, 4-5 success metrics, 3-4 risks, 3-4 open questions. Features must be grounded in the core features described. Personas must reflect the target audience given.`
}
