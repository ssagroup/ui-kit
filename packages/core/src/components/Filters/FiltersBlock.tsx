import React, { useEffect, useRef } from 'react';
import { useTheme } from '@emotion/react';
import DropdownOption from '@components/DropdownOption';
import MultipleDropdown from '@components/MultipleDropdown';
import { useFiltersContext } from './FiltersContext';
import { useFiltersBlock } from './hooks/useFiltersBlock';

export const FiltersBlock = () => {
  const theme = useTheme();
  const { setElementRef, checkboxData } = useFiltersContext();
  const { selectedItemsWithValue, handleOnChange } = useFiltersBlock();
  const selectedItemsRef = useRef(selectedItemsWithValue);

  console.log('%c Rendering...', 'background: #222; color: #bada55');
  useEffect(() => {
    console.log('RENDER > handleOnChange');
  }, [handleOnChange]);

  useEffect(() => {
    console.log('RENDER > selectedItemsWithValue');
    selectedItemsRef.current = selectedItemsWithValue;
  }, [selectedItemsWithValue]);

  console.log('>>>REF', selectedItemsRef.current);
  return (
    <React.Fragment>
      {Object.keys(checkboxData).map((groupName) => {
        const accordionInfo = checkboxData[groupName];
        const selectedItems = selectedItemsRef.current[groupName];
        console.log('>>>FiltersBlock > map > selectedItems', selectedItems);
        return (
          <MultipleDropdown
            key={accordionInfo.id}
            showPlaceholder={false}
            label={accordionInfo.title}
            ref={(element) => {
              setElementRef(accordionInfo.id, element);
            }}
            onChange={handleOnChange(groupName)}
            // onChange={(selectedItem, isSelected) => {
            //   console.log('>>>onChange props', selectedItem, isSelected);
            // }}
            selectedItems={selectedItems}
            css={{
              padding: '11px 15px 9px 10px',
              '& + ul': {
                minWidth: 150,
                maxHeight: '50vh',
              },
              [theme.mediaQueries.md]: {
                padding: '0 15px 0 10px',
              },
            }}>
            {Object.keys(accordionInfo.items).map((itemKey) => {
              const item = accordionInfo.items[itemKey];
              return (
                <DropdownOption
                  key={`${accordionInfo.id}${item.name}`}
                  value={item.name}
                  isDisabled={item.isDisabled}>
                  {item.content.text}
                </DropdownOption>
              );
            })}
          </MultipleDropdown>
        );
      })}
    </React.Fragment>
  );
};
