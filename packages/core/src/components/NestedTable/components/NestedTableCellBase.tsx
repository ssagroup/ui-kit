import { ReactNode } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import TableCell from '@components/TableCell';
import { TableCellProps } from '@components/TableCell/types';
import Wrapper from '@components/Wrapper';
import { useNestedTableContext } from '../hooks/useNestedTableContext';
import { useNestedTableRowContext } from '../hooks/useNestedTableRowContext';

export type NestedTableCellBaseProps =
  React.PropsWithChildren<TableCellProps> & {
    /** Rendered inside the content wrapper, after the content. */
    adornment?: ReactNode;
    /**
     * Rendered after the content wrapper, straight inside the cell — where
     * the table's stylesheet expects a column's resize handle.
     */
    trailing?: ReactNode;
  };

/**
 * The cell shared by `NestedTableCell` and `NestedTableCellHeader`. Not
 * exported from the package.
 */
export const NestedTableCellBase = ({
  children,
  adornment,
  trailing,
  ...props
}: NestedTableCellBaseProps) => {
  const { opaqueCells, isResizable } = useNestedTableContext();
  const { isCollapsed, isSubHeader } = useNestedTableRowContext();
  const notSubHeaderCSS: Interpolation<Theme> =
    !isSubHeader && isCollapsed
      ? {
          padding: 0,
          '& div': {
            maxHeight: 0,
            transition: 'max-height 1s ease-in-out',
            visibility: 'hidden',
          },
        }
      : {
          '& div': {
            transition: 'max-height 1s ease-in-out',
          },
        };

  // The table truncates the cell, but the text sits in a flex wrapper, where
  // an ellipsis only shows on an element of its own that is allowed to shrink.
  const content =
    isResizable &&
    (typeof children === 'string' || typeof children === 'number') ? (
      <span css={ellipsisCSS}>{children}</span>
    ) : (
      children
    );

  return (
    <TableCell
      css={{
        borderRight: 'none',
        borderBottom: 'none',
        // Transparent so the row shades the group. A stuck cell has content
        // scrolled underneath, though, so it paints the row's colour itself.
        background: opaqueCells ? 'inherit' : 'transparent',
        ...notSubHeaderCSS,
      }}
      {...props}>
      <Wrapper css={isResizable ? { minWidth: 0 } : undefined}>
        {content}
        {adornment}
      </Wrapper>
      {trailing}
    </TableCell>
  );
};

const ellipsisCSS = {
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
} as const;
