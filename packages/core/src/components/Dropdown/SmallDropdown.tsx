import { ItemTemplateSmall } from './DropdownItemTemplate';
import { SmallDropdownPropsType, IDropdownItemProp } from './types';
import Dropdown from './Dropdown';

export const SmallDropdown = ({
  items,
  selectedItem,
  isDisabled,
  placeholder,
  onChange,
}: SmallDropdownPropsType) => {
  return (
    <Dropdown<IDropdownItemProp>
      itemTemplate={ItemTemplateSmall}
      items={items}
      selectedItem={selectedItem}
      onChange={onChange}
      isDisabled={isDisabled}
      placeholder={placeholder}
    />
  );
};
