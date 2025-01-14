import { Notification } from '@fintech/types';

export interface UnreadNotificationCardProps {
  notification: Notification;
  onRead: (arg: Notification) => void;
}

export interface ReadNotificationCardProps {
  notification: Notification;
}

export interface NotificationsListProps {
  notifications: Notification[];
  onRead: (arg: Array<Notification['id']>) => void;
}
