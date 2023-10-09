import Indicator from './Indicator';

describe('Indicator', () => {
  it('Renders with default left position', () => {
    const { getByTestId } = render(<Indicator />);

    const indicatorEl = getByTestId('indicator');

    expect(indicatorEl).toHaveStyle('left: 4px');
  });

  it('Renders with right position', () => {
    const { getByTestId } = render(<Indicator position="right" />);

    const indicatorEl = getByTestId('indicator');

    expect(indicatorEl).toHaveStyle('right: 4px');
  });

  it('Renders with children and default left position', () => {
    const { getByText, getByTestId } = render(<Indicator>+20</Indicator>);

    const indicatorEl = getByTestId('indicator');

    getByText('+20');
    expect(indicatorEl).toHaveStyle('left: 4px');
  });

  it('Renders with children and right position', () => {
    const { getByText, getByTestId } = render(
      <Indicator position="right">+20</Indicator>,
    );

    const indicatorEl = getByTestId('indicator');

    getByText('+20');
    expect(indicatorEl).toHaveStyle('right: 4px');
  });
});
