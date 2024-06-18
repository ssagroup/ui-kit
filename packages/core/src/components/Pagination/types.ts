import { CommonProps } from '@global-types/emotion';

export interface PaginationProps extends CommonProps {
  pagesCount: number;
  ariaLabel?: string;
  isDisabled?: boolean;
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
  setPage: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface PaginationContextProviderProps {
  selectedPage?: number;
  children: React.ReactNode;
}
