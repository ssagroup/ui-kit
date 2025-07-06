import { createBrowserRouter } from 'react-router-dom';

import App from './App';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <>Error page</>,
    children: [
      {
        path: '/',
        element: <>Main page</>,
      },
    ],
  },
]);

export { router };
