import { screen, within } from '../../../customTest';

import WaterConsume from './index';

describe('WaterConsume', () => {
  it('Render component', async () => {
    render(
      <WaterConsume
        active={0}
        currentValue={2500}
        steps={[
          {
            title: '500ml',
            caption: '11am - 2pm',
          },
          {
            title: '1500ml',
            caption: '2pm - 4pm',
          },
        ]}
      />,
    );

    const [itemA, itemB] = await screen.findAllByRole('listitem');

    const listItemA = within(itemA).getByText('500ml');
    const listItemB = within(itemB).getByText('1500ml');

    const classListA = itemA.classList.toString();
    const classListB = itemB.classList.toString();

    expect(listItemA).toBeInTheDocument();
    expect(listItemB).toBeInTheDocument();
    expect(classListA).toEqual(classListB);
  });
});
