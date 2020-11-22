import React from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './context/Auth';
import Login from './pages/Login';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Login />
        <GlobalStyles />
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
