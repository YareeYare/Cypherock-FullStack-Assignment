import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/globalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<App />
			</ThemeProvider>
		</Provider>
	// </React.StrictMode>,
);