import { useEffect, useState } from 'react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonGroup } from '@ssa-ui-kit/core';
import { mainTheme } from '@ssa-ui-kit/core';
import { NotificationCardProps } from '@components/NotificationCard';
import { NotificationMenu } from './NotificationMenu';
import {
  ButtonItemProps,
  divideOnSubArr,
  disableButton,
  getMockData,
  readAll,
} from './helpers';
import {
  MarkAllReadButton,
  NotificationCardButtons,
  Trigger,
} from './stories/notificationMenuContent';

export default {
  title: 'Widgets/NotificationMenu',
  component: NotificationMenu,
} as Meta<typeof NotificationMenu>;

export const Default: StoryObj<typeof NotificationMenu> = () => {
  const [notifications, setNotifications] = useState<NotificationCardProps[]>(
    [],
  );
  const [read, setRead] = useState<NotificationCardProps[]>([]);
  const [button, setButton] = useState<ButtonItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClickOpen = () => {
    if (!isLoading) return;
    getMockData().then((data) => {
      setIsLoading(false);
      setNotifications(data.notificationItems);
      setRead(data.notificationItems);
      setButton(data.groupButtonItems);
    });
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickReadAll = () => {
    setRead(readAll(notifications));
    setButton(disableButton(button, notifications));
  };

  const handleClick = (item: Pick<ButtonItemProps, 'id' | 'text'>) => {
    setRead(divideOnSubArr(notifications)[item.text]);
  };

  const isRead = divideOnSubArr(notifications).Unread.length ? (
    <MarkAllReadButton onClick={() => handleClickReadAll()} />
  ) : null;

  return (
    <MemoryRouter initialEntries={['/*']}>
      <Routes>
        <Route
          path="/*"
          element={
            <NotificationMenu
              trigger={<Trigger />}
              onClick={() => handleClickOpen()}
              notifications={read}
              rightButton={
                <Link to={'/'} css={{ gridColumn: 2 }}>
                  <Button variant="info" text="View all notification" />
                </Link>
              }
              leftButton={isRead}
              isLoading={isLoading}
              notificationChildren={<NotificationCardButtons />}>
              <ButtonGroup
                items={button}
                buttonStyles={css`
                  margin: 12px 0 11px;
                  background: ${mainTheme.colors.white};
                  &:hover {
                    background: ${mainTheme.colors.greyLighter};
                  }

                  &[aria-disabled='true'] {
                    background: none;
                    box-shadow: none;
                    &:hover {
                      background: none;
                    }
                  }
                `}
                onClick={(item) => handleClick(item)}
              />
            </NotificationMenu>
          }></Route>
      </Routes>
    </MemoryRouter>
  );
};

Default.args = {};
