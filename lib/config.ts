export const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? 'https://atulsharma.vercel.app'

export const PRODUCT_TYPES = ['Web App', 'Mobile App', 'API / Platform', 'Internal Tool', 'SaaS Product', 'Browser Extension', 'CLI Tool', 'Other']
export const STAGES = ['Idea / Concept', 'MVP', 'Beta', 'Growth / Scale', 'Enterprise']

export const EXAMPLE_INPUT = {
  productName: 'TeamPulse',
  productType: 'SaaS Product',
  stage: 'MVP',
  targetAudience: 'Engineering managers and Scrum Masters at mid-size tech companies (50–500 employees)',
  problemStatement: 'Engineering teams lack a single place to track team health, sprint velocity trends, and blocker patterns over time. Managers rely on spreadsheets and memory to spot issues, leading to late intervention and recurring problems that never get fixed.',
  proposedSolution: 'A lightweight SaaS dashboard that aggregates data from Jira, GitHub, and retro tools to surface team health trends, velocity anomalies, and recurring blockers — with AI-generated coaching suggestions for managers.',
  coreFeatures: `- Sprint velocity tracking with trend charts (week-over-week, sprint-over-sprint)
- Team health score across 5 dimensions (delivery, collaboration, morale, process, tech quality)
- Blocker pattern detection and frequency tracking
- AI coaching suggestions based on team health signals
- Slack/email digest with weekly team health report
- Integration with Jira for automatic data ingestion`,
  constraints: 'Must integrate with Jira and GitHub in MVP. Mobile responsiveness required. No PII storage — aggregate metrics only. Target < $30/seat/month pricing.',
  successMetrics: 'Teams using the tool reduce recurring blockers by 30% within 3 sprints. Manager NPS > 50. 80% of trial users convert to paid within 30 days.',
}
