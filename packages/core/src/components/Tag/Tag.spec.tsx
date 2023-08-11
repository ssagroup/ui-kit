import { screen } from '../../../customTest';
import Tag from '@components/Tag';
import theme from '@themes/main';

describe('tag', () => {
  it('Render small size', () => {
    render(
      <Tag color="purple" size="small">
        small
      </Tag>,
    );

    const tag = screen.getByText(/small/i);

    expect(tag).toHaveStyle('height: 18px');
  });

  it('Render with default color', () => {
    render(<Tag size="small">small</Tag>);

    const tag = screen.getByText(/small/i);

    expect(tag).toHaveStyle('height: 18px');
  });

  it('Render medium size', () => {
    render(<Tag color="purple">medium</Tag>);

    const tag = screen.getByText(/medium/i);

    expect(tag).toHaveStyle('height: 24px');
  });

  it('Render large size', () => {
    render(
      <Tag color="purple" size="large">
        large
      </Tag>,
    );

    const tag = screen.getByText(/large/i);

    expect(tag).toHaveStyle('height: 32px');
  });

  it('Render with color pink', () => {
    render(<Tag color="pink">tag</Tag>);

    const tag = screen.getByText(/tag/i);

    expect(tag).toHaveStyle(`background-color: ${theme.colors.pink20}`);
    expect(tag).toHaveStyle(`border: 1px solid ${theme.colors.pink}`);
  });

  it('Render with color yellow', () => {
    render(<Tag color="yellow">tag</Tag>);

    const tag = screen.getByText(/tag/i);

    expect(tag).toHaveStyle(`background-color: ${theme.colors.yellow20}`);
    expect(tag).toHaveStyle(`border: 1px solid ${theme.colors.yellow}`);
  });

  it('Render with color green', () => {
    render(<Tag color="green">tag</Tag>);

    const tag = screen.getByText(/tag/i);

    expect(tag).toHaveStyle(`background-color: ${theme.colors.green20}`);
    expect(tag).toHaveStyle(`border: 1px solid ${theme.colors.green}`);
  });

  it('Render with color turquoise', () => {
    render(<Tag color="turquoise">tag</Tag>);

    const tag = screen.getByText(/tag/i);

    expect(tag).toHaveStyle(`background-color: ${theme.colors.turquoise20}`);
    expect(tag).toHaveStyle(`border: 1px solid ${theme.colors.turquoise}`);
  });

  it('Render with color purple', () => {
    render(<Tag color="purple">tag</Tag>);

    const tag = screen.getByText(/tag/i);

    expect(tag).toHaveStyle(
      `background-color: ${theme.colors.purpleLighter20}`,
    );
    expect(tag).toHaveStyle(`border: 1px solid ${theme.colors.purple}`);
  });

  it('Render with color blueLight', () => {
    render(<Tag color="blueLight">tag</Tag>);

    const tag = screen.getByText(/tag/i);

    expect(tag).toHaveStyle(`background-color: ${theme.colors.blueLight20}`);
    expect(tag).toHaveStyle(`border: 1px solid ${theme.colors.blueLight}`);
  });

  it('Render with color blue', () => {
    render(<Tag color="blue">tag</Tag>);

    const tag = screen.getByText(/tag/i);

    expect(tag).toHaveStyle(`background-color: ${theme.colors.blue20}`);
    expect(tag).toHaveStyle(`border: 1px solid ${theme.colors.blue}`);
  });
});
