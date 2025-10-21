import React from 'react';

import { Theme } from '@emotion/react';

import { CommonProps } from '@global-types/emotion';

export interface DropdownToggleProps extends CommonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLButtonElement, Element>) => void;
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
  selectedCount?: number;
}
