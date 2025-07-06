import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { MainPage } from './MainPage';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <>Error page</>,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
]);

export { router };
