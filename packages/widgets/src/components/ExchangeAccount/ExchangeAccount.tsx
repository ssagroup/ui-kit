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
import {
  CardWrapper,
  HeadWrapper,
  PlatformWrapper,
  RemoveButton,
  StatusWrapper,
  ChartWrapper,
} from './styles';

export const ExchangeAccount = ({
  platform,
  title,
  status,
  link,
  data,
  onClick,
  deleteOnClick,
}: ExchangeAccountProps) => {
  const theme = useTheme();

  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    deleteOnClick();
  };

  return (
    <WithLink link={link} onClick={onClick}>
      <CardBase noShadow css={CardWrapper} onClick={link ? undefined : onClick}>
        <CardHeader css={HeadWrapper}>
          <Typography
            variant="subtitle"
            weight="bold"
            color={theme.colors.greyDarker}
            css={PlatformWrapper}>
            {platform}
          </Typography>
          <Typography
            color={theme.colors.greyDropdownFocused}
            variant="subtitle"
            weight="regular">
            {title}
          </Typography>
          <Button css={RemoveButton} onClick={(e) => handleClickDelete(e)}>
            <Icon
              name="delete"
              color={theme.colors.greyDropdownFocused}
              size={20}
            />
          </Button>
        </CardHeader>
        <Typography
          css={StatusWrapper}
          className={status}
          variant="body1"
          weight="regular">
          {status === 'NotAvailable' ? 'Not available' : status}
        </Typography>
        <CardContent css={ChartWrapper} direction="column">
          <BalancePieChart theme={theme} {...data} />
        </CardContent>
      </CardBase>
    </WithLink>
  );
};
