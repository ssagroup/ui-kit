import type { Meta, StoryObj } from '@storybook/react-webpack5';
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

type Story = StoryObj<typeof Pagination>;

export const PageSelected: Story = {
  args: {
    pagesCount: 10,
  },
  parameters: {
    selectedPage: 5,
  },
};

export const NoPagesSelected: Story = {
  args: {
    pagesCount: 10,
  },
};

export const FirstPageSelected: Story = {
  args: {
    pagesCount: 10,
  },
  parameters: {
    selectedPage: 1,
  },
};

export const LastPageSelected: Story = {
  args: {
    pagesCount: 10,
  },
  parameters: {
    selectedPage: 10,
  },
};

export const Disabled: Story = {
  args: {
    pagesCount: 10,
    isDisabled: true,
  },
  parameters: {
    selectedPage: 5,
  },
};

export const WithManualPageSettingAndPerPage: Story = {
  args: {
    pagesCount: 10,
    isPageSettingVisible: true,
    isRowPerPageVisible: true,
  },
  parameters: {
    selectedPage: 1,
  },
};

export const WithoutPageFromCount: Story = {
  args: {
    pagesCount: 10,
    isPageSettingVisible: true,
    isRowPerPageVisible: true,
    isPageFromCountVisible: false,
  },
  parameters: {
    selectedPage: 1,
  },
};

WithManualPageSettingAndPerPage.storyName =
  'With records per page and page number setting';
