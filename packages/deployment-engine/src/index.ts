export type DeploymentStatus = "queued" | "deploying" | "live" | "failed";

export interface DeploymentRecord {
  projectId: string;
  buildId: string;
  hostname: string;
  status: DeploymentStatus;
}
