const concurrency = Number(process.env.BUILD_WORKER_CONCURRENCY ?? 4);

console.log(`worker scaffold ready with concurrency ${concurrency}`);
