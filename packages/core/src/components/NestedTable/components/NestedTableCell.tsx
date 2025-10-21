import { HTMLAttributes } from 'react';

import { Interpolation, Theme } from '@emotion/react';

import TableCell from '@components/TableCell';
import Wrapper from '@components/Wrapper';
import { CommonProps } from '@global-types/emotion';

import { useNestedTableRowContext } from '../hooks/useNestedTableRowContext';

export const NestedTableCell = ({
  children,
  ...props
}: React.PropsWithChildren<HTMLAttributes<HTMLTableCellElement>> &
  CommonProps) => {
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

  return (
    <TableCell
      css={{
        borderRight: 'none',
        borderBottom: 'none',
        background: 'transparent',
        ...notSubHeaderCSS,
      }}
      {...props}>
      <Wrapper>{children}</Wrapper>
    </TableCell>
  );
};
