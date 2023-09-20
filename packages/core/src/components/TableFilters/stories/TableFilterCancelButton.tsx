import { PopoverClose } from '@components/Popover';
import { baseButtonStyle } from './TableFiltersButtons';
import { Theme, css, useTheme } from '@emotion/react';

export const cancelButtonStyles = (theme: Theme) => css`
  width: 85px;
  color: ${theme.colors.greyCancelClearButton};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.greyDropdownMain};
  justify-content: center;
  border-radius: 5px;
  padding: 0 14px;

  &:hover {
    border-color: ${theme.colors.greyDropdownFocused};
  }

  &:active {
    border-color: ${theme.colors.blueNotification};
  }

  &:disabled {
    background: ${theme.colors.grey};
    color: ${theme.colors.greyFilterIcon};
  }
`;

export const TableFiltersCancelButton = ({
  children,
}: React.PropsWithChildren) => {
  const theme = useTheme();
  return (
    <PopoverClose
      css={{
        ...baseButtonStyle,
        ...cancelButtonStyles(theme),
      }}>
      {children}
    </PopoverClose>
  );
};
