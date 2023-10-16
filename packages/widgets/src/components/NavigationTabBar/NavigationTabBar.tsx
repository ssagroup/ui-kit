import { Link } from 'react-router-dom';

import { NavigationTabBarProps } from './types';
import { NavigationTabBarBase } from './NavigationTabBarBase';

export const NavigationTabBar = ({
  as,
  className,
  links,
}: NavigationTabBarProps) => {
  return (
    <NavigationTabBarBase as={as} className={className}>
      {links.map(({ id, ...props }) => (
        <Link key={id} {...props} />
      ))}
    </NavigationTabBarBase>
  );
};
