import { customTest } from '@ssa-ui-kit/utils';

import Calories from './index';

const { screen } = customTest;

describe('Calories', () => {
  it('Render Calories', () => {
    render(<Calories max={100} currentValue={70} />);

    expect(screen.queryByText('70% done')).toBeInTheDocument();
  });
});
