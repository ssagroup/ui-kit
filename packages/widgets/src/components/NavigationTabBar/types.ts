import { SerializedStyles } from '@emotion/react';
import type { LinkProps } from 'react-router-dom';
import { CommonProps } from '@ssa-ui-kit/core';

export interface INavTabBarLink extends LinkProps {
  id: string;
  css?: SerializedStyles;
}

export interface INavigationTabBarProps extends CommonProps {
  links: Array<INavTabBarLink>;
}
