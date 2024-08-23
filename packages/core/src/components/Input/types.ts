import { BaseSyntheticEvent, KeyboardEventHandler } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { Interpolation, Theme } from '@emotion/react';

interface ExtendedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  'data-testid'?: string;
}

export interface InputProps
  extends Partial<Pick<UseFormReturn, 'register' | 'control' | 'setValue'>> {
  name: string;
  status?: keyof InputStatusColors;
  type?: string;
  placeholder?: string;
  validationSchema?: Record<string, unknown>;
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
  as?: React.ElementType;
  startElement?: React.ReactElement;
  endElement?: React.ReactElement;
  css?: Interpolation<Theme>;
  inputProps?: ExtendedInputProps;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  onStartElementClick?: (event: BaseSyntheticEvent) => void;
  onEndElementClick?: (event: BaseSyntheticEvent) => void;
}

export interface InputStatusColors {
  basic: Interpolation<Theme>;
  error: Interpolation<Theme>;
  success: Interpolation<Theme>;
  custom: Interpolation<Theme>;
}

export type InputColors = keyof Theme['colors'];
