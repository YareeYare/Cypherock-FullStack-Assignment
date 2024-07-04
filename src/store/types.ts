export interface Wallet {
	name: string;
	mnemonic: string;
	balance: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	transactions: any[];
}

export interface WalletState {
	wallets: Wallet[];
	isSyncing: boolean;
}
