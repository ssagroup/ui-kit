import { screen } from '../../../customTest';

import Calories from './index';

jest.mock('d3-color', () => ({}));

describe('Calories', () => {
  it('Render Calories', () => {
    render(<Calories max={100} currentValue={70} />);

    expect(screen.queryByText('70% done')).toBeInTheDocument();
  });
});
