import { TableFilters } from '../TableFilters';
import { mockData } from './mockData';

export const StoryComponent = () => {
  const onSubmit = (checkboxData: Record<string, string[]>) => {
    console.log('>>>onSubmit', checkboxData);
  };
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TableFilters handleSubmit={onSubmit} initialState={mockData} />
    </div>
  );
};
