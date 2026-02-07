export function analyzeSocialProfile(profile: any) {
  const issues: string[] = [];
  const recommendations: string[] = [];
  const patterns = {
    genericUsername: false,
    emptyBio: false,
    suspiciousRatio: false,
    newAccount: false,
    suspiciousContent: false
  };

  let score = 0;

  const username = String(profile.username || '').trim();
  const bio = String(profile.bio || '').trim();
  const accountAge = String(profile.accountAge || '').trim();
  const postCount = Number(profile.postCount || 0);
  const followerCount = Number(profile.followerCount || 0);
  const followingCount = Number(profile.followingCount || 0);
  const verified = Boolean(profile.verified);

  // Heuristics (indicator-only; no certainty claims)
  if (!username) {
    score += 15;
    issues.push('Username is missing.');
  }

  if (username && /^(user|real|official|support|admin)\d{2,}$/i.test(username)) {
    score += 10;
    patterns.genericUsername = true;
    issues.push('Username looks generic or auto-generated.');
  }

  if (bio.length < 10) {
    score += 10;
    patterns.emptyBio = true;
    issues.push('Bio is very short or generic.');
  }

  if (postCount === 0) {
    score += 20;
    issues.push('No posts/activity visible.');
  }

  if (followerCount > 0 && followingCount === 0) {
    score += 10;
    patterns.suspiciousRatio = true;
    issues.push('Unusual follower/following pattern (following = 0).');
  }

  if (followingCount > 0 && followerCount === 0 && followingCount > 100) {
    score += 10;
    patterns.suspiciousRatio = true;
    issues.push('Account follows many but has zero followers (can be a growth tactic, but worth caution).');
  }

  if (!verified && followerCount > 50000 && postCount < 10) {
    score += 15;
    patterns.suspiciousRatio = true;
    issues.push('High followers with very low activity (could indicate purchased followers).');
  }

  if (/crypto|giveaway|dm me|investment|airdrop|whatsapp/i.test(bio)) {
    score += 15;
    patterns.suspiciousContent = true;
    issues.push('Bio contains phrases commonly used in scam or promo profiles.');
  }

  if (accountAge && /(today|yesterday|new|\b1\s*day\b|\b2\s*days\b)/i.test(accountAge)) {
    score += 10;
    patterns.newAccount = true;
    issues.push('Account appears very new (if the age is accurate).');
  }

  // Verification reduces risk slightly, but is not proof.
  if (verified) {
    score = Math.max(0, score - 10);
  }

  score = Math.min(100, score);
  const isSuspicious = score >= 45;

  // Recommendations
  recommendations.push('Check for consistent history: older posts, real interactions, and authentic engagement.');
  recommendations.push('Avoid moving conversations off-platform (e.g., WhatsApp/Telegram) until authenticity is clear.');
  recommendations.push('Verify identity via a second channel if money, credentials, or sensitive info is requested.');

  return {
    riskScore: score,
    isSuspicious,
    issues,
    patterns,
    recommendations
  };
}

export function getProfileRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 60) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}
