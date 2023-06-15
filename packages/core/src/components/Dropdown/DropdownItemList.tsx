// @ts-nocheck
import styled from '@emotion/styled';
import { DropdownItem } from './DropdownItem';
import { IDropdownItemProp, IDropdownItemsListProps } from './types';

export const DropdownItemListBase = styled.ul<{ tabindex?: string }>`
  position: absolute;
  margin: 4px 0 0 0;
  list-style: none;
  padding: 0;
  background: #ffffff;
  filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
  -webkit-backdrop-filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
  border-radius: 8px;
  max-height: 204px;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 2;
`;

const noItemsMsg = { id: Number.NaN, val: 'No items' };

export const DropdownItemList = <T extends IDropdownItemProp>({
  itemTemplate: ItemTemplate,
  items,
  activeItem,
  onChange,
  ariaLabelledby,
  id,
}: IDropdownItemsListProps<T>) => {
  return (
    <DropdownItemListBase
      id={id}
      role="listbox"
      aria-labelledby={ariaLabelledby}
      tabindex="-1">
      {items?.length > 0 ? (
        items.map((item) => (
          <DropdownItem
            key={item.id}
            isActive={item.id === activeItem?.id}
            onClick={() => onChange(item)}>
            <ItemTemplate item={item} />
          </DropdownItem>
        ))
      ) : (
        <DropdownItem isActive={false} onClick={() => onChange(null)} noHover>
          <ItemTemplate item={noItemsMsg} />
        </DropdownItem>
      )}
    </DropdownItemListBase>
  );
};
