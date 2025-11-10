import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import {
  Typography,
  usePaginationContext,
  WithPagination,
} from '@ssa-ui-kit/core';

import { useTranslation } from '@contexts';
import { ROWS_PER_PAGE_LIST } from '@/fintech/components';

import {
  ALL_FILTER_ID,
  Footer,
  NoNotifications,
  NotificationFilters,
  NotificationsList,
  UNREAD_FILTER_ID,
} from './components';
import { useNotifications, useReadManyMutation } from './hooks';

const MAX_UNREAD_TO_SHOW = 100;
const MIN_UNREAD_TO_SHOW = 10;

const Notifications: React.FC<object> = () => {
  const { setPage, page } = usePaginationContext();
  const [searchParams] = useSearchParams();
  const isUnreadParam = Boolean(searchParams.get('unread'));
  const [rowsPerPage, setRowsPerPage] = useState(
    isUnreadParam ? MIN_UNREAD_TO_SHOW : MAX_UNREAD_TO_SHOW,
  );
  const [showUnread, setShowUnread] = useState(!isUnreadParam);
  const { t } = useTranslation();

  const { isFetching, error, data, isPlaceholderData, handleMarkReadAll } =
    useNotifications({
      page: page || 1,
      rowsPerPage,
      showUnread,
    });

  const readManyMutation = useReadManyMutation({
    onSuccess() {
      if (showUnread) {
        return;
      }
    },
  });

  useEffect(() => {
    setPage(1);
    if (!showUnread) {
      setRowsPerPage(ROWS_PER_PAGE_LIST[1].value);
    }
  }, [showUnread, setPage]);

  const { items: notifications, totalCount, unreadCount } = data;
  const isReadAllDisabled = unreadCount === 0;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <div
        css={{
          marginBottom: '20px',
          marginTop: '25px',
        }}>
        <NotificationFilters
          selectedItemId={showUnread ? UNREAD_FILTER_ID : ALL_FILTER_ID}
          unreadFilter={{
            isDisabled: isPlaceholderData || isFetching || unreadCount === 0,
            isShown: true,
            text: `${t('pages.notifications.unreadFilterText').replace(
              '%',
              isFetching || unreadCount === 0
                ? ''
                : `(${
                    unreadCount > MAX_UNREAD_TO_SHOW
                      ? MAX_UNREAD_TO_SHOW
                      : unreadCount
                  }) `,
            )}`,
          }}
          allFilter={{
            isDisabled: isPlaceholderData || isFetching,
            isShown: true,
            text: `${t('pages.notifications.allFilterText')}${
              isFetching && totalCount === 0 ? '' : ` (${totalCount})`
            }`,
          }}
          onClick={({ id }) => {
            setShowUnread(id === UNREAD_FILTER_ID);
            setRowsPerPage(id === UNREAD_FILTER_ID ? MAX_UNREAD_TO_SHOW : 10);
          }}
        />
      </div>

      {!isFetching && !notifications?.length && (
        <NoNotifications>
          {t(
            `pages.notifications.${
              showUnread ? 'noUnreadItemsMsg' : 'noItemsMsg'
            }`,
          )}
        </NoNotifications>
      )}

      {isFetching && !notifications?.length && (
        <Typography variant="body1" css={{ fontSize: '20px' }}>
          Loading...
        </Typography>
      )}
      {notifications?.length > 0 && (
        <NotificationsList
          notifications={notifications}
          onRead={(arg) => {
            readManyMutation.mutate(arg);
          }}
        />
      )}

      {!showUnread || (isFetching && notifications.length > 0) ? (
        <Footer
          isHidden={isFetching && !notifications?.length}
          isReadAllDisabled={isReadAllDisabled}
          onReadAllClick={() => handleMarkReadAll()}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setPage(1);
          }}
          isPaginationDisabled={isFetching}
          pagesCount={Math.ceil(totalCount / rowsPerPage)}
        />
      ) : null}
      <Outlet />
    </>
  );
};

export const NotificationsPage =
  WithPagination<React.ComponentProps<typeof Notifications>>(Notifications);
