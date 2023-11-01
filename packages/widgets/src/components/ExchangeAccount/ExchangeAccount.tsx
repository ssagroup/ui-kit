import { useTheme } from '@emotion/react';
import {
  Button,
  CardBase,
  CardContent,
  CardHeader,
  Icon,
  Typography,
} from '@ssa-ui-kit/core';
import { BalancePieChart, WithLink } from '@components/AccountBalance';
import { ExchangeAccountProps } from './types';
import * as S from './styles';

export const ExchangeAccount = ({
  platform,
  title,
  status,
  link,
  data,
  onClick,
  onDelete,
}: ExchangeAccountProps) => {
  const theme = useTheme();
  const isActive = status === 'Active';
  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete();
  };

  return (
    <WithLink link={link} onClick={onClick}>
      <CardBase
        noShadow
        css={S.CardBase}
        data-testid="card"
        onClick={link ? undefined : onClick}>
        <CardHeader css={S.CardHeader}>
          <Typography
            variant="subtitle"
            weight="bold"
            color={theme.colors.greyDarker}
            css={S.Platform}>
            {platform}
          </Typography>
          <Typography
            color={theme.colors.greyDropdownFocused}
            variant="subtitle"
            weight="regular">
            {title}
          </Typography>
          <Button css={S.RemoveButton} onClick={(e) => handleClickDelete(e)}>
            <Icon
              name="bin"
              color={theme.colors.greyDropdownFocused}
              size={20}
            />
          </Button>
        </CardHeader>
        <Typography
          css={S.Status}
          className={isActive ? 'active' : 'not-available'}
          variant="body1"
          weight="regular">
          {isActive ? status : 'Not available'}
        </Typography>
        <CardContent css={S.CardContent} direction="column">
          <BalancePieChart theme={theme} {...data} />
        </CardContent>
      </CardBase>
    </WithLink>
  );
};
