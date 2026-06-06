# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace manifests first for better layer caching
COPY package*.json ./
COPY turbo.json ./
COPY packages/charts/package*.json ./packages/charts/
COPY packages/ui/package*.json ./packages/ui/
COPY apps/dashboard/package*.json ./apps/dashboard/

RUN npm ci

# Copy source and build
COPY .storybook/ ./.storybook/
COPY packages/ ./packages/
COPY apps/ ./apps/
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=builder /app/apps/dashboard/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
