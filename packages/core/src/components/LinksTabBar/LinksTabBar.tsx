import { NavLink } from 'react-router-dom';

import { LinksTabBarBase } from './LinksTabBarBase';
import { LinksTabBarProps } from './types';

export const LinksTabBar = ({ as, className, links }: LinksTabBarProps) => {
  return (
    <LinksTabBarBase as={as} className={className}>
      {links.map(({ id, ...props }) => (
        <NavLink key={id} {...props} />
      ))}
    </LinksTabBarBase>
  );
};
