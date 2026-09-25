import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 4000);

const routes = [
  "POST /api/projects",
  "GET /api/projects/:id",
  "PATCH /api/projects/:id",
  "DELETE /api/projects/:id",
  "POST /api/projects/:id/build",
  "GET /api/builds/:id",
  "GET /api/builds/:id/download",
  "GET /api/builds/:id/javascript",
  "POST /api/projects/:id/deploy",
  "GET /api/projects/:id/deployments",
  "POST /api/projects/:id/domain",
  "GET /api/projects/:id/preview"
] as const;

const server = createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ status: "ok", service: "build-api", routes }));
    return;
  }

  response.writeHead(404, { "content-type": "application/json" });
  response.end(
    JSON.stringify({
      code: "NOT_FOUND",
      message: "Scaffolded API server is running. Implement the requested route handlers next."
    })
  );
});

server.listen(port, () => {
  console.log(`build-api listening on http://0.0.0.0:${port}`);
});
