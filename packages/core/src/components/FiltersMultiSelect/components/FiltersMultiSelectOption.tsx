import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@components/Button';
import Icon from '@components/Icon';
import { MapIconsType } from '@components/Icon/types';

import { useFiltersMultiSelectContext } from '../FiltersMultiSelectProvider';
import { Filter, SelectedFilter } from '../useFiltersMultiSelect';

const FiltersMultiSelectOptionBase = styled.div`
  padding: 12px;
  height: 42px;

  font-weight: 500;
  font-size: 13.33px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: ${({ theme }) => theme.colors.blueRoyal6};
  }
`;

const FilterButton = styled(Button)`
  padding: 0 4px;

  &:not(:disabled):hover {
    svg {
      path {
        stroke-width: 2;
      }
    }
  }
`;

export interface FiltersMultiSelectOptionProps {
  filter: Filter;
  children: React.ReactNode;
  selected?: boolean;
}

export const FiltersMultiSelectOption = ({
  filter,
  children,
  selected,
}: FiltersMultiSelectOptionProps) => {
  const theme = useTheme();
  const { store } = useFiltersMultiSelectContext();
  const { id, label, group } = filter;

  const selectedFilter = store.isSelected(filter.id);

  const selectFilters = (type: SelectedFilter['type']) => {
    store.selectFilters({ id, label, type });
  };

  const getIconName = (type: SelectedFilter['type']) => {
    let iconName: keyof MapIconsType;
    switch (type) {
      case 'group':
        iconName = 'check-circle';
        break;
      case 'include':
        iconName = 'plus-circle';
        break;
      case 'exclude':
        iconName = 'minus-circle';
        break;
    }

    if (selectedFilter?.type === type) {
      iconName += '-inverted';
    }

    return iconName as keyof MapIconsType;
  };

  const Controls = () => (
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
      {group ? (
        <FilterButton
          variant="tertiary"
          isDisabled={selectedFilter?.type === 'group'}
          endIcon={
            <Icon
              name={getIconName('group')}
              color={theme.colors.blue}
              size={20}
              tooltip="Add filter group"
            />
          }
          onClick={() => selectFilters('group')}
        />
      ) : (
        <>
          <FilterButton
            variant="tertiary"
            isDisabled={selectedFilter?.type === 'include'}
            endIcon={
              <Icon
                name={getIconName('include')}
                color={theme.colors.greenDark}
                size={20}
                tooltip="Add include filter"
              />
            }
            onClick={() => selectFilters('include')}
          />
          <FilterButton
            variant="tertiary"
            isDisabled={selectedFilter?.type === 'exclude'}
            endIcon={
              <Icon
                name={getIconName('exclude')}
                color={theme.colors.redDark}
                size={20}
                tooltip="Add exclude filter"
              />
            }
            onClick={() => selectFilters('exclude')}
          />
        </>
      )}
    </div>
  );

  return (
    <FiltersMultiSelectOptionBase
      aria-selected={selected ?? !!selectedFilter}
      role="option">
      <span css>{children}</span>
      <Controls />
    </FiltersMultiSelectOptionBase>
  );
};
