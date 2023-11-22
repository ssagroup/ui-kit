import { CommonProps } from '@ssa-ui-kit/core';

export interface IPaginationProps extends CommonProps {
  pagesCount: number;
  ariaLabel?: string;
  isDisabled?: boolean;
}

export interface IPaginationButtonsProps {
  range: number[];
  selectedPage?: number;
  onClick: (page: number) => void;
  isDisabled?: boolean;
}

export interface IArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  isDisabled?: boolean;
  className?: string;
}

export interface IPageButtonProps {
  onClick: () => void;
  page: number | string;
  isSelected: boolean;
  isDisabled?: boolean;
}

export interface IPaginationContext {
  page?: number;
  setPage: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface IPaginationContextProviderProps {
  selectedPage?: number;
  children: React.ReactNode;
}
