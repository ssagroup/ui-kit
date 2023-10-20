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
  ContentWrapper,
  ResetBtnStyles,
  Close,
  ButtonsWrapper,
  List,
} from './styles';
import { NotificationCard } from '@components/NotificationCard';

export const NotificationMenu = ({
  trigger,
  notifications,
  children,
  rightButton,
  leftButton,
}: NotificationMenuProps) => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger css={ResetBtnStyles}>{trigger}</PopoverTrigger>
      <PopoverContent className="popover" css={ContentWrapper}>
        <div css={{ width: '100%', padding: 20 }}>
          <PopoverClose css={Close}>
            <Icon name="cross" size={14} />
          </PopoverClose>
          <PopoverHeading variant="h5" weight="bold">
            Notification
          </PopoverHeading>
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
                    badgeColor={item.badgeColor}
                  />
                );
              })}
            </div>
          </PopoverDescription>
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
