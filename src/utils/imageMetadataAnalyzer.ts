export async function analyzeImageMetadata(file: File) {
  // v1: local-only, lightweight signals. No EXIF parsing dependency.
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 0;

  const name = (file.name || '').toLowerCase();
  const type = file.type || 'unknown';

  // Basic metadata we can reliably provide without external libs.
  const metadata: {
    hasExif: boolean;
    dimensions?: { width: number; height: number };
    format?: string;
    fileSize?: number;
    device?: string;
    software?: string;
  } = {
    hasExif: false,
    format: type,
    fileSize: file.size
  };

  // Dimensions via Image decode (browser API)
  try {
    const url = URL.createObjectURL(file);
    const img = new Image();
    const dims = await new Promise<{ w: number; h: number }>((resolve, reject) => {
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => reject(new Error('Unable to decode image'));
      img.src = url;
    });
    URL.revokeObjectURL(url);
    metadata.dimensions = { width: dims.w, height: dims.h };
  } catch {
    // ignore
  }

  // Heuristics
  if (!/image\/(jpeg|png|webp)/.test(type)) {
    score += 10;
    issues.push('Uncommon image type (could be normal; still worth caution).');
  }

  if (file.size > 8 * 1024 * 1024) {
    score += 10;
    issues.push('Large file size compared to typical shared images.');
  }

  if (/(screenshot|download|image\d+|img_\d+)/.test(name)) {
    score += 5;
    issues.push('Filename looks generic (common for downloaded or reused images).');
  }

  // We do not claim “metadata missing == manipulation”. Provide an educational issue if we can't infer EXIF.
  issues.push('This tool does not prove authenticity. Missing metadata is not proof of manipulation.');

  score = Math.min(100, score);
  const isSuspicious = score >= 35;

  recommendations.push('If the image matters (money, safety, reputation), verify via the original source.');
  recommendations.push('Look for visual inconsistencies: lighting, edges around objects, and unnatural symmetry.');
  recommendations.push('Be cautious with images that trigger urgency or requests for payment/credentials.');

  return {
    riskScore: score,
    isSuspicious,
    issues,
    metadata,
    recommendations
  };
}

export function getImageRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 45) return 'high';
  if (score >= 20) return 'medium';
  return 'low';
}
