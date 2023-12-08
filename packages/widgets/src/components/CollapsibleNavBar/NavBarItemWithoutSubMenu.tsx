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
  const { path, iconName, title, iconSize, css } = item;
  const Icon = () => (
    <TriggerIcon iconName={iconName} iconSize={iconSize} css={{ ...css }} />
  );

  return (
    <CollapsibleNavBarItem key={path}>
      <CollapsibleNavBarLink to={'/' + path}>
        <CollapsibleNavBarPopover triggerIcon={<Icon />} title={title} />
        <Icon />
        <span>{title}</span>
      </CollapsibleNavBarLink>
    </CollapsibleNavBarItem>
  );
};
