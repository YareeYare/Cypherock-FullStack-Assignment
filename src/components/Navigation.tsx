import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TransactionsLogo from '../assets/transactions.svg';
import WalletLogo from '../assets/wallet.svg';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Nav = styled.div`
	display: flex;
	flex-direction: column;
	background: #161C23;
	bottom: 20px;
	min-width: 19.9vw;
	margin: 2vw 0px 2vw 2vw;
	border-radius: 1vw;
	justify-content: space-between;
`;

const NavLink = styled(Link)`
	color: white;
	text-decoration: none;
	margin: 0;
	display: flex;
	align-items: center;
	&:hover {
		color: #C78D4E;
	}
`;

const Card = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	padding: 2vh 0;
	border-bottom: 1px solid #1E2328;
	margin: 0px 1vw;
	position; fixed;

`;

const LogoBox = styled.div`
	margin-right: 1.32vw;;
	margin-left: 2.7vw;
	background: #1E2328;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	border-radius: 0.3vw;
`;

const Wallet = styled.img`
	width: 1.451vw;
	margin: 0.4vw;
`;

const Title = styled.h3<{ $toColor?: boolean }>`
	font-size: 1.2vw;
	font-weight: 400;
	color: ${props => props.$toColor ? '#C78D4E' : 'white'};
`

const Bar = styled.div<{ $toShow?: boolean }>`
	visibility: ${props => props.$toShow ? 'visible' : 'hidden'};
	height: 4.2vh;
	width: 0.3vw;
	box-shadow: 0px 1px 4px 0px #FFCF5480;
	background: #C0996F;
`
const Support = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2.1428vh 0;
	font-size: 1.4vw;
	font-weight: 400;
	background: #4B3C2B;
	color: #E7DDD2;
	border-radius: 0px 0px 1vw 1vw;
`

const Navigation = () => {

    const location = useLocation();

    const [isWalletPage, setIsWalletPage] = useState(false);
    const [isTransactionPage, setIsTransactionPage] = useState(false);

    useEffect(() => {
        setIsWalletPage(location.pathname === "/");
        setIsTransactionPage(location.pathname === "/transactions");
    }, [location.pathname]);


	// console.log(isWalletPage, isTransactionPage, location.pathname);
	return (
		<Nav>
			<div style={{ paddingTop:'4.43vh' }}>
				<NavLink to="/">
					<Bar $toShow={ isWalletPage } />
					<Card>
						<LogoBox>
							<Wallet src={WalletLogo} alt="Wallet" />
						</LogoBox>
						<Title $toColor={ isWalletPage } >Wallets</Title>
					</Card>
				</NavLink>
				<NavLink to="/transactions">
					<Bar $toShow={ isTransactionPage } />
					<Card>
						<LogoBox>
							<img src={TransactionsLogo} alt="Transactions" style={{ width: '1vw', padding:'0.3vh 0', margin: '0.2vh 0.625vw' }} />
						</LogoBox>
						<Title $toColor={ isTransactionPage } >Transactions</Title>
					</Card>
				</NavLink>
			</div>
			<Support>
				Support
			</Support>
		</Nav>
	);
};

export default Navigation;