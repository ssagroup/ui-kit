import { PopoverClose } from '@ssa-ui-kit/core';
import { Theme, css, useTheme } from '@emotion/react';
import { baseButtonStyle } from './styles';

export const cancelButtonStyles = (theme: Theme) => css`
  ${baseButtonStyle}
  color: ${theme.colors.greyCancelClearButton};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.greyDropdownMain};
  justify-content: center;

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
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const theme = useTheme();
  return (
    <PopoverClose css={cancelButtonStyles(theme)} onClick={onClick}>
      {children}
    </PopoverClose>
  );
};
