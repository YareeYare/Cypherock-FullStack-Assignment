import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Navigation from './components/Navigation';
import WalletList from './pages/Wallets';
import TransactionList from './pages/Transactions';
import useSyncQueue from './hooks/useSyncQueue';
import './App.css'

const AppContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #0A1018;
`;

const PageContent = styled.div`
	display: flex;
	height: 100vh;
	width: 100vw;
	position: relative;
`

const App = () => {
	// Use the sync queue hook to start processing
	// useSyncQueue();

	return (
		<Router>
			<AppContainer>
				<Header />
				<PageContent>
					<Navigation />
					<Routes>
						<Route path="/" element={ <WalletList />} />
						<Route path="/transactions" element={<TransactionList />} />
					</Routes>
				</PageContent>
			</AppContainer>
		</Router>
	);
};

export default App;