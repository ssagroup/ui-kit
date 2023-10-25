export interface NotificationCardProps {
  title: string;
  text: string;
  isRead: boolean;
  type: string;
  time: string | number;
  children?: React.ReactNode;
  onClick?: () => void;
}
