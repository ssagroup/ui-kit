import { customTest } from '@ssa-ui-kit/utils';

import Notes from './index';

const { screen } = customTest;

describe('Notes', () => {
  it('Render Notes', () => {
    render(<Notes />);

    expect(screen.getByText(/notes/i)).toBeInTheDocument();
  });
});
