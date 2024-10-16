import type { Meta } from '@storybook/react';
import { StoryAnnotations } from '@storybook/types';
import { Pagination, PaginationContextProvider } from './index';

export default {
  title: 'Widgets/Pagination',
  component: Pagination,
  decorators: [
    (Story, { parameters, args }) => {
      return (
        <PaginationContextProvider {...parameters}>
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

export const WithManualPageSettingAndPerPage: StoryAnnotations = {
  args: {
    pagesCount: 10,
    isPageSettingVisible: true,
    isRowPerPageVisible: true,
  },
  parameters: {
    selectedPage: 1,
  },
};

WithManualPageSettingAndPerPage.storyName =
  'With records per page and page number setting';
