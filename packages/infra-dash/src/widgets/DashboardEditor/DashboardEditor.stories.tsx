import { QueryClient } from '@shared/query';
import { type Meta, type StoryObj } from '@storybook/react-webpack5';

import { InfraDashProvider } from '../../provider';

import { dashboard, MockTransport } from './__mock__';
import { DashboardEditor } from './DashboardEditor';

const meta: Meta<typeof DashboardEditor> = {
  title: 'DashboardEditor',
  component: DashboardEditor,
  args: {
    onError: (error) => alert(error.message),
  },
  decorators: [
    (Story) => (
      <div
        style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        {Story()}
      </div>
    ),
  ],
  globals: {
    backgrounds: { value: 'main' },
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      options: {
        main: { name: 'Main', value: '#D4D6DB' },
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
    defaultDashboard: dashboard,
  },
};

export const NewDashboard: Story = {
  decorators: [
    (Story) => (
      <InfraDashProvider
        transport={new MockTransport()}
        queryClient={new QueryClient()}>
        <Story />
      </InfraDashProvider>
    ),
  ],
};
