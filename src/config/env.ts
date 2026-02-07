/**
 * Environment configuration for build targets
 * Determines if this is a web build (landing page) or app build (full functionality)
 */

export const BUILD_TARGET = import.meta.env.VITE_BUILD_TARGET || 'web';
export const IS_WEB_BUILD = BUILD_TARGET === 'web';
export const IS_APP_BUILD = BUILD_TARGET === 'app';

