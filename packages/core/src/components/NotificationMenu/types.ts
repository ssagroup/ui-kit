import { NotificationCardProps } from '@components/NotificationCard';

export interface NotificationMenuProps {
  trigger: string | React.JSX.Element;
  notifications: Array<NotificationCardProps>;
  children: React.ReactNode;
  onClick?: () => void;
  isLoading: boolean;
  leftButton?: string | React.JSX.Element | null;
  rightButton?: string | React.JSX.Element;
}
