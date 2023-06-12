import { customTest } from '@ssa-ui-kit/utils';

import WaterConsume from './index';

const { screen, within } = customTest;

describe('WaterConsume', () => {
  it('Render component', async () => {
    render(
      <WaterConsume
        max={3000}
        currentValue={2500}
        steps={[
          {
            title: '1500ml',
            caption: '11am - 2pm',
            done: false,
          },
          {
            title: '500ml',
            caption: '11am - 2pm',
            done: false,
          },
        ]}
      />,
    );

    const [itemA, itemB] = await screen.findAllByRole('listitem');

    const listItemA = within(itemA).getByText('1500ml');
    const listItemB = within(itemB).getByText('500ml');

    const classListA = itemA.classList.toString();
    const classListB = itemB.classList.toString();

    expect(listItemA).toBeInTheDocument();
    expect(listItemB).toBeInTheDocument();
    expect(classListA).toEqual(classListB);
  });
});
