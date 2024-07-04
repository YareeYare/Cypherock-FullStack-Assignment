import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Navigation from './components/Navigation';
import WalletList from './pages/Wallets';
import TransactionList from './pages/Transactions';
import { Provider } from 'react-redux';
import store from './store/store';
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
	return (
		<Provider store={store}>
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
		</Provider>
	);
};

export default App;