import React from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './context/Auth';
import Routes from './routes';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes />
        <GlobalStyles />
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
