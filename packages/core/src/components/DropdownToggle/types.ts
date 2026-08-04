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
  /**
   * Id of the element labelling the toggle.
   *
   * Re-declared because `ControlledButtonProps` omits it from the inherited
   * button attributes — that omission is about `dropdownProps.toggleButton`,
   * where Dropdown owns the wiring, not about this component's own surface.
   */
  'aria-labelledby'?: string;
  /** Id of the listbox the toggle controls. */
  'aria-controls'?: string;
  /**
   * Id of the element labelling the toggle.
   *
   * @deprecated Use `aria-labelledby` instead — `ariaLabelledby` is removed in
   * the next major release.
   */
  ariaLabelledby?: string;
  /**
   * Id of the listbox the toggle controls.
   *
   * @deprecated Use `aria-controls` instead — `ariaControls` is removed in the
   * next major release.
   */
  ariaControls?: string;
  colors?: Array<string | undefined>;
  className?: string;
  selectedCount?: number;
  status?: 'basic' | 'error' | 'success';
}

export interface MultipleStylesProps {
  theme: Theme;
  isOpen?: boolean;
}
