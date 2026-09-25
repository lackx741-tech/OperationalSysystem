export interface TemplateManifest {
  id: string;
  name: string;
  description: string;
  supportedNetworks: Array<"evm" | "solana" | "tron">;
  version: string;
  entry: string;
  thumbnail: string;
}

export function createTemplateCatalog(manifests: TemplateManifest[]) {
  return manifests;
}
