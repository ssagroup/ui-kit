import Button from '@components/Button';
import { Theme, css, useTheme } from '@emotion/react';
import { baseButtonStyle } from './styles';

export const clearButtonStyles = (theme: Theme) => css`
  ${baseButtonStyle}
  color: ${theme.colors.greyCancelClearButton};
  background: ${theme.colors.greyLighter};
  border: 1px solid ${theme.colors.greyDropdownMain};
  justify-content: center;

  &:hover {
    border-color: ${theme.colors.greyDropdownFocused};
    background: ${theme.colors.greyLighter};
  }

  &:active {
    border-color: ${theme.colors.greyDropdownFocused};
    background: ${theme.colors.greyLighter};
  }

  &:disabled {
    background: ${theme.colors.grey};
    color: ${theme.colors.greyFilterIcon};
  }
`;

export const TableFiltersClearButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const theme = useTheme();
  return (
    <Button
      css={{
        ...baseButtonStyle,
        ...clearButtonStyles(theme),
      }}
      variant="secondary"
      onClick={onClick}>
      {children}
    </Button>
  );
};
