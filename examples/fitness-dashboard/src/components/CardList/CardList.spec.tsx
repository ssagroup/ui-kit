import { customTest } from '@ssa-ui-kit/utils';

import CardList from './index';

const { screen } = customTest;

describe('CardList', () => {
  it('Render component', async () => {
    render(
      <CardList
        title="List of cards"
        items={[
          {
            id: '1',
            title: 'ITEM A',
          },
          {
            id: '2',
            title: 'ITEM B',
          },
        ]}
        renderItem={(item) => item.title as string}
      />,
    );

    const list = await screen.findAllByRole('listitem');
    const itemA = await screen.findByText('ITEM A');
    const itemB = await screen.findByText('ITEM B');

    expect(list.length).toBe(2);
    expect(itemA).toBeInTheDocument();
    expect(itemB).toBeInTheDocument();
  });
});
