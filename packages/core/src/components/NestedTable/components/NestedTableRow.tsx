import { HTMLAttributes } from 'react';
import { Interpolation, Theme, useTheme } from '@emotion/react';
import TableRow from '@components/TableRow';
import { NestedTableCellSubHeader } from './NestedTableCellSubHeader';
import { useNestedTableRowContext } from '../hooks/useNestedTableRowContext';

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
  const { isCollapsed, isSubHeader, childRowsCount, setIsCollapsed } =
    useNestedTableRowContext();
  const headerCSS: Interpolation<Theme> = isSubHeader
    ? {
        background: theme.colors.greyLighter60,
        '& td': {
          fontWeight: 700,
        },
      }
    : {
        background: theme.colors.white,
      };

  const classNames: string[] = [];
  if (isSubHeader) {
    classNames.push('first-row');
  }
  if (isCollapsed) {
    classNames.push('collapsed');
  }
  const notSubHeaderCSS: Interpolation<Theme> =
    !isSubHeader && isCollapsed
      ? {
          height: 0,
          maxHeight: 0,
          padding: 0,
          '& td': {
            height: 0,
            maxHeight: 0,
            padding: 0,
          },
        }
      : {};

  const handleClick = () => {
    if (childRowsCount > 1 && isSubHeader) {
      setIsCollapsed((currentState) => !currentState);
    }
  };

  return (
    <TableRow
      css={{
        ...headerCSS,
        ...notSubHeaderCSS,
      }}
      onClick={handleClick}
      className={classNames.join(' ')}
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
