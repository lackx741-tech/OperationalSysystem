FROM node:22-alpine
WORKDIR /app
COPY package*.json tsconfig.base.json ./
COPY apps/worker ./apps/worker
RUN npm install --include-workspace-root --workspace @operational/worker
CMD ["npm", "run", "dev", "--workspace", "@operational/worker"]
