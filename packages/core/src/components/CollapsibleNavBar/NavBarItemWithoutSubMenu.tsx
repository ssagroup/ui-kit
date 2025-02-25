import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import { CollapsibleNavBarPopover } from './NavBarPopover';
import { TriggerIcon } from './TriggerIcon';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import { useCollapsibleNavBarContext } from './CollapsibleNavBarContext';
import * as T from './types';

export const NavBarItemWithoutSubMenu = ({
  item,
  onClick,
}: {
  item: T.CollapsibleNavBarItem;
  onClick?: () => void;
}) => {
  const { theme } = useCollapsibleNavBarContext();
  const { path, iconName, title, iconSize, css, CustomIcon } = item;
  const isExternalLink = path.includes('://');
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
        to={isExternalLink ? path : '/' + path}
        end
        onClick={onClick}
        navbartheme={theme}
        data-customicon={!!CustomIcon}>
        <CollapsibleNavBarPopover triggerIcon={<Icon />} title={title} />
        <Icon />
        <span>{title}</span>
      </CollapsibleNavBarLink>
    </CollapsibleNavBarItem>
  );
};
