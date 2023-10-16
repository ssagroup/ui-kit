import { SerializedStyles } from '@emotion/react';
import type { NavLinkProps } from 'react-router-dom';
import { CommonProps } from '@ssa-ui-kit/core';

export interface NavTabBarLink extends NavLinkProps {
  id: string;
  css?: SerializedStyles;
}

export interface NavigationTabBarProps extends CommonProps {
  links: Array<NavTabBarLink>;
}
