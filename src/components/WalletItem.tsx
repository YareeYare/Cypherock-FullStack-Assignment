import styled from 'styled-components';
import Bitcoin from '../assets/bitcoin.svg';
import Trash from '../assets/trash.svg';

const WalletItemContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 7vw;
	background-color: #1e2026;
	border-radius: 0.3vw;
	align-items: center;
	padding: 1.4vh 0 1.1vh 2vw;
	margin-top: 1.428vh;
	background: #161C23;
`;

const Coin = styled.div`
	display: flex;
	align-items: center;
`;

const LogoBox = styled.div`
	background: #403D3A;
	border-radius: 100%;
	padding: 0.73vw 0.9vw;
	margin-right: 0.411vw;
	display: flex;
	justify-content: center;
	align-items: center;
`

const CoinName = styled.h3`
	font-size: 1.2vw;
	font-weight: 700;
	margin: 0;
	color: #ADABAA;
`

const Holdings = styled.h3`
	margin: 0;
	font-size: 1.2vw;
	font-weight: 500;
	color: #ADABAA;
`

const Actions = styled.img`
	width: '1.8vw'
`

interface WalletItemProps {
	wallet: {
		id?: string;
		name: string;
		balance: number;
	};
}

const WalletItem = ({ wallet }: WalletItemProps) => {
	return (
		<WalletItemContainer>
			<Coin>
				<LogoBox>
					<img src={Bitcoin} alt='bitcoin' style={{ width: '1.211vw' }} />
				</LogoBox>
				<CoinName>
					BITCOIN
				</CoinName>
			</Coin>
			<Holdings>BTC {wallet.balance}</Holdings>
			<Actions src={Trash} alt='trash'/>
		</WalletItemContainer>
	);
};

export default WalletItem;
