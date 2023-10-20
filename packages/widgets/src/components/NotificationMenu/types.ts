import { NotificationCardProps } from '@components/NotificationCard';

export interface NotificationMenuProps {
  trigger: string | JSX.Element;
  notifications: Array<NotificationCardProps>;
  children: React.ReactNode;
  rightButton?: string | JSX.Element;
  leftButton?: string | JSX.Element;
}
