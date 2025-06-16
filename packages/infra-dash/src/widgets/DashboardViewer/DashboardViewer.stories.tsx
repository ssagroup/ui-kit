import { type StoryObj, type Meta } from '@storybook/react-webpack5';

import { GrafanaPanelData } from '@shared/grafana';
import { Dashboard } from '@shared/dashboard';
import { QueryClient } from '@shared/query';

import { InfraDashProvider } from '../../provider';

import { DashboardViewer } from './DashboardViewer';
import { MockTransport, dashboard } from './__mock__';

const meta: Meta<typeof DashboardViewer> = {
  title: 'DashboardViewer',
  component: DashboardViewer,
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', position: 'relative' }}>{Story()}</div>
    ),
  ],
  globals: {
    backgrounds: { value: 'main' },
  },
  parameters: {
    backgrounds: {
      options: {
        main: { name: 'Main', value: '#D0D1D6' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <InfraDashProvider
        transport={new MockTransport()}
        queryClient={new QueryClient()}>
        <Story />
      </InfraDashProvider>
    ),
  ],
  args: {
    dashboard,
    header: (dashboard) => (
      <h3 style={{ marginBottom: '20px' }}>{dashboard.title}</h3>
    ),
  },
};

class LoadingTransport extends MockTransport {
  getDashboard(): Promise<Dashboard> {
    return new Promise(() => {});
  }
}

export const DashboardLoading: Story = {
  decorators: [
    (Story) => (
      <InfraDashProvider
        transport={new LoadingTransport()}
        queryClient={new QueryClient()}>
        <Story />
      </InfraDashProvider>
    ),
  ],
  args: {
    dashboardId: 1,
  },
};

class ErrorTransport extends MockTransport {
  getDashboard(): Promise<Dashboard> {
    return Promise.reject(new Error('Error fetching dashboard'));
  }
}

export const DashboardError: Story = {
  decorators: [
    (Story) => (
      <InfraDashProvider
        transport={new ErrorTransport()}
        queryClient={new QueryClient()}>
        <Story />
      </InfraDashProvider>
    ),
  ],
  args: {
    dashboardId: 1,
  },
};

class PanelLoadingTransport extends MockTransport {
  getPanelData(): Promise<GrafanaPanelData> {
    return new Promise(() => {});
  }
}
const loadingTransport = new PanelLoadingTransport();

export const PanelLoading: Story = {
  decorators: [
    (Story) => (
      <InfraDashProvider
        transport={loadingTransport}
        queryClient={new QueryClient()}>
        <Story />
      </InfraDashProvider>
    ),
  ],
  args: {
    dashboard,
  },
};

class PanelErrorTransport extends MockTransport {
  getGrafanaPanelData(): Promise<GrafanaPanelData> {
    return Promise.reject(new Error(`Error fetching data for panel`));
  }
}

export const PanelError: Story = {
  decorators: [
    (Story) => (
      <InfraDashProvider
        transport={new PanelErrorTransport()}
        queryClient={new QueryClient()}>
        <Story />
      </InfraDashProvider>
    ),
  ],
  args: {
    dashboard,
  },
};
