import { small, medium, large } from './styles';

export const VARIANTS = {
  OUTLINED: 'outlined',
  FILLED: 'filled',
} as const;

export const COLORS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;

export const mapSizes = {
  small,
  medium,
  large,
};

export const ICON_SIZES = {
  small: 12,
  medium: 14,
  large: 16,
} as const;
