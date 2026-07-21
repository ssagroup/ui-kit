import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Wrapper from '@components/Wrapper';
import { Pagination, PaginationContextProvider } from './index';
import { DropdownPositions } from '@components/Dropdown/types';

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

// Standalone component, unrelated to Pagination or its context, that owns
// nothing itself - it only receives `page`/`perPage` and setters as props.
// Demonstrates that any external component can drive Pagination once the
// state lives in a shared parent.
const ExternalControls = ({
  page,
  perPage,
  pagesCount,
  onPageChange,
  onPerPageChange,
}: {
  page: number;
  perPage: number;
  pagesCount: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}) => (
  <Wrapper
    css={{
      width: 'auto',
      gap: 16,
      flexWrap: 'wrap',
      padding: 12,
      border: '1px dashed',
      borderRadius: 8,
    }}>
    <Typography variant="subtitle" css={{ fontSize: 14 }}>
      External controls (separate component, not inside Pagination):
    </Typography>
    <Button size="small" variant="secondary" onClick={() => onPageChange(1)}>
      Go to first page
    </Button>
    <Button
      size="small"
      variant="secondary"
      onClick={() => onPageChange(pagesCount)}>
      Go to last page
    </Button>
    <Button
      size="small"
      variant="secondary"
      onClick={() => onPerPageChange(50)}>
      Set 50 rows/page
    </Button>
    <Typography variant="subtitle" css={{ fontSize: 14 }}>
      Current: page {page} · {perPage} rows/page
    </Typography>
  </Wrapper>
);

export const Controlled: Story = {
  name: 'Controlled (page/perPage owned by parent)',
  render: (args) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    return (
      <Wrapper direction="column" css={{ gap: 16 }}>
        <ExternalControls
          page={page}
          perPage={perPage}
          pagesCount={args.pagesCount}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
        <PaginationContextProvider
          page={page}
          onPageChange={setPage}
          perPage={perPage}
          onPerPageChange={setPerPage}>
          <Pagination {...args} />
        </PaginationContextProvider>
      </Wrapper>
    );
  },
  args: {
    pagesCount: 10,
    isRowPerPageVisible: true,
    isPageSettingVisible: true,
  },
};

export const RowsPerPageAtBottom: Story = {
  name: 'Rows per page — dropdown position auto (near bottom)',
  decorators: [
    (Story, { parameters, args }) => (
      <PaginationContextProvider {...parameters}>
        <div style={{ position: 'fixed', bottom: 16, left: 16 }}>
          {Story(args)}
        </div>
      </PaginationContextProvider>
    ),
  ],
  args: {
    pagesCount: 10,
    isRowPerPageVisible: true,
    rowPerPageProps: {
      dropdownPosition: DropdownPositions.auto,
    },
  },
  parameters: {
    selectedPage: 1,
  },
};
