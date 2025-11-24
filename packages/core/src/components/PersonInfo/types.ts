import { ReactNode } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';
import { IconProps } from '../Icon/types';

export interface PersonInfoStyles {
  title?: Interpolation<Theme>;
  avatarName?: Interpolation<Theme>;
  counter?: Interpolation<Theme>;
  attributes?: Interpolation<Theme>;
  badge?: Interpolation<Theme>;
  badgeItem?: Interpolation<Theme>;
  value?: Interpolation<Theme>;
  description?: Interpolation<Theme>;
}

export interface PersonInfoProps extends CommonProps {
  title: string;
  icon?: IconProps['name'] | ReactNode;
  value?: string;
  badge?: ReactNode | (string | ReactNode)[];
  avatar?: string;
  counter?: string | number;
  attributes?: (string | ReactNode)[];
  description?: string;
  styles?: PersonInfoStyles;
}
