import type { Meta, StoryObj } from '@storybook/react';
import { NotificationMenu } from '../NotificationMenu';
import { StoryComponent } from './StoryComponent';

export default {
  title: 'Widgets/NotificationMenu',
  component: NotificationMenu,
} as Meta<typeof NotificationMenu>;

export const Default: StoryObj<typeof NotificationMenu> = () => {
  return <StoryComponent />;
};

Default.args = {};
