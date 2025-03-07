import { HTMLAttributes } from 'react';
import { Interpolation, Theme, useTheme } from '@emotion/react';
import TableRow from '@components/TableRow';
import { NestedTableCellSubHeader } from './NestedTableCellSubHeader';
import { useNestedTableRowContext } from '../useNestedTableRowContext';

export const NestedTableRow = ({
  children,
  isHeader,
  ...props
}: React.PropsWithChildren<
  {
    isHeader?: boolean;
  } & HTMLAttributes<HTMLTableRowElement>
>) => {
  const theme = useTheme();
  const { isCollapsed, isSubHeader } = useNestedTableRowContext();
  const headerCSS: Interpolation<Theme> = isSubHeader
    ? {
        background: theme.colors.greyLighter60,
      }
    : {};
  const notSubHeaderCSS: Interpolation<Theme> =
    !isSubHeader && isCollapsed
      ? {
          height: 0,
          maxHeight: 0,
        }
      : {};

  return (
    <TableRow
      css={{
        ...headerCSS,
        ...notSubHeaderCSS,
      }}
      {...props}>
      <NestedTableCellSubHeader
        isHeader={isHeader}
        css={{
          maxWidth: 36,
          paddingLeft: 16,
          paddingRight: 0,
        }}
      />
      {children}
    </TableRow>
  );
};
