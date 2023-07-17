import { screen, within } from '../../../customTest';

import WaterConsume from './index';

const steps = [
  {
    title: '600ml',
    caption: '2pm - 4pm',
  },
  {
    title: '500ml',
    caption: '11am - 2pm',
  },
  {
    title: '1000ml',
    caption: '9am - 11am',
  },
  {
    title: '700ml',
    caption: '6am - 8am',
  },
];

const checkListItems = async () => {
  const listItems = await screen.findAllByRole('listitem');

  for (let i = 0; i < listItems.length; ++i) {
    const itemEl = listItems[i];
    within(itemEl).getByText(steps[steps.length - i - 1].title);
  }
};

describe('WaterConsume', () => {
  it('Renders with a custom unit', async () => {
    render(
      <WaterConsume
        minValue={0}
        maxValue={3}
        currentValue={2.7}
        unit={'L'}
        active={2}
        steps={steps}
      />,
    );

    screen.getByText('0L');
    screen.getByText('2.7L');
    screen.getByText('3L');

    await checkListItems();
  });

  it('Render with the default unit (%)', async () => {
    render(<WaterConsume currentValue={50} active={1} steps={steps} />);

    screen.getByText('0%');
    screen.getByText('50%');
    screen.getByText('100%');

    await checkListItems();
  });
});
