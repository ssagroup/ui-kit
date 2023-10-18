import { IMapIcons, MainColors } from '@ssa-ui-kit/core';

export interface NotificationCardProps {
  title: string;
  text: string;
  isRead: boolean;
  badgeColor: keyof MainColors;
  iconName: keyof IMapIcons;
  time: string | number;
  children?: React.ReactNode;
  onClick?: () => void;
}
