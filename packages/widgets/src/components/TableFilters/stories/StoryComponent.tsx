import { mockData } from '@components/TableFilters/stories/mockData';
import { TableFilters } from '../TableFilters';
import { useTableData } from '../hooks/useTableData';

export const StoryComponent = () => {
  const handleSubmit = (submitData: Record<string, string[]>) => {
    console.log('>>>onSubmit', submitData);
  };

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
    handleSubmit,
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
