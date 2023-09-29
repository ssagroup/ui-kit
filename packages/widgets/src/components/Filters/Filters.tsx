import { DropdownOption, MultipleDropdown } from '@ssa-ui-kit/core';
import { TableFilters } from '@components/TableFilters';
import { mockData, mockInitialState, mockItems } from './stories/mockData';
import { CheckboxData } from '@components/TableFilters/types';

export const Filters = () => {
  const onSubmit = (checkboxData: CheckboxData) => {
    console.log('>>>onSubmit', checkboxData);
  };
  return (
    <div
      css={{
        display: 'flex',
        flex: 'auto',
      }}>
      <MultipleDropdown
        showPlaceholder={false}
        label="Dropdown #1"
        css={{
          minWidth: 'unset',
        }}>
        {mockItems.map((item) => (
          <DropdownOption key={`${item.value}1`} value={`${item.value}1`}>
            {item.label}
          </DropdownOption>
        ))}
      </MultipleDropdown>
      <MultipleDropdown
        showPlaceholder={false}
        label="Dropdown #2"
        css={{
          minWidth: 'unset',
        }}>
        {mockItems.map((item) => (
          <DropdownOption key={`${item.value}2`} value={`${item.value}2`}>
            {item.label}
          </DropdownOption>
        ))}
      </MultipleDropdown>
      <MultipleDropdown
        showPlaceholder={false}
        label="Dropdown #3"
        css={{
          minWidth: 'unset',
        }}>
        {mockItems.map((item) => (
          <DropdownOption key={`${item.value}3`} value={`${item.value}3`}>
            {item.label}
          </DropdownOption>
        ))}
      </MultipleDropdown>
      <TableFilters
        data={mockData}
        initialState={mockInitialState}
        handleSubmit={onSubmit}
      />
    </div>
  );
};
