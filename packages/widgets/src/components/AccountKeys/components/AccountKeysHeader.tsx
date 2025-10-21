import { useTheme } from '@emotion/react';

import { Button, CardHeader, Icon, Typography } from '@ssa-ui-kit/core';

import * as S from '../styles';

import { useAccountKeysContext } from './AccountKeysProvider';

export interface AccountKeysHeaderProps {
  children?: React.ReactNode;
}

export const AccountKeysHeader = ({ children }: AccountKeysHeaderProps) => {
  const theme = useTheme();
  const ctx = useAccountKeysContext();
  const { title, onDelete } = ctx.store;

  return (
    <CardHeader css={S.CardHeader}>
      {children || (
        <>
          <Typography variant="h5" weight="bold">
            {title}
          </Typography>
          {onDelete && (
            <Button css={S.DeleteButton} onClick={onDelete}>
              <Icon
                name="bin"
                size={15}
                color={theme.colors.greyDropdownFocused}
              />
            </Button>
          )}
        </>
      )}
    </CardHeader>
  );
};
