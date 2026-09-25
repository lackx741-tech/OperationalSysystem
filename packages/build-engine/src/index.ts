export type BuildStatus = "queued" | "running" | "failed" | "completed";

export interface BuildManifest {
  projectId: string;
  version: string;
  artifactPath: string;
  bundlePath: string;
}
