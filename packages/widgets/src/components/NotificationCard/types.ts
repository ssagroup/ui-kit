export interface NotificationCardProps {
  title: string;
  text: string;
  isRead: boolean;
  type: 'Informational' | 'Warning' | 'Error';
  time: string | number;
  children?: React.ReactNode;
  onClick?: () => void;
}
