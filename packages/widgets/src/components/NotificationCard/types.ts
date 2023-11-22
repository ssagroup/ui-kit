export type NotificationType = 'Informational' | 'Warning' | 'Error';

export interface NotificationCardProps {
  title: string;
  text: string;
  isRead: boolean;
  type: NotificationType;
  time: string | number;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
