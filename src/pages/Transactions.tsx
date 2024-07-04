import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TransactionItem from '../components/TransactionItem';

const TransactionsContainer = styled.div`
	padding: 0px;
	margin: 0 3.8vw;
	width: 100vw;
	display: flex;
	flex-direction: column;
`;

const TransactionTitle = styled.h2`
	font-size: 20px;
	font-weight: 700;
	color: #C78D4E;
	margin-top: 14.071vh;
	margin-bottom: 6.8vh;
`

const TotalTransactions = styled.div`
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
  	grid-template-columns: 1fr 1fr 1fr 1fr 7vw;
	padding: 3.142vh 1vw 0.4285vh 2vw;
`

const ColumnName = styled.div`
	font-size: 1.2vw;
	font-weight: 500;
	color: #7E7D7D;
`

const TableContent = styled.div`

`

const TransactionList = () => {
	const transactions = useSelector((state: RootState) => state.wallet.transactions);
	const dummy_transaction = {
		hash: '1',
		name: 'wallet_name',
		total: Math.random()/100,
		dateTime: '3/7/2024T2:39:23Z',
	}

	console.log( "transactions", transactions )

	return (
		<TransactionsContainer>
			<TransactionTitle>
				Transactions
			</TransactionTitle>
			<TotalTransactions>
				Total Transactions - {transactions.length}
			</TotalTransactions>
			<Table>
				<TableHeader>
					<ColumnName>Coin</ColumnName>
					<ColumnName>Wallet</ColumnName>
					<ColumnName>Amount</ColumnName>
					<ColumnName>Result</ColumnName>
					<ColumnName>Status</ColumnName>
				</TableHeader>
				<TableContent>
					<TransactionItem transaction={dummy_transaction} />
					{transactions.map(transaction => (
						<TransactionItem key={transaction.hash} transaction={transaction} />
					))}
				</TableContent>
			</Table>
		</TransactionsContainer>
	);
};

export default TransactionList;