export function analyzeEmailHeaders(headerText: string) {
  const t = headerText || '';
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 0;

  const hasFrom = /\nfrom:/i.test('\n' + t);
  const hasReplyTo = /\nreply-to:/i.test('\n' + t);
  const hasReturnPath = /\nreturn-path:/i.test('\n' + t);
  const spfFail = /spf=(fail|softfail)/i.test(t);
  const dkimFail = /dkim=(fail|neutral)/i.test(t);
  const dmarcFail = /dmarc=(fail|quarantine|reject)/i.test(t);

  if (!hasFrom) { score += 15; issues.push('Missing From header.'); }
  if (hasReplyTo) { score += 10; issues.push('Reply-To present (can be normal; sometimes used in phishing).'); }
  if (!hasReturnPath) { score += 10; issues.push('Missing Return-Path header.'); }
  if (spfFail) { score += 25; issues.push('SPF indicates fail/softfail.'); }
  if (dkimFail) { score += 20; issues.push('DKIM indicates fail/neutral.'); }
  if (dmarcFail) { score += 25; issues.push('DMARC indicates enforcement (fail/quarantine/reject).'); }

  // suspicious Received chain length
  const receivedCount = (t.match(/\nreceived:/ig) || []).length;
  if (receivedCount >= 8) { score += 10; issues.push('Long Received chain (not proof; could be routing).'); }

  score = Math.min(100, score);
  const isSuspicious = score >= 35;

  // Extract a few human-readable fields (best-effort)
  const fromMatch = t.match(/\nfrom:\s*(.+)/i);
  const replyToMatch = t.match(/\nreply-to:\s*(.+)/i);
  const returnPathMatch = t.match(/\nreturn-path:\s*(.+)/i);

  const headerInfo = {
    from: fromMatch ? fromMatch[1].trim() : undefined,
    replyTo: replyToMatch ? replyToMatch[1].trim() : undefined,
    returnPath: returnPathMatch ? returnPathMatch[1].trim() : undefined,
    spf: spfFail ? 'fail' : /spf=pass/i.test(t) ? 'pass' : undefined,
    dkim: dkimFail ? 'fail' : /dkim=pass/i.test(t) ? 'pass' : undefined,
    dmarc: dmarcFail ? 'fail' : /dmarc=pass/i.test(t) ? 'pass' : undefined
  };

  recommendations.push('Verify the sender via a separate channel (official website/app), not by replying to the email.');
  recommendations.push('Be cautious with links and attachments, especially if the message creates urgency.');
  recommendations.push('If possible, check the visible From name vs the actual domain and alignment results (SPF/DKIM/DMARC).');

  return { riskScore: score, isSuspicious, issues, receivedCount, headerInfo, recommendations };
}

export function getEmailRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 60) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}
