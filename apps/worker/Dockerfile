FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install --include-workspace-root --workspace @operational/worker
CMD ["npm", "run", "dev", "--workspace", "@operational/worker"]
