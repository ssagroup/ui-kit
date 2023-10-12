import { useTheme } from '@emotion/react';
import { Badge, CardBase, Icon, Indicator, Typography } from '@ssa-ui-kit/core';
import {
  notifyBadge,
  notifyCard,
  notifyTitle,
  notifyText,
  notifyTime,
  childrenWrapper,
} from './style';
import { INotificationCardProps } from './types';
import { formatPeriod } from './timeFormatters';

const NotificationCard = ({
  title,
  children,
  text,
  isRead,
  badgeColor,
  iconName,
  timeAgo,
  onClick,
}: INotificationCardProps) => {
  const theme = useTheme();

  // 1618301456781
  //Tue Apr 13 2023 11:10:56 GMT+0300 (Eastern European Summer Time)
  console.log(
    formatPeriod(
      'Tue Apr 13 2023 11:10:56 GMT+0300 (Eastern European Summer Time)',
    ),
  );
  return (
    <CardBase
      css={notifyCard}
      noShadow
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}>
      <Indicator isVisible={!isRead}>
        <Badge color={badgeColor} css={notifyBadge}>
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
      {children ? <div css={childrenWrapper}>{children}</div> : null}
      <Typography
        variant="body1"
        weight="regular"
        css={notifyTime}
        color={theme.colors.greyDarker}>
        {timeAgo}
      </Typography>
    </CardBase>
  );
};

export default NotificationCard;
