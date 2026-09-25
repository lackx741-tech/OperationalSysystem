export const walletEvents = [
  "wallet:opened",
  "wallet:closed",
  "wallet:connecting",
  "wallet:connected",
  "wallet:disconnected",
  "wallet:error",
  "account:changed",
  "chain:changed"
] as const;

export type WalletEvent = (typeof walletEvents)[number];

export interface WalletRuntime {
  open(): void;
  close(): void;
  disconnect(): Promise<void>;
  getAccount(): string | null;
  getChainId(): number | null;
}
