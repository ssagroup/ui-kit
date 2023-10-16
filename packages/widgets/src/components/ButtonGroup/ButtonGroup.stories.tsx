import { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';

export default {
  title: 'Widgets/ButtonGroup',
  component: ButtonGroup,
} as Meta<typeof ButtonGroup>;

export const Default: StoryObj<typeof ButtonGroup> = () => {
  return <ButtonGroup />;
};

Default.args = {
  value: '500',
  unit: 'USD',
  title: 'Turnover',
};
