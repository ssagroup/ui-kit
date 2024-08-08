import React from 'react';
import { iconsList } from './icons/iconsList';

export interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  tooltip?: string;
}

export interface IconProps extends Omit<SVGProps, 'fill'> {
  name: keyof MapIconsType;
}

export type MapIconsType = {
  [key in (typeof iconsList)[number]]: React.ElementType;
};
