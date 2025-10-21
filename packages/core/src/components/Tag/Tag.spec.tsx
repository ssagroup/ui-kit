import { css } from '@emotion/react';

import Tag from '@components/Tag';
import theme from '@themes/main';

import { screen } from '../../../customTest';

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

  it('Render with color yellowWarm', () => {
    render(<Tag color="yellowWarm">tag</Tag>);

    const tag = screen.getByText(/tag/i);

    expect(tag).toHaveStyle(
      `background-color: ${theme.colors.yellowLighter20}`,
    );
    expect(tag).toHaveStyle(`border: 1px solid ${theme.colors.yellowWarm}`);
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

  describe('Custom Styles', () => {
    it('Render with custom color', () => {
      render(<Tag customStyles={{ color: '#ff0000' }}>custom tag</Tag>);

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle('color: #ff0000');
    });

    it('Render with custom background', () => {
      render(<Tag customStyles={{ background: '#00ff00' }}>custom tag</Tag>);

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle('background: #00ff00');
    });

    it('Render with custom background gradient', () => {
      render(
        <Tag
          customStyles={{
            background: 'linear-gradient(90deg, #ff0000, #00ff00)',
          }}>
          custom tag
        </Tag>,
      );

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle(
        'background: linear-gradient(90deg, #ff0000, #00ff00)',
      );
    });

    it('Render with custom border', () => {
      render(
        <Tag customStyles={{ border: '2px solid #0000ff' }}>custom tag</Tag>,
      );

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle('border: 2px solid #0000ff');
    });

    it('Render with custom border style (dashed)', () => {
      render(
        <Tag customStyles={{ border: '2px dashed #purple' }}>custom tag</Tag>,
      );

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle('border: 2px dashed #purple');
    });

    it('Render with custom boxShadow', () => {
      render(
        <Tag customStyles={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
          custom tag
        </Tag>,
      );

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle('box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3)');
    });

    it('Render with custom CSS styles', () => {
      render(
        <Tag
          customStyles={{
            css: css`
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
            `,
          }}>
          custom tag
        </Tag>,
      );

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle('font-weight: bold');
      expect(tag).toHaveStyle('text-transform: uppercase');
      expect(tag).toHaveStyle('letter-spacing: 1px');
    });

    it('Render with multiple custom styles', () => {
      render(
        <Tag
          customStyles={{
            color: '#ff0000',
            background: '#00ff00',
            border: '2px solid #0000ff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}>
          custom tag
        </Tag>,
      );

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle('color: #ff0000');
      expect(tag).toHaveStyle('background: #00ff00');
      expect(tag).toHaveStyle('border: 2px solid #0000ff');
      expect(tag).toHaveStyle('box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)');
    });

    it('Custom styles override default color styles', () => {
      render(
        <Tag
          color="purple"
          customStyles={{
            color: '#ff0000',
            background: '#00ff00',
          }}>
          custom tag
        </Tag>,
      );

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle('color: #ff0000');
      expect(tag).toHaveStyle('background: #00ff00');
      expect(tag).not.toHaveStyle(`color: ${theme.colors.purple}`);
      expect(tag).not.toHaveStyle(
        `background-color: ${theme.colors.purpleLighter20}`,
      );
    });

    it('Custom styles work with different sizes', () => {
      const sizes = ['small', 'medium', 'large'] as const;

      sizes.forEach((size) => {
        const { rerender } = render(
          <Tag
            size={size}
            customStyles={{
              color: '#e74c3c',
              background: '#fadbd8',
              border: '2px solid #c0392b',
            }}>
            {size} tag
          </Tag>,
        );

        const tag = screen.getByText(`${size} tag`);

        expect(tag).toHaveStyle('color: #e74c3c');
        expect(tag).toHaveStyle('background: #fadbd8');
        expect(tag).toHaveStyle('border: 2px solid #c0392b');

        rerender(<div />);
      });
    });

    it('CSS property has higher specificity than individual properties', () => {
      render(
        <Tag
          customStyles={{
            color: '#ff0000',
            background: '#00ff00',
            css: css`
              color: #00f;
              background: #ff0;
            `,
          }}>
          custom tag
        </Tag>,
      );

      const tag = screen.getByText(/custom tag/i);

      expect(tag).toHaveStyle('color: #00f');
      expect(tag).toHaveStyle('background: #ff0');
    });

    it('Custom styles with empty object does not break component', () => {
      render(<Tag customStyles={{}}>empty custom styles</Tag>);

      const tag = screen.getByText(/empty custom styles/i);

      expect(tag).toBeInTheDocument();
      expect(tag).toHaveStyle(`color: ${theme.colors.purple}`);
    });

    it('Undefined customStyles falls back to default color', () => {
      render(<Tag customStyles={undefined}>undefined styles</Tag>);

      const tag = screen.getByText(/undefined styles/i);

      expect(tag).toBeInTheDocument();
      expect(tag).toHaveStyle(`color: ${theme.colors.purple}`);
    });

    it('Complex CSS with pseudo-selectors compiles correctly', () => {
      render(
        <Tag
          customStyles={{
            css: css`
              color: #333;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border: 1px solid transparent;
              border-radius: 8px;
              transition: all 0.3s ease;

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
              }

              &:active {
                transform: translateY(0);
              }
            `,
          }}>
          complex css
        </Tag>,
      );

      const tag = screen.getByText(/complex css/i);

      expect(tag).toHaveStyle('color: #333');
      expect(tag).toHaveStyle(
        'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      );
      expect(tag).toHaveStyle('border: 1px solid transparent');
      expect(tag).toHaveStyle('transition: all 0.3s ease');
    });
  });
});
