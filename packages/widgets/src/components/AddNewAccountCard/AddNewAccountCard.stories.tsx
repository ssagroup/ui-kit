import { Meta, StoryObj } from '@storybook/react';
import { AddNewAccountCard } from './AddNewAccountCard';

export default {
  title: 'Widgets/AddNewAccountCard',
  component: AddNewAccountCard,
} as Meta<typeof AddNewAccountCard>;

export const Default: StoryObj<typeof AddNewAccountCard> = () => {
  return <AddNewAccountCard />;
};

Default.storyName = 'AddNewAccountCard';
