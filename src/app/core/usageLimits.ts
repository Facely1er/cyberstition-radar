/**
 * Usage limits enforcement
 * For web builds: Always locked (landing page only)
 * For app builds: Always unlocked (users paid to download)
 */

import { IS_APP_BUILD, IS_WEB_BUILD } from '../../config/env';

type UsageRecord = {
  used: number;
  resetAt: number; // epoch ms
  toolId: string;
};

const STORAGE_PREFIX = 'cyberstition_usage_';
const UNLOCK_KEY = 'cyberstition_unlocked';
const USAGE_EVENT = 'cyberstition:usage';

// Tool IDs mapping
export const TOOL_IDS = {
  MESSAGES: 'ai_message_detector',
  PROFILES: 'ai_profile_verifier',
  IMAGES: 'ai_image_analyzer',
  EMAIL: 'ai_email_analyzer',
} as const;

/**
 * Check if user has unlocked premium access
 * Web builds: Always locked (landing page only)
 * App builds: Always unlocked (users paid to download)
 */
export function isUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Web builds are always locked - no tool access
  if (IS_WEB_BUILD) {
    return false;
  }
  
  // App builds are always unlocked - users paid to download
  if (IS_APP_BUILD) {
    // TODO: In production, verify Play Store purchase status here
    return true;
  }
  
  // Fallback: check localStorage (for development/testing)
  const unlocked = window.localStorage.getItem(UNLOCK_KEY);
  return unlocked === 'true';
}

/**
 * Set unlock status (called after successful purchase)
 */
export function setUnlocked(unlocked: boolean): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(UNLOCK_KEY, unlocked ? 'true' : 'false');
  window.dispatchEvent(new CustomEvent(USAGE_EVENT));
}

/**
 * Get next midnight in local time (24h from last reset)
 */
function getNextMidnightMs(now = new Date()): number {
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.getTime();
}

/**
 * Load usage record for a tool
 */
function loadRecord(toolId: string): UsageRecord {
  const key = STORAGE_PREFIX + toolId;
  const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
  
  if (!raw) {
    return { used: 0, resetAt: getNextMidnightMs(), toolId };
  }
  
  try {
    const parsed = JSON.parse(raw) as UsageRecord;
    if (typeof parsed.used !== 'number' || typeof parsed.resetAt !== 'number') {
      return { used: 0, resetAt: getNextMidnightMs(), toolId };
    }
    return { ...parsed, toolId };
  } catch {
    return { used: 0, resetAt: getNextMidnightMs(), toolId };
  }
}

/**
 * Save usage record
 */
function saveRecord(record: UsageRecord): void {
  const key = STORAGE_PREFIX + record.toolId;
  window.localStorage.setItem(key, JSON.stringify(record));
  window.dispatchEvent(new CustomEvent(USAGE_EVENT, { detail: { toolId: record.toolId } }));
}

/**
 * Normalize record (reset if past reset time)
 */
function normalizeRecord(record: UsageRecord): UsageRecord {
  const nowMs = Date.now();
  if (nowMs >= record.resetAt) {
    return { used: 0, resetAt: getNextMidnightMs(new Date(nowMs)), toolId: record.toolId };
  }
  return record;
}

/**
 * Get usage status for a tool
 * Web builds: Always locked
 * App builds: Always unlocked
 */
export function getUsageStatus(toolId: string): {
  toolId: string;
  used: number;
  remaining: number;
  limitReached: boolean;
  resetAt: number;
  isUnlocked: boolean;
} {
  const unlocked = isUnlocked();
  
  // App builds are always unlocked
  if (unlocked) {
    return {
      toolId,
      used: 0,
      remaining: Infinity,
      limitReached: false,
      resetAt: getNextMidnightMs(),
      isUnlocked: true,
    };
  }

  // Web builds are always locked (no tool access)
  return {
    toolId,
    used: 0,
    remaining: 0,
    limitReached: true,
    resetAt: getNextMidnightMs(),
    isUnlocked: false,
  };
}

/**
 * Check if tool can be used
 * Web builds: Always false (no tool access)
 * App builds: Always true (users paid to download)
 */
export function canUseTool(toolId: string): boolean {
  return isUnlocked();
}

/**
 * Consume one free use for a tool
 * Returns true if allowed, false if limit reached
 */
export function consumeFreeUse(toolId: string): boolean {
  if (isUnlocked()) {
    return true; // Unlimited for unlocked users
  }

  const status = getUsageStatus(toolId);
  if (status.limitReached) {
    return false;
  }

  const record = normalizeRecord(loadRecord(toolId));
  record.used += 1;
  saveRecord(record);
  
  return true;
}

/**
 * Subscribe to usage changes (for reactive UI updates)
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

