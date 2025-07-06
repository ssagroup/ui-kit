import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { Layout } from './Layout';
import { MainPage } from './MainPage';
import { AnotherPage } from './AnotherPage';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <>Error page</>,
    children: [
      {
        path: '/',
        element: (
          <Layout>
            <MainPage />
          </Layout>
        ),
      },
      {
        path: '/main',
        element: (
          <Layout>
            <MainPage />
          </Layout>
        ),
      },
      {
        path: '/another-page',
        element: (
          <Layout>
            <AnotherPage />
          </Layout>
        ),
      },
    ],
  },
]);

export { router };
