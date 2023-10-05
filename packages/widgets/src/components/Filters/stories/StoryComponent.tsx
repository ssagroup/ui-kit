import { mockData } from '@components/TableFilters/stories/mockData';
import { Filters } from '../Filters';

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
      <Filters handleSubmit={onSubmit} initialState={mockData} />
    </div>
  );
};
