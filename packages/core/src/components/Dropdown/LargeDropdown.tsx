import { ItemTemplateLarge } from './DropdownItemTemplate';
import { IDropdownLargeItemProp, LargeDropdownPropsType } from './types';
import Dropdown from './Dropdown';

export const LargeDropdown = ({
  items,
  selectedItem,
  isDisabled,
  placeholder,
  onChange,
}: LargeDropdownPropsType) => {
  return (
    <Dropdown<IDropdownLargeItemProp>
      itemTemplate={ItemTemplateLarge}
      items={items}
      selectedItem={selectedItem}
      onChange={onChange}
      isDisabled={isDisabled}
      placeholder={placeholder}
    />
  );
};
