# Build Guide

This project supports two build targets:

## Build Targets

### Web Build (Landing Page)
- **Purpose**: Marketing/landing page for the paid app
- **Features**: No tool access, only "Get the app" CTAs
- **Build Command**: `npm run build:web`
- **Output**: `dist/web/`

### App Build (Full Functionality)
- **Purpose**: The actual paid app with all features
- **Features**: Full tool access (users paid to download)
- **Build Command**: `npm run build:app`
- **Output**: `dist/app/`

## Development

### Run Web Build Locally
```bash
npm run dev:web
```

### Run App Build Locally
```bash
npm run dev:app
```

### Default Development
```bash
npm run dev
```
Defaults to web build.

## Building for Production

### Build Web (Landing Page)
```bash
npm run build:web
```

### Build App (Full Functionality)
```bash
npm run build:app
```

## How It Works

The build target is controlled by the `BUILD_TARGET` environment variable:
- `web` = Landing page only (no tool access)
- `app` = Full app (all features enabled)

The `src/config/env.ts` file reads this variable and exports:
- `IS_WEB_BUILD` - true for web builds
- `IS_APP_BUILD` - true for app builds

Components check these flags to conditionally render:
- Web builds show "Get the app" messages
- App builds show full functionality

## Usage Limits

- **Web builds**: Always locked (no tool access)
- **App builds**: Always unlocked (users paid to download)

The `isUnlocked()` function in `src/app/core/usageLimits.ts` automatically returns:
- `false` for web builds
- `true` for app builds (with TODO for Play Store purchase verification)

