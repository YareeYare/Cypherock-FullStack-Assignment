import spinner from '../assets/spinner.svg';
import cySyncLogo from '../assets//csync_logo.svg';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setStatus, fetchBalance, fetchTransactions, addSyncItem, clearSyncQueue } from '../store/walletSlice';


const HeaderContainer = styled.header`
	background-color: #0A1018;
	padding: 1.7vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: screen;
	height: 3.2857vh;
	border-bottom: 0.2vh solid #1A1F26;
`;

const Logo_Name = styled.div`
	display: flex;
	margin-left: 1.2vw;
`;

const Logo = styled.img`
	width: '1.89vw'
`;

const Name = styled.h1`
	color: #FFFFFF;
	margin: 0;
	margin-left: 0.9vw;
	font-family: Avenir;
	font-size: 1.5vw;
	font-weight: 800;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SyncStatus = styled.h1`
	color: #E0B36A;
	font-size: 1.7vw;
	font-weight: 400;
	text-align: left;
`;

const ResyncButton = styled.button`
	background-color: #0A1018;
	color: ${props => props.theme.colors.primary};
	margin-right: 2.3vw;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 0;
`;

const Header = () => {
	const dispatch = useDispatch<AppDispatch>();
	const status = useSelector((state: RootState) => state.wallet.status);
	const syncQueue = useSelector((state: RootState) => state.wallet.syncQueue);
	const wallets = useSelector((state: RootState) => state.wallet.wallets);

	const processQueue = async () => {
		let localQueue = [...syncQueue]; // Create a local copy of the syncQueue
		while (localQueue.length > 0) {
			const item = localQueue.shift();
			if (!item) continue;
			try {
				if (item.type === 'balance') {
					await dispatch(fetchBalance(item.address!));
				} else if (item.type === 'transactions') {
					await dispatch(fetchTransactions(item.address!));
				}
				await new Promise((resolve) => setTimeout(resolve, 200));
			} catch (error) {
				console.error(`Failed to sync ${item.type} for ${item.address}:`, error);
			}
		}
		dispatch(setStatus('synced'));
		dispatch(clearSyncQueue()); // Clear the sync queue
	};

	useEffect(() => {
		if (status === 'syncing') {
			processQueue();
		}
	}, [status]);

	const handleResync = () => {
		wallets.forEach(wallet => {
			dispatch(addSyncItem({ address: wallet.address, type: 'balance' }));
			dispatch(addSyncItem({ address: wallet.address, type: 'transactions' }));
		});
		dispatch(setStatus('syncing'));
	};

	return (
		<HeaderContainer>
			<Logo_Name>
				<Logo src={cySyncLogo} alt='logo' />
				<Name>
					cySync
				</Name>
			</Logo_Name>
			<ResyncButton onClick={handleResync}>
				<SyncStatus>
					{status!=='synced' ? 'Syncing' : 'Synced'}
				</SyncStatus>
				<img src={spinner} alt='spinner' style={{ marginLeft: '0.8vw', width: '1.108vw' }} />
			</ResyncButton>
		</HeaderContainer>
	);
};

export default Header;