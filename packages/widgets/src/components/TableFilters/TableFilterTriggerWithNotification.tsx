import { MultipleDropdownNotification } from '@ssa-ui-kit/core';
import { TableFilterTrigger } from './TableFilterTrigger';
import { Interpolation, Theme, useTheme } from '@emotion/react';

export const TableFilterTriggerWithNotification = ({
  children,
  count,
  visible = true,
}: {
  children: React.ReactNode;
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
    <TableFilterTrigger css={css}>
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
