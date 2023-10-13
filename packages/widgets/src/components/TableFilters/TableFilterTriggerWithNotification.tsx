import { MultipleDropdownNotification } from '@ssa-ui-kit/core';
import { TableFilterTrigger } from './TableFilterTrigger';
import { useTheme } from '@emotion/react';

export const TableFilterTriggerWithNotification = ({
  children,
  count,
}: {
  children: React.ReactNode;
  count?: number;
}) => {
  const theme = useTheme();
  return (
    <TableFilterTrigger
      css={
        count && {
          background: theme.colors.blueDropdownWithSelectedItems,
          borderColor: theme.colors.blueDropdownWithSelectedItemsBorder,
        }
      }>
      {children}
      {count ? (
        <MultipleDropdownNotification
          as={'div'}
          css={{
            width: 16,
            height: 16,
            minWidth: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {count}
        </MultipleDropdownNotification>
      ) : (
        ''
      )}
    </TableFilterTrigger>
  );
};
