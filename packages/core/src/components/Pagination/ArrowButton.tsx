import { useTheme } from '@emotion/react';
import Button from '@components/Button';
import Icon from '@components/Icon';

import { ArrowButtonProps } from './types';
import { arrowBtnStyles } from './styles';

/**
 * ArrowButton - Navigation arrow button for pagination
 *
 * Internal component used by Pagination to render previous/next navigation arrows.
 * Displays a button with a carrot icon pointing left or right. Used for navigating
 * between pages in the pagination component.
 *
 * @category Components
 * @subcategory Navigation
 *
 * @example
 * ```tsx
 * // Used internally by Pagination component
 * <ArrowButton
 *   direction="left"
 *   onClick={() => goToPreviousPage()}
 *   isDisabled={isFirstPage}
 * />
 * ```
 *
 * @see {@link Pagination} - Parent component that uses this component
 * @see {@link ArrowButtonProps} - Props interface
 *
 * @internal
 * This component is not exported from the main index and is intended for
 * internal use within the Pagination component.
 *
 * @accessibility
 * - ARIA label set automatically based on direction
 * - Keyboard navigation support via Button component
 * - Screen reader friendly
 */
export const ArrowButton = ({
  direction,
  onClick,
  isDisabled,
  className,
}: ArrowButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      startIcon={
        <Icon
          name={`carrot-${direction}`}
          size={12}
          color={theme.colors.greyDisabled}
        />
      }
      variant="custom"
      onClick={onClick}
      isDisabled={isDisabled}
      size="small"
      className={className}
      css={arrowBtnStyles(theme)}
      aria-label={`Go to ${direction === 'left' ? 'previous' : 'next'} page`}
    />
  );
};
