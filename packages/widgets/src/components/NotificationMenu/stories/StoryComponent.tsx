import { useEffect, useState } from 'react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Button, ButtonGroup, ButtonGroupItem } from '@ssa-ui-kit/core';
import { NotificationCardProps } from '@components/NotificationCard';
import { NotificationMenu } from '../NotificationMenu';
import { MarkAllReadButton, Trigger } from './StoryContent';
import {
  disableButton,
  divideOnSubArr,
  getMockData,
  notificationData,
  readAll,
} from '../helpers';
import { ButtonGroupCustom } from '../styles';

export const StoryComponent = () => {
  const [notifications, setNotifications] = useState<NotificationCardProps[]>(
    [],
  );
  const [readNotifications, setReadNotifications] = useState<
    NotificationCardProps[]
  >([]);
  const [buttonItems, setButtonItems] = useState<ButtonGroupItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const unreadQty = divideOnSubArr(notifications).Unread.length;

  const handleClickOpen = () => () => {
    if (!isLoading) return;
    setButtonItems(notificationData.groupButtonItems);
    getMockData().then((data) => {
      setIsLoading(false);
      setNotifications(data.notificationItems);
      setReadNotifications(data.notificationItems);
    });
  };

  useEffect(() => {
    handleClickOpen();
    if (!unreadQty) {
      setButtonItems(disableButton(buttonItems, notifications));
    }
  }, [isLoading]);

  const handleClickReadAll = () => {
    setReadNotifications(readAll(notifications));
    setButtonItems(disableButton(buttonItems, notifications));
  };

  const handleClick = (item: Pick<ButtonGroupItem, 'id' | 'text'>) => {
    setReadNotifications(divideOnSubArr(notifications)[item.text]);
  };

  return (
    <MemoryRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <NotificationMenu
              trigger={<Trigger />}
              onClick={handleClickOpen()}
              notifications={readNotifications}
              leftButton={
                unreadQty ? (
                  <MarkAllReadButton onClick={() => handleClickReadAll()} />
                ) : null
              }
              rightButton={
                <Link to={'/'} css={{ gridColumn: 2 }}>
                  <Button variant="info" text="View all notification" />
                </Link>
              }
              isLoading={isLoading}>
              <ButtonGroup
                items={buttonItems}
                buttonStyles={ButtonGroupCustom}
                onClick={(item) => handleClick(item)}
              />
            </NotificationMenu>
          }></Route>
      </Routes>
    </MemoryRouter>
  );
};
