import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as ecc from 'tiny-secp256k1';
import { RootState } from './store';

const API_KEY = import.meta.env.VITE_BLOCKCYPHER_API_KEY
const BASE_URL = `https://api.blockcypher.com/v1/btc/test3`;

interface Wallet {
	name: string;
	mnemonic: string;
	address: string | undefined;
	balance: number;
}

interface Transaction {
	hash: string;
	total: number;
	dateTime: string; // Time
	walletName: string;
	address: string;
}

interface SyncItem {
  address: string | undefined;
  type: 'balance' | 'transactions';
}

export interface WalletState {
	wallets: Wallet[];
	transactions: Transaction[];
	syncQueue: SyncItem[];
	syncing: boolean;
	status: 'idle' | 'syncing' | 'synced';
}

const initialState: WalletState = {
	wallets: [],
	transactions: [],
	syncQueue: [],
	syncing: false,
	status: 'synced',
};

export const processSyncQueue = createAsyncThunk<void, void, { state: RootState }>(
	'wallets/processSyncQueue',
	async (_, { getState, dispatch }) => {
		const state = getState();
		const queue = state.wallet.syncQueue;

		while (queue.length > 0) {
			const item = queue.shift();
			if (item) {
				try {
					if (item.type === 'balance') {
						await dispatch(fetchBalance(item.address!));
					} else if (item.type === 'transactions') {

						await dispatch(fetchTransactions(item.address!));
					}
					await new Promise((resolve) => setTimeout(resolve, 200)); // Delay of 0.2 seconds
				} catch (error) {
					console.error('Sync item processing failed:', error);
					queue.push(item); // Re-add failed item to the queue
				}
			}
		}
	}
);


interface BalancePayload {
	address: string;
	balance: number; // or string, depending on how the API returns the balance
}

export const fetchBalance: AsyncThunk<BalancePayload, string, object> = createAsyncThunk(
	'wallets/fetchBalance',
	async (address: string) => {
		const response = await axios.get(`${BASE_URL}/addrs/${address}/balance?token=${API_KEY}`);
		return { address, balance: response.data.balance };
	}
);

interface Tx {
	hash: string;
	total: number;
	confirmed: string;
}

export const fetchTransactions: AsyncThunk<Transaction[], string, { state: RootState }> = createAsyncThunk(
	'wallets/fetchTransactions',
	async (address: string,  { getState }) => {
		const state = await getState();
		// @ts-expect-error state is unknown
		const wallet = state.wallet.wallets.find((wallet: Wallet) => wallet.address === address);
		if (!wallet) {
			throw new Error(`Wallet not found for address: ${address}`);
		}
		const response = await axios.get(`${BASE_URL}/addrs/${address}/full?token=${API_KEY}`);
		return response.data.txs.map((tx: Tx) => ({
			hash: tx.hash,
			total: tx.total,
			confirmed: tx.confirmed,
			walletName: wallet?.name || "",
			address: address
		}));
	}
);

interface ImportWalletPayload {
	id: string;
	name: string;
	mnemonic: string;
	address: string | undefined;
	balance: number;
}

interface ImportWalletArgs {
	id: string;
	name: string;
	mnemonic: string;
}

export const importWallet: AsyncThunk<ImportWalletPayload, ImportWalletArgs, { state: RootState }> = createAsyncThunk(
	'wallets/importWallet',
	async ({ id, name, mnemonic }: ImportWalletArgs, { getState, rejectWithValue }) => {
		const seed = await bip39.mnemonicToSeed(mnemonic);
		const network = bitcoin.networks.testnet;
		const bip32Factory = bip32.BIP32Factory(ecc);
		const root = bip32Factory.fromSeed(seed, network);
		const account = root.derivePath("m/44'/1'/0'");
		const node = account.derivePath('0/0');
		const { address } = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network });

		const state = await getState();
		// @ts-expect-error state is unknown
		if (state.wallet.wallets.some((wallet: Wallet) => wallet.address === address)) {
			return rejectWithValue({ message: 'Wallet already exists' });
		}

		return { id, name, mnemonic, address: address || undefined , balance: 0 };
	}
);

interface DeleteWalletPayload {
    address: string;
}

export const deleteWallet = createAsyncThunk<DeleteWalletPayload, string, object>(
	'wallets/deleteWallet',
	async (address: string) => {
		return { address };
	}
);

const walletSlice = createSlice({
	name: 'wallets',
	initialState,
	reducers: {
		addSyncItem: (state, action: PayloadAction<SyncItem>) => {
			state.syncQueue.push(action.payload);
		},
		clearSyncQueue: (state) => {
			state.syncQueue = [];
		},
		setStatus: (state, action: PayloadAction<'idle' | 'syncing' | 'synced'>) => {
			state.status = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(importWallet.fulfilled, (state, action) => {
			state.wallets.push(action.payload);
			state.syncQueue.push({ address: action.payload.address, type: 'balance' });
			state.syncQueue.push({ address: action.payload.address, type: 'transactions' });
		});
		builder.addCase(importWallet.rejected, (_, action) => {
			console.error(action.error);
			alert("Wallet already exists")
		});
		builder.addCase(fetchBalance.fulfilled, (state, action) => {
			const wallet = state.wallets.find((wallet) => wallet.address === action.payload.address);
			if (wallet) {
				wallet.balance = action.payload.balance;
			}
		});
		builder.addCase(fetchTransactions.fulfilled, (state, action) => {
			state.transactions.push(...action.payload);
		});
		builder.addCase(processSyncQueue.fulfilled, (state) => {
			state.status = 'synced';
		})
		builder.addCase(deleteWallet.fulfilled, (state, action) => {
			state.wallets = state.wallets.filter(wallet => wallet.address !== action.payload.address);
			state.transactions = state.transactions.filter(transaction => transaction.address !== action.payload.address);
		});
	},
});

export const { addSyncItem, clearSyncQueue, setStatus } = walletSlice.actions;
export default walletSlice.reducer;