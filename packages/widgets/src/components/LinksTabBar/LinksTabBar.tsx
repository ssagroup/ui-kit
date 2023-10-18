import { NavLink } from 'react-router-dom';

import { LinksTabBarProps } from './types';
import { LinksTabBarBase } from './LinksTabBarBase';

export const LinksTabBar = ({ as, className, links }: LinksTabBarProps) => {
  return (
    <LinksTabBarBase as={as} className={className}>
      {links.map(({ id, ...props }) => (
        <NavLink key={id} {...props} />
      ))}
    </LinksTabBarBase>
  );
};
