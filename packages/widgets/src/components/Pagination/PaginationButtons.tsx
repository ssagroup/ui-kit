import { useMemo } from 'react';
import { useTheme } from '@emotion/react';
import { Button } from '@ssa-ui-kit/core';

import { pageBtnStyles, selectedPageBtnStyles } from './styles';
import { PaginationButtonsProps, PageButtonProps } from './types';

const Break = () => <span css={{ cursor: 'default' }}>...</span>;

const PageButton = ({
  onClick,
  isSelected,
  page,
  isDisabled,
}: PageButtonProps) => {
  const theme = useTheme();
  const styles = useMemo(() => {
    return isSelected ? selectedPageBtnStyles(theme) : pageBtnStyles(theme);
  }, [isSelected]);

  return (
    <Button
      size="small"
      variant="secondary"
      isDisabled={isDisabled}
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
  isDisabled,
}: PaginationButtonsProps) => {
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
          isDisabled={isDisabled}
        />
      );
    })
  );
};
