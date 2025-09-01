# --- ESTÁGIO 1: A "FÁBRICA" (BUILDER) ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# --- ESTÁGIO 2: O SERVIDOR FINAL (PRODUÇÃO) ---
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# ADICIONE ESTA LINHA para copiar nossa configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]