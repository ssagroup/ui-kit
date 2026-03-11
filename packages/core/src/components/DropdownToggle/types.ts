import React from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';
import { ControlledButtonProps } from '@components/Dropdown/types';

export interface DropdownToggleProps
  extends
    CommonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, ControlledButtonProps> {
  /** Emotion css prop forwarded to the underlying styled button */
  css?: Interpolation<Theme>;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement, Element>) => void;
  isOpen: boolean;
  isMultiple?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  ariaLabelledby: string;
  ariaControls: string;
  colors?: Array<string | undefined>;
  className?: string;
  selectedCount?: number;
}

export interface MultipleStylesProps {
  theme: Theme;
  isOpen?: boolean;
}
