import CardHeader from './index';
import { screen } from '../../../customTest';

describe('CardHeader', () => {
  it('Renders with initial background', () => {
    render(<CardHeader>Card</CardHeader>);

    const div = screen.getByText(/card/i).closest('div');

    expect(div).toHaveStyle('background: initial');
  });

  it('Renders with transparent background', () => {
    const { getByText } = render(<CardHeader transparent>Card</CardHeader>);

    const div = getByText(/card/i).closest('div');

    expect(div).toHaveStyle('background: transparent');
  });

  it('Renders with icon', () => {
    const { getByText } = render(
      <CardHeader icon={<div>Icon</div>}>Card</CardHeader>,
    );

    const div = getByText(/card/i).closest('div');
    expect(div).not.toBeNull();

    if (div) {
      const style = window.getComputedStyle(div);
      expect(style.paddingLeft).toBe('30px');
    }
  });
});
