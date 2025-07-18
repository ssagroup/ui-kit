import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { Layout } from './Layout';
import { MainPage } from './MainPage';
import { AnotherPage } from './AnotherPage';
import AIDashboardGenerator from './AIDashboardGenerator';
import BarLineComplexChartDemo from './BarLineComplexChartDemo';

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
      {
        path: '/ai-dashboard',
        element: (
          <Layout>
            <AIDashboardGenerator />
          </Layout>
        ),
      },
      {
        path: '/barline-chart',
        element: (
          <Layout>
            <BarLineComplexChartDemo />
          </Layout>
        ),
      },
    ],
  },
]);

export { router };
