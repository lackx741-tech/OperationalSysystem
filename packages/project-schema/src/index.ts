export const SCHEMA_VERSION = 1;

export type NetworkFamily = "evm" | "solana" | "tron";
export type ModalStyle = "style-1" | "style-2" | "style-3";
export type ModalTheme = "dark" | "light";
export type IntegrationTarget = "button" | "element" | "manual";

export interface ProjectConfiguration {
  schemaVersion: number;
  project: {
    name: string;
    slug: string;
  };
  network: {
    family: NetworkFamily;
    chainId?: number;
  };
  template: {
    id: string;
  };
  modal: {
    style: ModalStyle;
    theme: ModalTheme;
  };
  integration: {
    target: IntegrationTarget;
    selector?: string;
  };
  actions: string[];
}

export function isProjectConfiguration(value: unknown): value is ProjectConfiguration {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ProjectConfiguration>;
  return candidate.schemaVersion === SCHEMA_VERSION && typeof candidate.project?.name === "string";
}
