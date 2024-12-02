import CardHeader from './CardHeader';
import { screen } from '../../../customTest';

describe('CardHeader', () => {
  it('Render transparent card header', () => {
    render(<CardHeader transparent>Card</CardHeader>);

    const cardHeader = screen.getByText(/card/i).closest('div');

    expect(cardHeader).toHaveStyle('background: transparent');
  });
});
