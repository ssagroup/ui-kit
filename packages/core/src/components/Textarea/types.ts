import { ReactEventHandler } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export interface TextareaProps
  extends Partial<Pick<UseFormReturn, 'register'>> {
  name: string;
  placeholder?: string;
  validationSchema?: Record<string, unknown>;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  as?: React.ElementType;
  className?: string;
  title?: string;
  setCountChar?: ReactEventHandler;
}
