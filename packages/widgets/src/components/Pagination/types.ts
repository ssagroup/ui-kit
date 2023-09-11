export interface IPaginationProps {
  pagesCount: number;
  selectedPage?: number;
  onPageChange: () => void;

  prevPageElem?: React.ReactNode;
  nextPageElem?: React.ReactNode;
  renderPageElem?: () => React.ReactNode;
  breakElem?: React.ReactNode;

  className?: string;
}

export interface IPaginationButtonsProps {
  range: number[];
  selectedPage?: number;
  onClick: (page: number) => void;
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
}
