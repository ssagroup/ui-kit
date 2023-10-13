import { mockData } from './mockData';
import { TableFilters } from '../TableFilters';
import { useTableData } from '../hooks/useTableData';

export const StoryComponent = () => {
  const handleSubmit = (submitData: Record<string, string[]>) => {
    console.log('>>>onSubmit', submitData);
  };

  const useTableDataResult = useTableData({
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
      <TableFilters {...useTableDataResult} />
    </div>
  );
};
