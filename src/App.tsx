import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wallets from './pages/Wallets';

const App = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Wallets />} />
		</Routes>
	</Router>
);

export default App;
