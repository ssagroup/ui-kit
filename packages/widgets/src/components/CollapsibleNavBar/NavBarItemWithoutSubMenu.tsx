import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import { CollapsibleNavBarPopover } from './NavBarPopover';
import { TriggerIcon } from './TriggerIcon';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import * as T from './types';

export const NavBarItemWithoutSubMenu = ({
  item,
  pathname,
}: {
  item: T.CollapsibleNavBarItem;
  pathname: string;
}) => {
  const { path, iconName, title, iconSize } = item;
  return (
    <CollapsibleNavBarItem key={path}>
      <CollapsibleNavBarLink
        to={'/' + path}
        active={pathname === path ? true : undefined}>
        <CollapsibleNavBarPopover
          triggerIcon={
            <TriggerIcon
              iconName={iconName}
              iconSize={iconSize}
              css={{ marginRight: 20 }}
            />
          }
          title={title}
        />
        <TriggerIcon
          iconName={iconName}
          iconSize={iconSize}
          css={{ marginRight: 20 }}
        />
        <span>{title}</span>
      </CollapsibleNavBarLink>
    </CollapsibleNavBarItem>
  );
};
