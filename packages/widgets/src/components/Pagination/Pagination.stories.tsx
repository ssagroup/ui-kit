import type { Meta } from '@storybook/react';
import { Pagination, PaginationContextProvider } from './index';

export default {
  title: 'Widgets/Pagination',
  component: Pagination,
  decorators: [
    (Story, { parameters, args }) => {
      const { selectedPage } = parameters;
      return (
        <PaginationContextProvider selectedPage={selectedPage}>
          {Story(args)}
        </PaginationContextProvider>
      );
    },
  ],
} as Meta<typeof Pagination>;

export const Default = {
  args: {
    pagesCount: 10,
  },
  parameters: {
    selectedPage: 5,
  },
};
