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
import { useState } from 'react';

export const ExchangeAccountKeys = ({
  title,
  apiKey,
  secretKey,
  onDelete,
  onVisibilityChange,
  isDisabled,
}: ExchangeAccountKeysProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();
  const placeholder = <span>******</span>;

  const handleClickVisible = () => {
    setIsVisible((prev) => !prev);
    onVisibilityChange(isVisible);
  };

  return (
    <Card noShadow css={S.Card} className={isDisabled ? 'disabled' : ''}>
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
          <Typography variant="h5" weight="bold" css={S.SecretKey}>
            {isVisible ? placeholder : secretKey || placeholder}
            <Button css={S.VisibleButton} onClick={() => handleClickVisible()}>
              <Icon
                name={isVisible ? 'invisible' : 'visible'}
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
