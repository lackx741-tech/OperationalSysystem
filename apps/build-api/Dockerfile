FROM node:22-alpine
WORKDIR /app
COPY package*.json tsconfig.base.json ./
COPY apps/build-api ./apps/build-api
RUN npm install --include-workspace-root --workspace @operational/build-api
EXPOSE 4000
CMD ["npm", "run", "dev", "--workspace", "@operational/build-api"]
