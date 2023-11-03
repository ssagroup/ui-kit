import { useTheme } from '@emotion/react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Icon,
  Typography,
} from '@ssa-ui-kit/core';
import { ExchangeAccountKeysProps } from './types';
import * as S from './styles';

export const ExchangeAccountKeys = ({
  title,
  apiKey,
  secretKey,
  onDelete,
  onVisible,
  isLoading,
}: ExchangeAccountKeysProps) => {
  const theme = useTheme();

  return (
    <Card noShadow css={S.Card}>
      <CardHeader css={S.CardHeader}>
        <Typography variant="h5" weight="bold">
          {title}
        </Typography>
        <Button css={S.DeleteButton} onClick={onDelete}>
          <Icon name="bin" size={15} color={theme.colors.greyDropdownFocused} />
        </Button>
      </CardHeader>
      <CardContent css={S.CardContent} direction="column">
        <div css={S.KeyItem}>
          <Typography variant="h6" color={theme.colors.greyDropdownFocused}>
            API Key
          </Typography>
          <Typography variant="h5" weight="bold" css={S.NoWrapText}>
            {apiKey}
          </Typography>
        </div>
        <div css={S.KeyItem}>
          <Typography variant="h6" color={theme.colors.greyDropdownFocused}>
            Secret Key
          </Typography>
          <Typography
            className={isLoading ? 'loading' : ''}
            variant="h5"
            weight="bold"
            css={S.SecretKey}>
            {secretKey ? secretKey : <span>******</span>}
            <Button css={S.VisibleButton} onClick={onVisible}>
              <Icon
                name={secretKey ? 'visible' : 'invisible'}
                size={20}
                color={theme.colors.greyDropdownFocused}
              />
            </Button>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
