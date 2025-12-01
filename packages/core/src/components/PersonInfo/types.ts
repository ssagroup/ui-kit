import { ReactNode } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';
import { IconProps } from '../Icon/types';

type PersonInfoStyleKeys =
  | 'title'
  | 'avatarName'
  | 'counter'
  | 'attributes'
  | 'badge'
  | 'badgeItem'
  | 'value'
  | 'description';

export type PersonInfoStyles = Partial<
  Record<PersonInfoStyleKeys, Interpolation<Theme>>
>;

export interface PersonInfoProps extends CommonProps {
  title: string;
  icon?: IconProps['name'] | ReactNode;
  value?: string;
  badges?: ReactNode | (string | ReactNode)[];
  avatar?: string;
  counter?: string | number;
  attributes?: (string | ReactNode)[];
  description?: string;
  styles?: PersonInfoStyles;
  link?: string;
  openLinkInNewTab?: boolean;
}
