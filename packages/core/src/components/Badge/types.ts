import { CommonProps } from '../..';

export interface BadgeProps extends CommonProps {
  color?: keyof MainColors;
  size?: keyof MainSizes;
  children?: React.ReactNode;
}
