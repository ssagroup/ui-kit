import { screen } from '../../../customTest';
import Badge from '@components/Badge';
import theme from '@themes/main';
import React from 'react';

describe('Badge', () => {
  it('Render purple if no color set', () => {
    render(<Badge size="small">small</Badge>);

    const badge = screen.getByText(/small/i);

    expect(badge).toHaveStyleRule('background-color', theme.colors.purple);
  });

  it('Render small size', () => {
    render(
      <Badge color="purple" size="small">
        small
      </Badge>,
    );

    const badge = screen.getByText(/small/i);

    expect(badge).toHaveStyle('height: 18px');
  });

  it('Render medium size', () => {
    render(<Badge color="purple">medium</Badge>);

    const badge = screen.getByText(/medium/i);

    expect(badge).toHaveStyle('height: 24px');
  });

  it('Render large size', () => {
    render(
      <Badge color="purple" size="large">
        large
      </Badge>,
    );

    const badge = screen.getByText(/large/i);

    expect(badge).toHaveStyle('height: 32px');
  });

  it('Render with color pink', () => {
    render(<Badge color="pink">Badge</Badge>);

    const badge = screen.getByText(/badge/i);

    expect(badge).toHaveStyleRule('background-color', theme.colors.pink);
  });

  it('Render with color yellow', () => {
    render(<Badge color="yellow">Badge</Badge>);

    const badge = screen.getByText(/badge/i);

    expect(badge).toHaveStyleRule('background-color', theme.colors.yellow);
  });

  it('Render with color yellowWarm', () => {
    render(<Badge color="yellowWarm">Badge</Badge>);

    const badge = screen.getByText(/badge/i);

    expect(badge).toHaveStyleRule(
      'background-color',
      theme.colors.yellowLighter,
    );
  });

  it('Render with color green', () => {
    render(<Badge color="green">Badge</Badge>);

    const badge = screen.getByText(/badge/i);

    expect(badge).toHaveStyleRule('background-color', theme.colors.green);
  });

  it('Render with color turquoise', () => {
    render(<Badge color="turquoise">Badge</Badge>);

    const badge = screen.getByText(/badge/i);

    expect(badge).toHaveStyleRule('background-color', theme.colors.turquoise);
  });

  it('Render with color purple', () => {
    render(<Badge color="purple">Badge</Badge>);

    const badge = screen.getByText(/badge/i);

    expect(badge).toHaveStyleRule('background-color', theme.colors.purple);
  });

  it('Render with color blueLight', () => {
    render(<Badge color="blueLight">Badge</Badge>);

    const badge = screen.getByText(/badge/i);

    expect(badge).toHaveStyleRule('background-color', theme.colors.blueLight);
  });

  it('Render with color blue', () => {
    render(<Badge color="blue">Badge</Badge>);

    const badge = screen.getByText(/badge/i);

    expect(badge).toHaveStyleRule('background-color', theme.colors.blue);
  });

  it('Render with custom color', () => {
    render(<Badge color="magenta">Badge</Badge>);

    const badge = screen.getByText(/badge/i);

    expect(badge).toHaveStyleRule('background', 'magenta');
  });

  it('Render without children', () => {
    const { container } = render(<Badge />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('Renders with ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Badge ref={ref} color="blue">
        Badge
      </Badge>,
    );

    expect(ref.current?.textContent).toBe('Badge');
  });
});
