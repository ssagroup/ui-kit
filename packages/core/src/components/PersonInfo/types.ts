import { ReactNode } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';
import { IconProps } from '../Icon/types';
import { getLinkAttributes } from './helpers';

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

export interface PersonInfoCounterTooltipUser {
  id?: string | number;
  name: string;
  avatar: string;
  link?: string;
  openLinkInNewTab?: boolean;
}

export interface PersonInfoCounterTooltip {
  users: PersonInfoCounterTooltipUser[];
}

export type PersonInfoLinkAttributes = ReturnType<typeof getLinkAttributes>;

export interface PersonInfoValueProps {
  value: string;
  counterTooltip?: PersonInfoCounterTooltip;
  css?: Interpolation<Theme>;
  counterCss?: Interpolation<Theme>;
  linkAttributes?: PersonInfoLinkAttributes;
}

export interface PersonInfoProps extends CommonProps {
  title: string;
  icon?: IconProps['name'] | ReactNode;
  value?: string;
  badges?: ReactNode | (string | ReactNode)[];
  avatar?: string;
  counterTooltip?: PersonInfoCounterTooltip;
  attributes?: (string | ReactNode)[];
  description?: string;
  styles?: PersonInfoStyles;
  link?: string;
  openLinkInNewTab?: boolean;
}

export interface PersonInfoAvatarProps {
  avatar?: string;
  value?: string;
  counterTooltip?: PersonInfoCounterTooltip;
  styles?: PersonInfoStyles;
  link?: string;
  openLinkInNewTab?: boolean;
}
