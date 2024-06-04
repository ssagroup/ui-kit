import { CommonProps } from '@global-types/emotion';
import { MainColors, MainSizes } from '../..';

export interface TagsProps extends CommonProps {
  color?: keyof MainColors;
  size?: keyof MainSizes;
  children: React.ReactNode;
}
