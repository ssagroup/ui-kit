import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import { CollapsibleNavBarPopover } from './NavBarPopover';
import { TriggerIcon } from './TriggerIcon';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import * as T from './types';

export const NavBarItemWithoutSubMenu = ({
  item,
}: {
  item: T.CollapsibleNavBarItem;
}) => {
  const { path, iconName, title, iconSize } = item;
  return (
    <CollapsibleNavBarItem key={path}>
      <CollapsibleNavBarLink to={'/' + path}>
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
