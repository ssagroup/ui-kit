import { ItemWithSubMenu, ItemWithoutSubmenu } from '.';
import { CollapsibleNavBarExtendedProps } from '../types';

type NavBarItemProps = {
  item: CollapsibleNavBarExtendedProps['items'][0];
  useMatchPattern?: CollapsibleNavBarExtendedProps['useMatchPattern'];
  onClick: () => void;
};

export const NavBarItem = ({
  item,
  useMatchPattern,
  onClick,
}: NavBarItemProps) => {
  return 'items' in item ? (
    <ItemWithSubMenu.Item
      item={item}
      onClick={onClick}
      useMatchPattern={useMatchPattern}
    />
  ) : (
    <ItemWithoutSubmenu.Item item={item} onClick={onClick} />
  );
};
