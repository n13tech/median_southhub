# Базовый образ
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ================================
# Этап 1: зависимости для DEV
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ================================
# Этап 2: сборка PROD
FROM base AS builder

COPY .env.production .env.production

RUN npm ci
COPY . .
RUN npm run build

# ================================
# Этап 3: production-сервер
FROM node:20-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]