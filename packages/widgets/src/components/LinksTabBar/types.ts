import { SerializedStyles } from '@emotion/react';
import type { NavLinkProps } from 'react-router-dom';
import { CommonProps } from '@ssa-ui-kit/core';

export interface TabBarLink extends NavLinkProps {
  id: string;
  css?: SerializedStyles;
}

export interface LinksTabBarProps extends CommonProps {
  links: Array<TabBarLink>;
}
