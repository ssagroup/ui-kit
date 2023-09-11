import type { Meta } from '@storybook/react';
import Pagination from './Pagination';

export default {
  title: 'Widgets/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;

export const Default = {
  args: {
    pagesCount: 10,
    selectedPage: 5,
  },
};
