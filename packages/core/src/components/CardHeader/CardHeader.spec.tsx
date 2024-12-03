import CardHeader from './CardHeader';
import { screen } from '../../../customTest';

describe('CardHeader', () => {
  it('Render initial background', () => {
    render(<CardHeader>Card</CardHeader>);

    const cardHeader = screen.getByText(/card/i).closest('div');

    expect(cardHeader).toHaveStyle('background: initial');
  });
});

describe('CardHeader', () => {
  it('Render initial background', () => {
    const { getByText } = render(<CardHeader transparent>Card</CardHeader>);

    const cardHeader = getByText(/card/i).closest('div');

    expect(cardHeader).toHaveStyle('background: transparent');
  });
});

describe('CardHeader', () => {
  it('Render with icon', () => {
    const { getByText } = render(
      <CardHeader icon={<div>Icon</div>}>Card</CardHeader>,
    );

    const div = getByText(/card/i).closest('div');
    expect(div).not.toBeNull();

    if (div !== null) {
      const style = window.getComputedStyle(div);
      expect(style.paddingLeft).toBe('30px');
    }
  });
});
