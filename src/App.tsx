import React from 'react';

import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './context/Auth';
import Login from './pages/Login';
import GlobalStyles from './styles/global';
import theme from './styles/theme';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Login />
        <GlobalStyles />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
