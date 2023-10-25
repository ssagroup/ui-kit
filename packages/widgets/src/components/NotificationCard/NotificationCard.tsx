import { useTheme } from '@emotion/react';
import { dateFormatters } from '@ssa-ui-kit/utils';
import {
  Badge,
  CardBase,
  IMapIcons,
  Icon,
  Indicator,
  MainColors,
  Typography,
} from '@ssa-ui-kit/core';
import { NotificationCardProps } from './types';
import {
  notifyBadge,
  notifyCard,
  notifyTitle,
  notifyText,
  notifyTime,
} from './styles';

export const notificationTypes: Record<string, { [key: string]: string }> = {
  Informational: {
    icon: 'information',
    color: 'blueLight',
  },
  Warning: {
    icon: 'warning',
    color: 'yellowWarm',
  },
  Error: {
    icon: 'attention',
    color: 'pink',
  },
};

export const NotificationCard = ({
  title,
  children,
  text,
  isRead,
  type,
  time,
  onClick,
}: NotificationCardProps) => {
  const theme = useTheme();
  const { getTimeAgo } = dateFormatters;

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
        <Badge
          data-testid="badge"
          color={notificationTypes[type].color as keyof MainColors}
          css={notifyBadge}>
          <Icon
            name={notificationTypes[type].icon as keyof IMapIcons}
            color={theme.colors.white}
            size={14}
          />
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
