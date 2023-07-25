import { screen } from '../../../customTest';

import Notes from './index';

describe('Notes', () => {
  it('Render Notes', () => {
    render(<Notes />);

    expect(screen.getByText(/notes/i)).toBeInTheDocument();
  });
});
