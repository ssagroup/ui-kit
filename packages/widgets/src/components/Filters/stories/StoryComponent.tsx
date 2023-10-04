import { mockData } from '@components/TableFilters/stories/mockData';
import { Filters } from '../Filters';

export const StoryComponent = () => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Filters initialState={mockData} />
    </div>
  );
};
