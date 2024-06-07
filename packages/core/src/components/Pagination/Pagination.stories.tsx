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

export const PageSelected = {
  args: {
    pagesCount: 10,
  },
  parameters: {
    selectedPage: 5,
  },
};

export const NoPagesSelected = {
  args: {
    pagesCount: 10,
  },
};

export const FirstPageSelected = {
  args: {
    pagesCount: 10,
  },
  parameters: {
    selectedPage: 1,
  },
};

export const LastPageSelected = {
  args: {
    pagesCount: 10,
  },
  parameters: {
    selectedPage: 10,
  },
};

export const Disabled = {
  args: {
    pagesCount: 10,
    isDisabled: true,
  },
  parameters: {
    selectedPage: 5,
  },
};
