import React from 'react';

import { ThemeProvider } from 'styled-components';

import Login from './pages/Login';
import GlobalStyles from './styles/global';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
