import { CommonProps } from '@global-types/emotion';
import { Interpolation, Theme } from '@emotion/react';
import { ReactNode, MouseEventHandler } from 'react';
import { IconProps } from '@components/Icon/types';

export type ChipVariant = 'filled' | 'outlined';

export type ChipColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps extends CommonProps {
  label: ReactNode;
  title?: ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  disabled?: boolean;
  icon?: IconProps['name'];
  avatar?: ReactNode;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  deleteIcon?: IconProps['name'];
  showIcon?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  clickable?: boolean;
  css?: Interpolation<Theme>;
}
