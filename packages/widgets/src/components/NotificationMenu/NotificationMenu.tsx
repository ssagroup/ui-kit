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
import { NotificationCard } from '@components/NotificationCard';
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

export const NotificationMenu = ({
  trigger,
  notifications,
  children,
  onClick,
  isLoading,
  rightButton,
  leftButton,
}: NotificationMenuProps) => {
  const theme = useTheme();
  return (
    <Popover placement="bottom-end">
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
            <div data-testid="element-wrapper">{children}</div>
          </PopoverHeading>
          {isLoading ? (
            <div css={Loading}></div>
          ) : (
            <PopoverDescription variant="body1">
              <div css={List}>
                {notifications.map((item, index) => {
                  return (
                    <NotificationCard
                      key={index}
                      title={item.title}
                      text={item.text}
                      type={item.type}
                      time={item.time}
                      isRead={item.isRead}
                    />
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
