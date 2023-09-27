import React from 'react';
import { CommonProps } from '@global-types/emotion';
import { iconsList } from './icons/iconsList';

export interface IconProps extends CommonProps {
  name: keyof IMapIcons;
  color?: string;
  size?: number;
}

export type IMapIcons = {
  [key in (typeof iconsList)[number]]: React.ElementType;
};

export interface SVGProps {
  fill?: string;
  size?: number;
}
