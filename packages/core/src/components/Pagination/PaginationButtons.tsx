import { useMemo } from 'react';
import { useTheme } from '@emotion/react';
import Button from '@components/Button';

import { pageBtnStyles, selectedPageBtnStyles } from './styles';
import { PaginationButtonsProps, PageButtonProps } from './types';

/**
 * Break - Ellipsis separator for page number ranges
 *
 * Internal component that renders an ellipsis (...) to indicate a break
 * in the page number sequence when there are many pages.
 *
 * @internal
 */
const Break = () => <span css={{ cursor: 'default' }}>...</span>;

/**
 * PageButton - Individual page number button
 *
 * Internal component that renders a single page number button. Used within
 * PaginationButtons to display individual page numbers with proper styling
 * and selection state.
 *
 * @internal
 */
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

/**
 * PaginationButtons - Container component for page number buttons
 *
 * Internal component used by Pagination to render numbered page buttons.
 * Displays a range of page numbers with ellipsis breaks for large page counts.
 * Handles page selection and visual state (selected/disabled).
 *
 * @category Components
 * @subcategory Navigation
 *
 * @example
 * ```tsx
 * // Used internally by Pagination component
 * <PaginationButtons
 *   range={[1, 2, 3, -1, 10]}  // -1 represents ellipsis break
 *   selectedPage={2}
 *   onClick={(page) => setPage(page)}
 *   isDisabled={false}
 * />
 * ```
 *
 * @see {@link Pagination} - Parent component that uses this component
 * @see {@link PaginationButtonsProps} - Props interface
 * @see {@link PageButton} - Internal component for individual buttons
 *
 * @internal
 * This component is not exported from the main index and is intended for
 * internal use within the Pagination component.
 *
 * @accessibility
 * - ARIA labels and current state via PageButton components
 * - Keyboard navigation support via Button components
 * - Screen reader friendly
 * - Proper focus management
 */
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
