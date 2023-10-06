// import { useFiltersContext } from '@components/Filters/FiltersContext';
import { mockData } from '@components/TableFilters/stories/mockData';
import { TableFilters } from '../TableFilters';
import { useTableData } from '../hooks/useTableData';
// import { mockData } from './mockData';

export const StoryComponent = () => {
  const {
    checkboxData,
    selectedItemsByGroup,
    selectedGroupsCount,
    handleCheckboxToggle,
    onClear,
    onReset,
    onSubmit,
  } = useTableData({
    initialState: mockData,
  });

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TableFilters
        checkboxData={checkboxData}
        selectedItemsByGroup={selectedItemsByGroup}
        selectedGroupsCount={selectedGroupsCount}
        handleCheckboxToggle={handleCheckboxToggle}
        onClear={onClear}
        onReset={onReset}
        onSubmit={onSubmit}
      />
    </div>
  );
};
