import { css, useTheme } from '@emotion/react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Icon,
  Typography,
  useFullscreenMode,
  WithLink,
} from '@ssa-ui-kit/core';
import { RemoveButton } from '@components/ExchangeAccount/styles';
import { BalancePieChart } from './BalancePieChart';
import { AccountBalanceProps } from './types';

// TODO: combine fullscreenMode & active widget name
// before fullscreenMode need to check for the widget name
// check core & widgets
export const AccountBalance = ({
  title = 'Balance',
  className,
  onClick,
  link,
  variant = 'valueList',
  features = [],
  ...props
}: AccountBalanceProps) => {
  const theme = useTheme();
  const { toggleFullscreenMode, isFullscreenMode } = useFullscreenMode();

  const handleToggleFullscreenMode = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    toggleFullscreenMode();
  };

  return (
    <WithLink link={link} onClick={onClick}>
      <Card
        className={className}
        onClick={link ? undefined : onClick}
        css={css`
          border-radius: 20px;
          padding: 5px 10px;
          width: 100%;
          box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow};

          ${isFullscreenMode &&
          css`
            height: 100vh;
            max-height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          `}

          ${theme.mediaQueries.md} {
            padding: 10px;
          }

          ${theme.mediaQueries.lg} {
            padding: 12px 20px 11px;
          }
        `}>
        <CardHeader
          css={css`
            margin-bottom: 10px;
            align-items: center;
          `}>
          <Typography
            variant="h3"
            weight="bold"
            css={css`
              font-size: 16px;
              ${theme.mediaQueries.md} {
                font-size: 20px;
              }
            `}>
            {title}
          </Typography>
          {features.includes('fullscreenMode') && (
            <Button css={RemoveButton} onClick={handleToggleFullscreenMode}>
              <Icon
                name={isFullscreenMode ? 'cross' : 'maximize'}
                css={{
                  cursor: 'pointer',
                }}
                tooltip={isFullscreenMode ? 'Close' : 'Maximize'}
                size={18}
                color={theme.colors.greyFilterIcon}
              />
            </Button>
          )}
        </CardHeader>
        <CardContent
          css={css`
            max-width: 406px;
            width: 100%;
            display: block;
            ${isFullscreenMode &&
            css`
              width: 100%;
              height: 100%;
              position: relative;
              max-width: 100%;
            `}
          `}>
          <BalancePieChart theme={theme} variant={variant} {...props} />
        </CardContent>
      </Card>
    </WithLink>
  );
};
