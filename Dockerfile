FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs && adduser -S express -u 1001
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY server.js ./
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:3000/health || exit 1
USER express
CMD ["node", "server.js"]
