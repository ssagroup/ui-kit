import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import { CollapsibleNavBarPopover } from './NavBarPopover';
import { TriggerIcon } from './TriggerIcon';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import * as T from './types';

export const NavBarItemWithoutSubMenu = ({
  item,
  navBarTheme,
  onClick,
}: {
  item: T.CollapsibleNavBarItem;
  navBarTheme: T.CollapsibleNavBarExtendedProps['theme'];
  onClick?: () => void;
}) => {
  const { path, iconName, title, iconSize, css, CustomIcon } = item;
  const Icon = () => (
    <TriggerIcon
      iconName={iconName}
      iconSize={iconSize}
      CustomIcon={CustomIcon}
      css={{ ...css }}
    />
  );

  return (
    <CollapsibleNavBarItem key={path}>
      <CollapsibleNavBarLink
        to={'/' + path}
        onClick={onClick}
        navBarTheme={navBarTheme}>
        <CollapsibleNavBarPopover triggerIcon={<Icon />} title={title} />
        <Icon />
        <span>{title}</span>
      </CollapsibleNavBarLink>
    </CollapsibleNavBarItem>
  );
};
