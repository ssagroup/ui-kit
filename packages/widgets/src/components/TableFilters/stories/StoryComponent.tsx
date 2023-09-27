import { CheckboxData } from '../types';
import { TableFilters } from '../TableFilters';
import { mockData, mockInitialState } from './mockData';

export const StoryComponent = () => {
  const onSubmit = (checkboxData: CheckboxData) => {
    console.log('>>>onSubmit', checkboxData);
  };
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TableFilters
        data={mockData}
        initialState={mockInitialState}
        handleSubmit={onSubmit}
      />
    </div>
  );
};
