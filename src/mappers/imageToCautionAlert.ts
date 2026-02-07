export function mapImageAnalysisToAlert(analysis: { riskScore: number; issues?: string[] }, _meta?: any) {
  const severity = analysis.riskScore >= 45 ? 'high' : analysis.riskScore >= 20 ? 'medium' : 'low';
  return {
    title: 'Image exposure indicators',
    severity,
    message: (analysis.issues || []).join(' ')
  } as const;
}
