import { small, medium, large } from './styles';

export const VARIANTS = {
  OUTLINED: 'outlined',
  FILLED: 'filled',
} as const;

export const COLORS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  ERROR: 'error',
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
