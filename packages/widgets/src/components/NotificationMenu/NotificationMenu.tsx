import { useTheme } from '@emotion/react';
import {
  Icon,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from '@ssa-ui-kit/core';
import { NotificationMenuProps } from './types';
import {
  ResetBtnStyles,
  Close,
  ButtonsWrapper,
  List,
  Loading,
  PopoverWrapper,
  PopoverContentWrapper,
} from './styles';
import { NotificationCard } from '@components/NotificationCard';

export const NotificationMenu = ({
  trigger,
  notifications,
  children,
  onClick,
  isLoading,
  notificationChildren,
  rightButton,
  leftButton,
}: NotificationMenuProps) => {
  const theme = useTheme();
  return (
    <Popover placement="bottom-end" initialOpen={true}>
      <PopoverTrigger onClick={onClick} css={ResetBtnStyles}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="popover" css={PopoverWrapper}>
        <div css={PopoverContentWrapper}>
          <PopoverClose css={Close}>
            <Icon name="cross" size={14} color={theme.colors.greyGraphite70} />
          </PopoverClose>
          <PopoverHeading variant="h5" weight="bold">
            Notification
          </PopoverHeading>
          {isLoading ? (
            <div css={Loading}></div>
          ) : (
            <PopoverDescription variant="body1">
              <div>{children}</div>
              <div css={List}>
                {notifications.map((item, index) => {
                  return (
                    <NotificationCard
                      key={index}
                      title={item.title}
                      text={item.text}
                      iconName={item.iconName}
                      time={item.time}
                      isRead={item.isRead}
                      badgeColor={item.badgeColor}>
                      {item.children ? notificationChildren : null}
                    </NotificationCard>
                  );
                })}
              </div>
            </PopoverDescription>
          )}
        </div>
        {rightButton || leftButton ? (
          <div css={ButtonsWrapper}>
            {leftButton}
            {rightButton}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};
