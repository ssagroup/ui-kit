export interface FooterProps {
  isHidden?: boolean;
  isReadAllDisabled: boolean;
  onReadAllClick: () => void;
  onRowsPerPageChange: (value: number) => void;
  isPaginationDisabled: boolean;
  pagesCount: number;
}
