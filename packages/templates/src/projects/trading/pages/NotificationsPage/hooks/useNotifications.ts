import { notificationsQueryMock } from './__mocks__/useNotifications';

// type UseNotificationsProps = {
//   page: number;
//   rowsPerPage: number;
//   showUnread: boolean;
//   enabled?: boolean;
//   isPopover?: boolean;
// };

// export const useNotifications = ({
//   page,
//   rowsPerPage,
//   showUnread,
//   enabled = true,
//   isPopover = false,
// }: UseNotificationsProps) => {

export const useNotifications = () => {
  const { data } = notificationsQueryMock;

  return {
    isFetching: false,
    data,
    error: null as Error | null,
    isPlaceholderData: false,
  };
};
