import { ThemeProvider } from '@emotion/react';

import { themes } from '@ssa-ui-kit/core';
import { AuthProvider } from '@hooks/useAuth';

import Routes from './Routes';

const App = () => {
  return (
    <ThemeProvider theme={themes.main}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
