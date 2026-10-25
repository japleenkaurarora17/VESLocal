# ==========================================
# Backend Production Dockerfile for VESLocal
# ==========================================

FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root system user for security
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

# Copy package manifests
COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm ci --omit=dev || npm install --omit=dev

# Copy application source code
COPY config ./config
COPY models ./models
COPY middleware ./middleware
COPY routes ./routes
COPY server.js ./

# Assign non-root ownership
RUN chown -R nodeuser:nodegroup /app

USER nodeuser

ENV PORT=5000 \
    NODE_ENV=production

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
