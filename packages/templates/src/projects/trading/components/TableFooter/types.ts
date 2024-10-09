import { Dropdown } from '@ssa-ui-kit/core';

export type TableFooterProps = {
  handleRowsPerPageChange: Parameters<typeof Dropdown>[0]['onChange'];
  pagesCount: number;
  selectedItem?: number;
};
