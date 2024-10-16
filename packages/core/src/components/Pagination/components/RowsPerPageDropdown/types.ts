import { CommonProps } from '@global-types/emotion';

export interface RowsPerPageDropdownProps extends CommonProps {
  selectedItem?: number;
  rowsPerPageText?: string;
  rowsPerPageList?: Array<{ id: number; value: number }>;
}
