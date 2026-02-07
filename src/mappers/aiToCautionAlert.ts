export function mapAIRiskToAlert(
  risk: { riskScore: number; reasons: string[]; isPotentialThreat: boolean },
  _meta?: any,
  _source?: string
) {
  const severity = risk.riskScore >= 70 ? 'high' : risk.riskScore >= 45 ? 'medium' : 'low';
  return {
    title: 'Message indicators detected',
    severity,
    message: risk.reasons.join(' ')
  } as const;
}
