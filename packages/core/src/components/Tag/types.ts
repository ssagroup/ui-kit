import { CommonProps } from '../..';

export interface TagsProps extends CommonProps {
  color?: keyof MainColors;
  size?: keyof MainSizes;
  children: React.ReactNode;
}
