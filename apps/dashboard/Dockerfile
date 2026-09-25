FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/dashboard ./apps/dashboard
RUN npm install --include-workspace-root --workspace @operational/dashboard
EXPOSE 3000
CMD ["npm", "run", "dev", "--workspace", "@operational/dashboard", "--", "--hostname", "0.0.0.0", "--port", "3000"]
