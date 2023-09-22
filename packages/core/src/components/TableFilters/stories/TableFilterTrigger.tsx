import { css, useTheme } from '@emotion/react';
import { PopoverTrigger } from '@components/Popover/PopoverTrigger';
import Icon from '@components/Icon';
import { Theme } from '@emotion/react';

export const filterButtonStyles = (theme: Theme) => css`
  width: 85px;
  height: 40px;
  color: ${theme.colors.greyDisabled};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.greyDropdownMain};
  border-radius: 5px;
  padding: 0 11px 0 13px;
  gap: 7px;
  user-select: none;

  &:hover {
    border-color: ${theme.colors.greyDropdownFocused};
  }

  &:active {
    border-color: ${theme.colors.blueNotification};
  }

  &:disabled {
    background: ${theme.colors.grey};
  }
`;

export const TableFilterTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <PopoverTrigger
      variant="custom"
      css={filterButtonStyles}
      endIcon={
        <Icon name="filter" color={theme.colors.greyFilterIcon} size={20} />
      }>
      {children}
    </PopoverTrigger>
  );
};
