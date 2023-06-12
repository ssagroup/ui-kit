import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './injectGlobal';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// https://webpack.js.org/guides/production/#specify-the-mode
if (process.env.NODE_ENV !== 'production') {
  // NOTE: this was left intentionally to check HMR
  window.onload = () => console.log('TEST PAGE RELOAD');
}
