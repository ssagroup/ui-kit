import { SerializedStyles } from '@emotion/react';
import type { LinkProps } from 'react-router-dom';
import { CommonProps } from '@ssa-ui-kit/core';

export interface NavTabBarLink extends LinkProps {
  id: string;
  css?: SerializedStyles;
}

export interface NavigationTabBarProps extends CommonProps {
  links: Array<NavTabBarLink>;
}
