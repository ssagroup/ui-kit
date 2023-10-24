import { Interpolation, Theme } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';

export interface TagsProps extends CommonProps {
  color?: keyof MainColors;
  size?: keyof MainSizes;
  extraCSS?: Interpolation<Theme>;
  children: React.ReactNode;
}
