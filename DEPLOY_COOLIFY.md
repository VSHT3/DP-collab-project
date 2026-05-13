# Coolify VPS Deployment Guide
# ===============================
# Prerequisites:
#   - Coolify installed on your VPS (https://coolify.io/docs)
#   - A git remote (GitHub / GitLab / self-hosted) connected to Coolify
#   - Port 80 (or your chosen port) open on the VPS firewall

# ──────────────────────────────────────────
# STEP 1 — Push these files to your repo
# ──────────────────────────────────────────
# Make sure the repo contains:
#   Dockerfile          ← multi-stage, memory-safe build
#   nginx.conf          ← SPA-friendly nginx config
#   package.json
#   vite.config.ts
#   src/  index.html  tailwind.config.js  postcss.config.js  …

# ──────────────────────────────────────────
# STEP 2 — Create the project in Coolify
# ──────────────────────────────────────────
# 1. Open Coolify dashboard → "New Project"
# 2. Connect your Git provider (GitHub / GitLab / Gitea)
# 3. Select this repository

# ──────────────────────────────────────────
# STEP 3 — Configure the Docker deployment
# ──────────────────────────────────────────
# In Coolify:
#   Deployment type : Docker (or Docker Compose if you prefer)
#   Build pack      : Dockerfile
#   Build command   : (leave blank — Dockerfile handles everything)
#   Start command   : (leave blank — CMD in Dockerfile handles it)
#
# Optional environment variables:
#   PORT  = 80   (or whatever port you want nginx to listen on)

# ──────────────────────────────────────────
# STEP 4 — Set the port & domain
# ──────────────────────────────────────────
# In Coolify → Settings for this service:
#   - Expose port 80 (or map to 8080 / 443 as you like)
#   - Add a custom domain if you have one (Coolify can auto-provision
#     Let's Encrypt SSL for you)

# ──────────────────────────────────────────
# STEP 5 — Deploy
# ──────────────────────────────────────────
# Click "Deploy" in Coolify.
# Coolify will:
#   1. Clone the repo
#   2. Run `docker build` using the Dockerfile
#   3. Push/run the container with nginx serving the static build/
#
# The sequential build (tsc first, then vite build) + NODE_OPTIONS
# memory cap prevents OOM crashes on small VPS instances.

# ──────────────────────────────────────────
# Troubleshooting
# ──────────────────────────────────────────
# - If the build still OOM-kills, lower the value:
#     --max-old-space-size=512
# - To watch build logs:
#     Coolify → Service → Logs tab
# - To rebuild manually via SSH:
#     docker compose up --build -d
# - If fonts don't load, make sure the Google Fonts <link> in
#   index.html can reach the internet from the VPS (outbound HTTPS).