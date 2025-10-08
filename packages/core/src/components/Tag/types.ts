import { CommonProps } from '@global-types/emotion';
import { Interpolation, Theme } from '@emotion/react';

export interface CustomTagStyles {
  color?: string;
  background?: string;
  border?: string;
  boxShadow?: string;
  css?: Interpolation<Theme>;
}

export interface TagsProps extends CommonProps {
  color?: keyof MainColors;
  size?: keyof MainSizes;
  children: React.ReactNode;
  customStyles?: CustomTagStyles;
}
