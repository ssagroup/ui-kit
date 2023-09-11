import type { UseFormReturn } from 'react-hook-form';
import type { Interpolation, Theme } from '@emotion/react';

export interface InputProps extends Partial<Pick<UseFormReturn, 'register'>> {
  name: string;
  status?: keyof InputStatusColors;
  type?: string;
  placeholder?: string;
  validationSchema?: Record<string, unknown>;
  disabled?: boolean;
  className?: string;
  as?: React.ElementType;
  startElement?: React.ReactElement;
  endElement?: React.ReactElement;
  css?: Interpolation<Theme>;
}

export interface InputStatusColors {
  basic: Interpolation<Theme>;
  error: Interpolation<Theme>;
  success: Interpolation<Theme>;
}

export type InputColors = keyof Theme['colors'];
