import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from '@ssa-ui-kit/core';
import { balanceData, balanceDataTotal } from './fixtures';
import { SegmentedPieChart } from '../SegmentedPieChart';

export default {
  title: 'Widgets/SegmentedPieChart',
  component: SegmentedPieChart,
} as Meta<typeof SegmentedPieChart>;

export const AccountExample: StoryObj<typeof PieChart> = () => {
  return (
    <SegmentedPieChart
      balanceData={balanceData}
      balanceDataTotal={balanceDataTotal}
    />
  );
};
AccountExample.args = {};
