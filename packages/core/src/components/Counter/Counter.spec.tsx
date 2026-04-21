import React from 'react';

import { Counter } from './Counter';
import { CounterVariants } from './types';
import theme from '@themes/main';
import { screen } from '../../../customTest';

describe('Counter', () => {
  describe('Rendering', () => {
    it('renders the count value', () => {
      render(<Counter count={5} />);

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders with ref attached to the root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Counter count={3} ref={ref} />);

      expect(ref.current?.textContent).toBe('3');
    });

    it('renders nothing visible when count is omitted (tiny dot state)', () => {
      const { container } = render(<Counter />);

      const dot = container.firstChild as HTMLElement;
      expect(dot).toBeInTheDocument();
      expect(dot).toHaveTextContent('');
    });
  });

  describe('Count display', () => {
    it('renders exact value for counts at the limit (99)', () => {
      render(<Counter count={99} />);

      expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('renders "99+" for counts above 99', () => {
      render(<Counter count={100} />);

      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('renders "99+" for very large counts', () => {
      render(<Counter count={9999} />);

      expect(screen.getByText('99+')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Counter count={1} size="small" />);

      const el = screen.getByText('1');
      expect(el).toHaveStyle('height: 24px');
      expect(el).toHaveStyle('font-size: 12px');
    });

    it('renders medium size (default)', () => {
      render(<Counter count={1} />);

      const el = screen.getByText('1');
      expect(el).toHaveStyle('height: 32px');
      expect(el).toHaveStyle('font-size: 14px');
    });

    it('renders large size', () => {
      render(<Counter count={1} size="large" />);

      const el = screen.getByText('1');
      expect(el).toHaveStyle('height: 44px');
      expect(el).toHaveStyle('font-size: 16px');
    });

    it('uses tiny size when count is omitted, ignoring size prop', () => {
      const { container } = render(<Counter size="large" />);

      const el = container.firstChild as HTMLElement;
      expect(el).toHaveStyle('width: 8px');
      expect(el).toHaveStyle('height: 8px');
    });
  });

  describe('Variants', () => {
    it('renders primary variant (default)', () => {
      render(<Counter count={1} />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('background', theme.palette.primary.main);
      expect(el).toHaveStyleRule('color', theme.colors.white);
    });

    it('renders secondary variant', () => {
      render(<Counter count={1} variant={CounterVariants.secondary} />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('background', theme.palette.secondary.main);
    });

    it('renders error variant', () => {
      render(<Counter count={1} variant={CounterVariants.error} />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('background', theme.palette.error.main);
    });

    it('renders warning variant', () => {
      render(<Counter count={1} variant={CounterVariants.warning} />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('background', theme.palette.warning.main);
    });

    it('renders success variant', () => {
      render(<Counter count={1} variant={CounterVariants.success} />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('background', theme.palette.success.main);
    });
  });

  describe('Color override', () => {
    it('overrides background with a theme.colors key', () => {
      render(<Counter count={1} color="purple" />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('background', theme.colors.purple);
    });

    it('overrides background with a raw hex color string', () => {
      render(<Counter count={1} color="#F7931A" />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('background', '#F7931A');
    });

    it('overrides background with a raw CSS named color', () => {
      render(<Counter count={1} color="orange" />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('background', 'orange');
    });
  });

  describe('Custom CSS', () => {
    it('applies custom css override', () => {
      render(<Counter count={1} css={{ borderRadius: 4, marginLeft: 8 }} />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('border-radius', '4px');
      expect(el).toHaveStyleRule('margin-left', '8px');
    });

    it('custom css overrides internal background', () => {
      render(<Counter count={1} css={{ background: 'hotpink' }} />);

      const el = screen.getByText('1');
      expect(el).toHaveStyleRule('background', 'hotpink');
    });
  });
});
