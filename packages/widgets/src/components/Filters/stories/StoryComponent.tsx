import { mockData } from './mockData';
import { Filters } from '..';

export const StoryComponent = ({ data = mockData }) => {
  const handleSubmit = (submitData: Record<string, string[]>) => {
    console.log('>>>Filters onSubmit', submitData);
  };

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Filters handleSubmit={handleSubmit} checkboxData={data} />
    </div>
  );
};
