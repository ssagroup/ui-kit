import { SerializedStyles } from '@emotion/react';
import type { NavLinkProps } from 'react-router-dom';
import { CommonProps } from '@global-types/emotion';

export interface TabBarLink extends NavLinkProps {
  id: string;
  css?: SerializedStyles;
}

export interface LinksTabBarProps extends CommonProps {
  links: Array<TabBarLink>;
}
