import { IMapIcons } from '@ssa-ui-kit/core';

export interface INotificationCardProps {
  title: string | JSX.Element;
  text: string | JSX.Element;
  isRead: boolean;
  badgeColor: string;
  iconName: keyof IMapIcons;
  time: string | number;
  children?: React.ReactNode;
  onClick?: () => void;
}
