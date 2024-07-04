import styled from 'styled-components';
import Bitcoin from '../assets/bitcoin.svg';
import Arrow from '../assets/diagonal_Arrow.svg';

const TransactionsItemContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 7vw;
	background-color: #1e2026;
	border-radius: 0.3vw;
	align-items: center;
	padding: 1.4vh 1vw 1.1vh 2vw;
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
	margin-right: 0.547vw;
	display: flex;
	justify-content: center;
	align-items: center;
`

const DoneAt = styled.h3`
	font-size: 1.2vw;
	font-weight: 700;
	margin: 0;
	color: #ADABAA;
	display: flex;
	flex-direction: column;
`

const Date = styled.span`
	font-size: 1.2vw;
	font-weight: 600;
`

const Time = styled.span`
	font-size: 1vw;
	font-weight: 200;
`

const Wallet = styled.h3`
	margin: 0;
	font-size: 1.2vw;
	font-weight: 600;
	color: #ADABAA;
`

const Amount = styled.h3`
	margin: 0;
	font-size: 1.2vw;
	font-weight: 500;
	color: #ADABAA;
`

const Result = styled.div`
	margin: 0;
	font-size: 1.3vw;
	font-weight: 600;
	color: #8484F1;
	display: flex;
	align-items: center;
`

const Status = styled.h3`
	margin: 0;
	font-size: 1.3vw;
	font-weight: 600;
	color: #8484F1;
`

interface TransactionItemProps {
	transaction: {
		hash?: string;
		walletName: string;
		total: number;
		dateTime: string;
	};
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {

	//dateTime is in this format: "2014-03-29T01:29:19Z";
	const [date, timeWithZone] = transaction.dateTime.split('T');
	const time = timeWithZone.replace('Z', '');

	return (
		<TransactionsItemContainer>
			<Coin>
				<LogoBox>
					<img src={Bitcoin} alt='bitcoin' style={{ width: '1.211vw' }} />
				</LogoBox>
				<DoneAt>
					<Date>{date}</Date>
					<Time>{time}</Time>
				</DoneAt>
			</Coin>
			<Wallet>
				{transaction.walletName}
			</Wallet>
			<Amount>{(transaction.total).toFixed(4)} BTC</Amount>
			<Result>
				<img src={Arrow} alt='arrow' style={{ width: '1.211vw' }} />
				RECEIVED
			</Result>
			<Status>
				SUCCESS
			</Status>
		</TransactionsItemContainer>
	);
};

export default TransactionItem;
