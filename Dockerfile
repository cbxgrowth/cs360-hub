# Multi-stage build para CS360 Hub
# Estágio 1: Build
FROM node:18-alpine AS builder

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Configurar diretório de trabalho
WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY bun.lockb* ./

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Copiar código fonte
COPY . .

# Build da aplicação
ENV NODE_ENV=production
RUN npm run build

# Estágio 2: Produção com Nginx
FROM nginx:alpine AS production

# Instalar certificados SSL atualizados
RUN apk add --no-cache ca-certificates

# Copiar configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos buildados do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Configurar permissões
RUN chown -R nextjs:nodejs /usr/share/nginx/html && \
    chown -R nextjs:nodejs /var/cache/nginx && \
    chown -R nextjs:nodejs /var/log/nginx && \
    chown -R nextjs:nodejs /etc/nginx/conf.d

# Criar diretório para PID do nginx
RUN mkdir -p /var/run/nginx && \
    chown -R nextjs:nodejs /var/run/nginx

# Modificar configuração do nginx para rodar como usuário não-root
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf && \
    sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
    sed -i.bak 's/listen\(.*\)443 ssl http2;/listen 8443 ssl http2;/' /etc/nginx/conf.d/default.conf

# Configurar nginx para rodar em modo não-privilegiado
RUN echo "pid /var/run/nginx/nginx.pid;" >> /etc/nginx/nginx.conf

# Mudar para usuário não-root
USER nextjs

# Expor porta (não-privilegiada)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

