import { ThemeProvider } from '@emotion/react';

import { mainTheme } from '@ssa-ui-kit/core';
import { AuthProvider } from '@hooks/useAuth';

import Routes from './Routes';

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
