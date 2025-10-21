import { Interpolation, Theme, useTheme } from '@emotion/react';

import MultipleDropdownNotification from '@components/MultipleDropdownNotification';

import { TableFilterTrigger } from './TableFilterTrigger';

export const TableFilterTriggerWithNotification = ({
  children,
  count,
  visible = true,
}: {
  children?: React.ReactNode;
  count?: number;
  visible?: boolean;
}) => {
  const theme = useTheme();
  const css: Interpolation<Theme> = {
    display: visible ? 'flex' : 'none',
  };
  if (count) {
    css.background = theme.colors.blueDropdownWithSelectedItems;
    css.borderColor = theme.colors.blueDropdownWithSelectedItemsBorder;
  }
  return (
    <TableFilterTrigger css={css} count={count}>
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
          }}
          data-testid={'trigger-notification'}>
          {count}
        </MultipleDropdownNotification>
      ) : (
        ''
      )}
    </TableFilterTrigger>
  );
};
