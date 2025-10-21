import { useTheme } from '@emotion/react';

import { Button, CardContent, Icon, Typography } from '@ssa-ui-kit/core';

import * as S from '../styles';

import { useAccountKeysContext } from './AccountKeysProvider';

export interface AccountKeysContentProps {
  children?: React.ReactNode;
}

export const AccountKeysContent = ({ children }: AccountKeysContentProps) => {
  const theme = useTheme();
  const ctx = useAccountKeysContext();
  const { apiKey, secretKey, visible, placeholder, toggleVisible } = ctx.store;

  return (
    <CardContent css={S.CardContent} direction="column">
      {children || (
        <>
          <div css={S.KeyItem}>
            <Typography variant="h6" color={theme.colors.greyDropdownFocused}>
              API Key
            </Typography>
            <Typography variant="h5" weight="bold" css={S.LetterWrap}>
              {apiKey}
            </Typography>
          </div>
          <div css={S.KeyItem}>
            <Typography variant="h6" color={theme.colors.greyDropdownFocused}>
              Secret Key
            </Typography>
            <Typography variant="h5" weight="bold" css={S.SecretKey}>
              <span css={S.LetterWrap}>
                {visible ? secretKey || placeholder : placeholder}
              </span>
              <Button css={S.VisibleButton} onClick={toggleVisible}>
                <Icon
                  name={visible ? 'visible' : 'invisible'}
                  size={20}
                  color={theme.colors.greyDropdownFocused}
                />
              </Button>
            </Typography>
          </div>
        </>
      )}
    </CardContent>
  );
};
