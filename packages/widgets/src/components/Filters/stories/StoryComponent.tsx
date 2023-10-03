import {
  mockData,
  mockInitialState,
} from '@components/TableFilters/stories/mockData';
import { Filters } from '../Filters';

export const StoryComponent = () => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Filters data={mockData} initialState={mockInitialState} />
    </div>
  );
};
