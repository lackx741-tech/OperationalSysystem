export interface ContractAction {
  id: string;
  name: string;
  method: string;
  requiresWallet: boolean;
}
