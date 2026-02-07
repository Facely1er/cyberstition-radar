export function mapEmailAnalysisToAlert(analysis: { riskScore: number; issues?: string[] }, _meta?: any) {
  const severity = analysis.riskScore >= 60 ? 'high' : analysis.riskScore >= 35 ? 'medium' : 'low';
  return {
    title: 'Email header indicators',
    severity,
    message: (analysis.issues || []).join(' ')
  } as const;
}
