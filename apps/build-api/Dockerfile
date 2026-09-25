FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install --include-workspace-root --workspace @operational/build-api
EXPOSE 4000
CMD ["npm", "run", "dev", "--workspace", "@operational/build-api"]
