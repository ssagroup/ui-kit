import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from './index';

export default {
  title: 'Widgets/PieChart',
  component: PieChart,
} as Meta<typeof PieChart>;

export const Default: StoryObj<typeof PieChart> = {};
Default.args = {
  title: '123',
};
