import { useMemo } from 'react';
import { useTheme } from '@emotion/react';
import { Button } from '@ssa-ui-kit/core';

import { pageBtnStyles, selectedPageBtnStyles } from './styles';
import { IPaginationButtonsProps, IPageButtonProps } from './types';

const Break = () => <span css={{ cursor: 'default' }}>...</span>;

const PageButton = ({ onClick, isSelected, page }: IPageButtonProps) => {
  const theme = useTheme();
  const styles = useMemo(() => {
    return isSelected ? selectedPageBtnStyles(theme) : pageBtnStyles(theme);
  }, [isSelected]);

  return (
    <Button
      size="small"
      variant="secondary"
      onClick={
        isSelected
          ? () => {
              /*no-op*/
            }
          : onClick
      }
      css={styles}
      aria-label={isSelected ? `Current page ${page}` : `Go to page ${page}`}
      aria-current={isSelected}>
      {page}
    </Button>
  );
};

export const PaginationButtons = ({
  range,
  selectedPage,
  onClick,
}: IPaginationButtonsProps) => {
  return (
    Array.isArray(range) &&
    range.map((page, index) => {
      return page === -1 ? (
        <Break key={index} />
      ) : (
        <PageButton
          key={index}
          page={page}
          isSelected={page === selectedPage}
          onClick={() => onClick(page)}
        />
      );
    })
  );
};
