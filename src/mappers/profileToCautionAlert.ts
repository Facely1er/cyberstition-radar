export function mapProfileAnalysisToAlert(
  analysis: { riskScore: number; issues?: string[] },
  _meta?: any
) {
  const severity = analysis.riskScore >= 60 ? 'high' : analysis.riskScore >= 35 ? 'medium' : 'low';
  return {
    title: 'Profile authenticity indicators',
    severity,
    message: (analysis.issues || []).join(' ')
  } as const;
}
