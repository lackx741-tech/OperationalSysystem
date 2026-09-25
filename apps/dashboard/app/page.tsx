const phases = [
  {
    title: "Phase 1",
    items: ["Monorepo", "Database", "Project schema", "API", "Docker environment"]
  },
  {
    title: "Phase 2",
    items: ["Wizard shell", "Step navigation", "Draft persistence"]
  },
  {
    title: "Phase 3",
    items: ["Project selector", "Template system", "Preview system"]
  }
];

const workspaces = [
  "apps/dashboard",
  "apps/build-api",
  "apps/worker",
  "packages/project-schema",
  "packages/template-engine",
  "packages/modal-engine",
  "packages/wallet-runtime",
  "packages/evm-adapter",
  "packages/solana-adapter",
  "packages/tron-adapter",
  "packages/contract-runtime",
  "packages/build-engine",
  "packages/deployment-engine",
  "packages/shared-ui"
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12">
      <section className="rounded-[2rem] border border-border bg-card/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="mb-6 inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
          Multichain DApp Builder Scaffold
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-muted">Operational System</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Monorepo foundation for the dashboard, build API, worker, and shared runtime packages.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
              This scaffold sets up the workspace layout, dark dashboard shell, TypeScript packages,
              environment template, and container topology required to start implementing the wizard.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-border bg-background/70 p-5">
            <p className="text-sm font-medium text-accent">Next implementation targets</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>Define the canonical project configuration schema.</li>
              <li>Build the explicit 5-step wizard state machine.</li>
              <li>Implement real project, build, deployment, and domain routes.</li>
              <li>Wire Redis, PostgreSQL, and worker-driven builds.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-border bg-card/90 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Workspace layout</h2>
            <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted">
              {workspaces.length} packages/apps
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {workspaces.map((workspace) => (
              <div key={workspace} className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-muted">
                <span className="font-mono text-foreground">{workspace}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-border bg-card/90 p-6">
          <h2 className="text-xl font-semibold">Phase-ready roadmap</h2>
          <div className="space-y-4">
            {phases.map((phase) => (
              <section key={phase.title} className="rounded-2xl border border-border bg-background/60 p-4">
                <h3 className="text-base font-medium text-accent">{phase.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
