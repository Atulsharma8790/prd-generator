export interface PRDInput {
  productName: string
  productType: string
  stage: string
  targetAudience: string
  problemStatement: string
  proposedSolution: string
  coreFeatures: string
  constraints: string
  successMetrics: string
}

export interface Persona {
  name: string
  role: string
  goals: string[]
  painPoints: string[]
  quote: string
}

export interface UseCase {
  title: string
  actor: string
  steps: string[]
  outcome: string
}

export interface Feature {
  name: string
  description: string
  priority: 'must-have' | 'should-have' | 'nice-to-have'
  effort: 'small' | 'medium' | 'large'
  milestone: string
}

export interface Risk {
  risk: string
  likelihood: 'high' | 'medium' | 'low'
  impact: 'high' | 'medium' | 'low'
  mitigation: string
}

export interface PRDOutput {
  executiveSummary: string
  problemStatement: string
  targetMarket: string
  personas: Persona[]
  useCases: UseCase[]
  features: Feature[]
  outOfScope: string[]
  successMetrics: string[]
  risks: Risk[]
  technicalConsiderations: string
  goToMarket: string
  openQuestions: string[]
}
