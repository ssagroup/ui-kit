import { useEffect, useState } from 'react';
import { Notification } from '@/fintech/types';
import { notificationsQueryMock } from './__mocks__/useNotifications';

type UseNotificationsProps = {
  page: number;
  rowsPerPage: number;
  showUnread: boolean;
  enabled?: boolean;
  isPopover?: boolean;
};

export const useNotifications = ({
  page,
  rowsPerPage,
}: UseNotificationsProps) => {
  const [data, setData] = useState(notificationsQueryMock.data);
  const [pageItems, setPageItems] = useState<Notification[]>([]);

  useEffect(() => {
    const newPageItems = data.items.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage,
    );
    setPageItems(newPageItems);
  }, [page, rowsPerPage]);

  const handleMarkReadAll = () => {
    const newItems = data.items.map((item) => ({
      ...item,
      readAt: '2024-10-08T06:27:31.521975Z',
    }));
    const readPageItems = pageItems.map((item) => ({
      ...item,
      readAt: '2024-10-08T06:27:31.521975Z',
    }));
    setData({
      ...data,
      items: newItems,
      unreadCount: 0,
      readCount: 100,
    });
    setPageItems(readPageItems);
  };

  return {
    isFetching: false,
    data: {
      ...data,
      items: pageItems,
    },
    error: null as Error | null,
    isPlaceholderData: false,
    handleMarkReadAll,
  };
};
