/**
 * Paywall controls (DISABLED for development/testing).
 *
 * We keep the same function signatures so the UI/components don't need to change,
 * but we intentionally allow unlimited use while you complete development and QA.
 */

type UsageRecord = {
  used: number;
  resetAt: number; // epoch ms
};

const STORAGE_PREFIX = 'cyberstition_usage_';
const USAGE_EVENT = 'cyberstition:usage';

// Free runs per tool per day (UTC). Adjust to taste.
const DEFAULT_LIMIT = 5;
const LIMITS: Record<string, number> = {
  ai_profile_verifier: 5,
  ai_image_analyzer: 5,
  ai_email_analyzer: 5,
  ai_message_detector: 5,
};

function isProOverrideEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('pro') === '1';
}

function getLimit(productId: string): number {
  return LIMITS[productId] ?? DEFAULT_LIMIT;
}

function getNextUtcMidnightMs(now = new Date()): number {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  return d.getTime();
}

function loadRecord(productId: string): UsageRecord {
  const key = STORAGE_PREFIX + productId;
  const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
  if (!raw) {
    return { used: 0, resetAt: getNextUtcMidnightMs() };
  }
  try {
    const parsed = JSON.parse(raw) as UsageRecord;
    if (typeof parsed.used !== 'number' || typeof parsed.resetAt !== 'number') {
      return { used: 0, resetAt: getNextUtcMidnightMs() };
    }
    return parsed;
  } catch {
    return { used: 0, resetAt: getNextUtcMidnightMs() };
  }
}

function saveRecord(productId: string, record: UsageRecord): void {
  const key = STORAGE_PREFIX + productId;
  window.localStorage.setItem(key, JSON.stringify(record));
  window.dispatchEvent(new CustomEvent(USAGE_EVENT, { detail: { productId } }));
}

function normalizeRecord(productId: string, record: UsageRecord): UsageRecord {
  const nowMs = Date.now();
  if (nowMs >= record.resetAt) {
    return { used: 0, resetAt: getNextUtcMidnightMs(new Date(nowMs)) };
  }
  return record;
}

export function getUsageStatus(productId: string): {
  productId: string;
  limit: number;
  used: number;
  remaining: number;
  locked: boolean;
  resetAt: number;
} {
  // Paywall disabled: always unlocked.
  const limit = getLimit(productId);
  return {
    productId,
    limit,
    used: 0,
    remaining: limit,
    locked: false,
    resetAt: getNextUtcMidnightMs(),
  };
}

/**
 * Consume one free run for a tool.
 *
 * Returns true if a free run was consumed.
 * Returns false if the tool is already paywalled.
 */
export function consumeFreeUse(productId: string): boolean {
  // Paywall disabled: allow unlimited use.
  void productId;
  return true;
}

/**
 * Allow UI components to reactively update when usage changes.
 */
export function subscribeToUsageChanges(handler: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const listener = () => handler();
  window.addEventListener(USAGE_EVENT, listener as EventListener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(USAGE_EVENT, listener as EventListener);
    window.removeEventListener('storage', listener);
  };
}
