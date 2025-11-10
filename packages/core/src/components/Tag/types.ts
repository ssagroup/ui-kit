import { Interpolation, Theme } from '@emotion/react';

import { CommonProps } from '@global-types/emotion';

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
