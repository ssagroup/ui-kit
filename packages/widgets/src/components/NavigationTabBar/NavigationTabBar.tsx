import { Link } from 'react-router-dom';

import { INavigationTabBarProps } from './types';
import { NavigationTabBarBase } from './NavigationTabBarBase';

const NavigationTabBar = ({ as, className, links }: INavigationTabBarProps) => {
  return (
    <NavigationTabBarBase as={as} className={className}>
      {links.map(({ id, ...props }) => (
        <Link key={id} {...props} />
      ))}
    </NavigationTabBarBase>
  );
};

export default NavigationTabBar;
