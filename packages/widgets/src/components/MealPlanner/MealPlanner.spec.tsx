import userEvent from '@testing-library/user-event';

import { screen, within } from '../../../customTest';

import MealPlanner from './index';
import { MealPlannerItem } from './types';

const data: { [key: string]: MealPlannerItem } = {
  breakfast: {
    time: '8:00 AM',
    data: [
      {
        id: 1,
        name: 'Avocado salad',
        image: 'https://via.placeholder.com/64x64',
        calories: 300,
        carbs: 10,
        protein: 50,
        fat: 40,
      },
    ],
  },
  lunch: {
    time: '1:00 pm',
    data: [
      {
        id: 4,
        name: 'Beef steak',
        image: 'https://via.placeholder.com/64x64',
        calories: 300,
        carbs: 10,
        protein: 50,
        fat: 40,
      },
    ],
  },
};

describe('MealPlanner', () => {
  it('Render recipes and update then when change the dropdown', async () => {
    const user = userEvent.setup();

    render(<MealPlanner data={data} />);

    const recipeBreakfast = screen.getByText(/Avocado salad/i);
    const progressBars = screen.getAllByRole('progressbar');

    expect(recipeBreakfast).toBeInTheDocument();
    expect(progressBars).toHaveLength(3);

    const dropdownEl = screen.getByTestId('dropdown');
    const dropdownToggleEl = within(dropdownEl).getByRole('combobox');

    await user.click(dropdownToggleEl);

    const listItemEls = within(screen.getByRole('listbox')).getAllByRole(
      'button',
    );

    await user.click(listItemEls[1]);

    const recipeLunch = screen.getByText(/Beef steak/i);

    expect(recipeLunch).toBeInTheDocument();
    expect(recipeBreakfast).not.toBeInTheDocument();
  });

  it("don't render if not data or wrong typeof data", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<MealPlanner data={'data'} />);

    const recipeBreakfast = await screen.queryByText(/Avocado salad/i);

    expect(recipeBreakfast).not.toBeInTheDocument();
  });
});
