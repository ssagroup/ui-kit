import { InputProps } from '@components/Input/types';
import { CommonProps } from '@global-types/emotion';

import { RowsPerPageDropdownProps } from './components/RowsPerPageDropdown/types';

export interface PaginationProps extends CommonProps {
  pagesCount: number;
  ariaLabel?: string;
  isDisabled?: boolean;
  pageNumberPlaceholder?: string;
  isPageSettingVisible?: boolean;
  isRowPerPageVisible?: boolean;
  isPageFromCountVisible?: boolean;
  rowPerPageProps?: RowsPerPageDropdownProps;
  manualPageNumberProps?: InputProps;
  errorTooltip?: string;
}

export interface PaginationButtonsProps {
  range: number[];
  selectedPage?: number;
  onClick: (page: number) => void;
  isDisabled?: boolean;
}

export interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  isDisabled?: boolean;
  className?: string;
}

export interface PageButtonProps {
  onClick: () => void;
  page: number | string;
  isSelected: boolean;
  isDisabled?: boolean;
}

export interface PaginationContextProps {
  page?: number;
  perPage: number;
  setPage: React.Dispatch<React.SetStateAction<number | undefined>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface PaginationContextProviderProps {
  selectedPage?: number;
  defaultPerPage?: number;
  children: React.ReactNode;
}
