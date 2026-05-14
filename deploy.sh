#!/bin/bash
set -e

DEPLOY_DIR="/var/home/vsht/Documents/DP-collab-project"
LOG_FILE="$DEPLOY_DIR/deploy.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=== Deploy started ==="

cd "$DEPLOY_DIR"

# Pull latest
log "Pulling latest changes..."
git pull origin main 2>&1 | tee -a "$LOG_FILE"

# Install deps (in case package.json changed)
log "Installing dependencies..."
npm ci 2>&1 | tee -a "$LOG_FILE"

# Build
log "Running npm run build..."
npm run build 2>&1 | tee -a "$LOG_FILE"

log "=== Deploy finished ==="