import { CommonProps, Dropdown } from '@ssa-ui-kit/core';

export interface RowsPerPageDropdownProps extends CommonProps {
  onChange: Parameters<typeof Dropdown>[0]['onChange'];
  selectedItem?: number;
}
