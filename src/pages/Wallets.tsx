import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { importWallet, setStatus, processSyncQueue } from '../store/walletSlice';
import WalletItem from '../components/WalletItem';
import ImportWalletModal from '../components/ImportWalletModal';
import { AppDispatch, RootState } from '../store/store';

const WalletListContainer = styled.div`
	padding: 0px;
	margin: 0 3.8vw;
	width: 100vw;
	display: flex;
	flex-direction: column;
`;

const ImportButton = styled.button`
	background-color: #f0b90b;
	border: none;
	padding: 1.428vh 1.6vw;
	margin-top: 10.642vh;
	margin-left: 57.6vw;
	margin-bottom: 8.285vh;
	cursor: pointer;
	display: flex;
	align-items: center;
	font-size: 0.9vw;
	font-weight: 600;
	background: #191E26;
	color: #BEB4A8;
	border-radius: 0.5vw;

`;

const ImportLogo = styled.div`
	border-radius: 100%;
	background: #85633E;
	margin-right: 0.5vw;
	height: 1.7vw;
	width: 1.7vw;
	display: flex;
	justify-content: center;
	align-items: center;

	font-family: Avenir;
	font-size: 1.2vw;
`

const TotalCoins = styled.div`
	padding-left: 3.2vw;
	padding-bottom: 0.714vh;
	border-bottom: 0.2vh solid #1A1F26;
	font-size: 1.2vw;
	font-weight: 600;
	color: #ADABAA;
`

const Table = styled.div`

`

const TableHeader = styled.div`
	display: grid;
  	grid-template-columns: 1fr 1fr 7vw;
	padding-top: 3.142vh;
	padding-bottom: 0.4285vh;
	padding-left: 2vw;
`

const ColumnName = styled.div`
	font-size: 1.2vw;
	font-weight: 500;
	color: #474848;
`

const TableContent = styled.div`

`

const WalletList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const wallets = useSelector((state: RootState) => state.wallet.wallets);

	const handleImport = async (name: string, mnemonic: string) => {
		const newWallet = {
			id: Date.now().toString(),
			name,
			mnemonic,
		};
		dispatch(importWallet({ id: newWallet.id, name: newWallet.name, mnemonic: newWallet.mnemonic }))
			.then(() => {
				dispatch(setStatus('syncing'));
			})
			.then(() => {
				dispatch(processSyncQueue())
			})
	};

	return (
		<WalletListContainer>
			<ImportButton onClick={() => setIsModalOpen(true)}>
				<ImportLogo>
					+
				</ImportLogo>
				IMPORT WALLET
			</ImportButton>
			<TotalCoins>
				Total Coins - {wallets.length}
			</TotalCoins>
			<Table>
				<TableHeader>
					<ColumnName>Coin</ColumnName>
					<ColumnName>Holdings</ColumnName>
					<ColumnName>Actions</ColumnName>
				</TableHeader>
				<TableContent>
					{wallets?.map((wallet,index) => (
						<WalletItem key={index} wallet={wallet} />
					))}
				</TableContent>
			</Table>
			
			<ImportWalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onImport={handleImport} />
		</WalletListContainer>
	);
};

export default WalletList;