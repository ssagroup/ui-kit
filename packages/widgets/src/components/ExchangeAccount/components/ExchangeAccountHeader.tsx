import { useTheme } from '@emotion/react';

import { Button, CardHeader, Icon } from '@ssa-ui-kit/core';

import * as S from '../styles';

import { useExchangeAccountContext } from './ExchangeAccountProvider';

export interface ExchangeAccountHeaderProps {
  children?: React.ReactNode;
}

export const ExchangeAccountHeader = ({
  children,
}: ExchangeAccountHeaderProps) => {
  const theme = useTheme();
  const { disabled, onDelete } = useExchangeAccountContext();

  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete?.();
  };

  return (
    <CardHeader css={S.CardHeader}>
      {children}
      {!disabled && onDelete && (
        <Button css={S.RemoveButton} onClick={(e) => handleClickDelete(e)}>
          <Icon name="bin" color={theme.colors.greyDropdownFocused} size={20} />
        </Button>
      )}
    </CardHeader>
  );
};
