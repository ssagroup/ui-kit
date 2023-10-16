import { useTheme } from '@emotion/react';
import { Badge, CardBase, Icon, Indicator, Typography } from '@ssa-ui-kit/core';
import {
  notifyBadge,
  notifyCard,
  notifyTitle,
  notifyText,
  notifyTime,
} from './styles';
import { NotificationCardProps } from './types';
import { timeAgo } from '@ssa-ui-kit/utils';

export const NotificationCard = ({
  title,
  children,
  text,
  isRead,
  badgeColor,
  iconName,
  time,
  onClick,
}: NotificationCardProps) => {
  const theme = useTheme();
  const { getTimeAgo } = timeAgo;

  return (
    <CardBase
      data-testid="notification"
      css={notifyCard}
      noShadow
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}>
      <Indicator isVisible={!isRead}>
        <Badge data-testid="badge" color={badgeColor} css={notifyBadge}>
          <Icon name={iconName} color={theme.colors.white} size={14} />
        </Badge>
      </Indicator>
      <Typography
        variant="subtitle"
        weight="medium"
        css={notifyTitle}
        color={theme.colors.greyDarker}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        weight="regular"
        css={notifyText}
        color={theme.colors.greyDarker60}>
        {text}
      </Typography>
      {children}
      <Typography
        variant="body1"
        weight="regular"
        css={notifyTime}
        color={theme.colors.greyDarker}>
        {getTimeAgo(time)}
      </Typography>
    </CardBase>
  );
};
