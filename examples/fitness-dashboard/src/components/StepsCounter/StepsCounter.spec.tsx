import { customTest } from '@ssa-ui-kit/utils';
import StepsCounter from './index';

const { screen } = customTest;

describe('StepsCounter', () => {
  it('Render component with correct %', () => {
    render(<StepsCounter max={3000} currentValue={2500} />);

    const progressBar = screen.getByRole('progressbar');
    const label = screen.getByText(/83% of your goals/i);

    expect(label).toBeInTheDocument();
    expect(progressBar).toHaveStyle('width: 83%;');
  });
});
