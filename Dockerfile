# ============================================================
# Stage 1: Build the app sequentially with memory limits
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (cached layer)
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Sequential build — each step runs alone so peak memory stays low.
# NODE_OPTIONS caps each subprocess to ~750 MB to survive on small VPS.
RUN export NODE_OPTIONS="--max-old-space-size=750" && \
    npx tsc --noEmit 2>&1

RUN export NODE_OPTIONS="--max-old-space-size=750" && \
    npx vite build

# ============================================================
# Stage 2: Serve with a tiny nginx image
# ============================================================
FROM nginx:1.27-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]