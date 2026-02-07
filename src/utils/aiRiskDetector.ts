export function analyzeMessageForPhishingRisk(text: string) {
  const t = (text || '').toLowerCase();
  const reasons: string[] = [];
  let score = 0;

  const hasLink = /https?:\/\//.test(t) || /\b(bit\.ly|tinyurl\.com|t\.co)\b/.test(t);
  const urgency = /(urgent|immediately|asap|act now|final notice|expires|last chance)/.test(t);
  const reward = /(gift|free|won|winner|prize|refund|bonus)/.test(t);
  const credential = /(password|verify your account|login|security check|2fa|code)/.test(t);
  const impersonation = /(support|customer service|security team|bank|paypal|microsoft|apple|google)/.test(t);

  if (hasLink) { score += 25; reasons.push('Contains a link or short URL.'); }
  if (urgency) { score += 20; reasons.push('Uses urgency or time pressure.'); }
  if (reward) { score += 15; reasons.push('Promises a reward or benefit.'); }
  if (credential) { score += 25; reasons.push('Requests credentials or verification.'); }
  if (impersonation) { score += 15; reasons.push('Mentions a brand/service in a way often used for impersonation.'); }

  // Light “AI-generated style” heuristic: very generic + formal + no specifics
  const generic = /(dear customer|valued user|kindly|we noticed unusual activity|account will be suspended)/.test(t);
  if (generic) { score += 10; reasons.push('Generic phrasing commonly used in mass-generated messages.'); }

  score = Math.min(100, score);
  const isPotentialThreat = score >= 45;

  return { riskScore: score, reasons, isPotentialThreat };
}
