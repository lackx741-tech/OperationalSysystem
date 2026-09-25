export const SCHEMA_VERSION = 1;

export type NetworkFamily = "evm" | "solana" | "tron";
export type ModalStyle = "style-1" | "style-2" | "style-3";
export type ModalTheme = "dark" | "light";
export type IntegrationTarget = "button" | "element" | "manual";
const networkFamilies = ["evm", "solana", "tron"] as const;
const modalStyles = ["style-1", "style-2", "style-3"] as const;
const modalThemes = ["dark", "light"] as const;
const integrationTargets = ["button", "element", "manual"] as const;

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
  return (
    candidate.schemaVersion === SCHEMA_VERSION &&
    typeof candidate.project?.name === "string" &&
    typeof candidate.project.slug === "string" &&
    typeof candidate.template?.id === "string" &&
    typeof candidate.network === "object" &&
    candidate.network !== null &&
    networkFamilies.includes(candidate.network.family as NetworkFamily) &&
    typeof candidate.modal === "object" &&
    candidate.modal !== null &&
    modalStyles.includes(candidate.modal.style as ModalStyle) &&
    modalThemes.includes(candidate.modal.theme as ModalTheme) &&
    typeof candidate.integration === "object" &&
    candidate.integration !== null &&
    integrationTargets.includes(candidate.integration.target as IntegrationTarget) &&
    Array.isArray(candidate.actions) &&
    candidate.actions.every((action) => typeof action === "string")
  );
}
