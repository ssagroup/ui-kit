import { NotificationCardProps } from '@components/NotificationCard';

export interface NotificationMenuProps {
  trigger: string | JSX.Element;
  notifications: Array<NotificationCardProps>;
  children: React.ReactNode;
  onClick?: () => void;
  isLoading: boolean;
  leftButton?: string | JSX.Element | null;
  rightButton?: string | JSX.Element;
}
