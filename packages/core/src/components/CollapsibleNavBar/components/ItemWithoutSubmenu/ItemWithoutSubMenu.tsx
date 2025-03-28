import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useCollapsibleNavBarContext,
  CollapsibleNavBarItemProvider,
} from '@components/CollapsibleNavBar';
import * as T from '../../types';
import { ItemWithSubMenu } from '..';
import { CollapsibleNavBarLink } from '../CollapsibleNavBarLink';
import { CollapsibleNavBarPopover } from '../NavBarPopover';
import { TriggerIcon } from '../TriggerIcon';

export const Item = ({
  item,
  onClick,
}: {
  item: T.CollapsibleNavBarItem;
  onClick?: () => void;
}) => {
  const { theme } = useCollapsibleNavBarContext();
  const { path, iconName, title, iconSize, css, CustomIcon } = item;
  const isExternalLink = path.includes('://');

  const linkRef = useRef<HTMLAnchorElement>(null);
  const classNamesList = Array.from(linkRef.current?.classList || []);

  const [isActive, setIsActive] = useState(classNamesList.includes('active'));
  const [isHover, setIsHover] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const classNamesList = Array.from(linkRef.current?.classList || []);
    setIsActive(classNamesList.includes('active'));
  }, [pathname]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    const classNamesList = Array.from(linkRef.current?.classList || []);
    setIsActive(classNamesList.includes('active'));
  }, [pathname]);

  const Icon = () => (
    <TriggerIcon
      iconName={iconName}
      iconSize={iconSize}
      CustomIcon={CustomIcon}
      css={{ ...css }}
    />
  );

  return (
    <CollapsibleNavBarItemProvider isActive={isActive} isHover={isHover}>
      <ItemWithSubMenu.CollapsibleNavBarItem key={path}>
        <CollapsibleNavBarLink
          to={isExternalLink ? path : '/' + path}
          end
          onClick={onClick}
          ref={linkRef}
          navbartheme={theme}
          data-customicon={!!CustomIcon}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <CollapsibleNavBarPopover triggerIcon={<Icon />} title={title} />
          <Icon />
          <span>{title}</span>
        </CollapsibleNavBarLink>
      </ItemWithSubMenu.CollapsibleNavBarItem>
    </CollapsibleNavBarItemProvider>
  );
};
