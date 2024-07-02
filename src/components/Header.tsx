import spinner from '../assets/spinner.svg';
import logo_up from '../assets//csync_logo_up.svg';
import cySyncLogo from '../assets//csync_logo.svg';

import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { addSyncItem } from '../store/syncQueueSlice';

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
	text-align: center;
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
	const dispatch = useDispatch();
	const isSyncing = useSelector((state: RootState) => state.syncQueue.isSyncing);
	const wallets = useSelector((state: RootState) => state.wallet.wallets);

	const handleResync = () => {
		wallets.forEach(wallet => {
			dispatch(addSyncItem({ id: Date.now().toString(), type: 'balance', walletId: wallet.id }));
			dispatch(addSyncItem({ id: (Date.now() + 1).toString(), type: 'history', walletId: wallet.id }));
		});
	};

	return (
		<HeaderContainer>
			<Logo_Name>
				<Logo src={cySyncLogo} alt='logo' />
					{/* <img src={logo_down} alt='logo_down' style={{ width: '1.89vw' }} />
					<img src={logo_up} alt='logo_up' style={{ width: '1.89vw' }} /> */}
				<Name>
					cySync
				</Name>
			</Logo_Name>
			<ResyncButton onClick={handleResync}>
				<SyncStatus>  {/*isSyncing*/}
					Synced
				</SyncStatus>
				<img src={spinner} alt='spinner' style={{ marginLeft: '0.8vw', width: '1.108vw' }} />
			</ResyncButton>
		</HeaderContainer>
	);
};

export default Header;