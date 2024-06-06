import { CommonProps } from '@global-types/emotion';

export interface TagsProps extends CommonProps {
  color?: keyof MainColors;
  size?: keyof MainSizes;
  children: React.ReactNode;
  className?: string;
}
