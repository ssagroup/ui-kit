import React from 'react';
import { screen } from '../../../customTest';
import theme from '@themes/main';
import Avatar from './Avatar';

describe('Avatar', () => {
  describe('Custom image', () => {
    it('renders a circular container with the image as background', () => {
      const url = 'https://example.com/photo.jpg';
      const { container } = render(<Avatar image={url} />);
      const el = container.firstChild as HTMLElement;

      expect(el).toBeInTheDocument();
      expect(el).toHaveStyleRule(
        'background',
        `url(${url}) center/cover no-repeat`,
      );
    });

    it('does not render text when image is supplied', () => {
      render(<Avatar image="https://example.com/photo.jpg" text="J" />);
      expect(screen.queryByText('J')).not.toBeInTheDocument();
    });
  });

  describe('Colored placeholder', () => {
    it('renders with a standard color (purple gradient)', () => {
      render(<Avatar color="purple" />);
      const el = screen.getByTestId('avatar');

      expect(el).toHaveStyleRule('background-color', theme.colors.purple);
    });

    it('renders with a custom CSS color', () => {
      render(<Avatar color="#F7931A" />);
      const el = screen.getByTestId('avatar');

      expect(el).toHaveStyleRule('background', '#F7931A');
    });

    it('renders the provided text inside the avatar', () => {
      render(<Avatar color="green" text="JL" />);
      expect(screen.getByText('JL')).toBeInTheDocument();
    });

    it('truncates text to at most two characters', () => {
      render(<Avatar color="blue" text="ABC" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('renders colored placeholder without text when only color is given', () => {
      const { container } = render(<Avatar color="pink" />);
      const textEl = container.querySelector('span');
      expect(textEl).not.toBeInTheDocument();
    });
  });

  describe('Default placeholder', () => {
    it('renders when no props are supplied', () => {
      render(<Avatar />);
      const el = screen.getByTestId('avatar');
      expect(el).toBeInTheDocument();
    });

    it('uses the grey lighter background for the default placeholder', () => {
      render(<Avatar />);
      const el = screen.getByTestId('avatar');
      expect(el).toHaveStyleRule('background', theme.colors.greyLighter);
    });

    it('renders the user icon inside the default placeholder', () => {
      const { container } = render(<Avatar />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Size prop', () => {
    it('defaults to 42px', () => {
      const { container } = render(<Avatar />);
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveStyle('width: 42px');
      expect(el).toHaveStyle('height: 42px');
    });

    it('applies a custom size', () => {
      const { container } = render(<Avatar size={64} />);
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveStyle('width: 64px');
      expect(el).toHaveStyle('height: 64px');
    });
  });

  describe('data-testid', () => {
    it('has data-testid="avatar" on the root element', () => {
      render(<Avatar />);
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });
  });

  describe('Priority', () => {
    it('image takes priority over color and text', () => {
      const url = 'https://example.com/photo.jpg';
      render(<Avatar image={url} color="purple" text="J" />);
      // text should not appear
      expect(screen.queryByText('J')).not.toBeInTheDocument();
      // background should use the image
      const el = screen.getByTestId('avatar');
      expect(el).toHaveStyleRule(
        'background',
        `url(${url}) center/cover no-repeat`,
      );
    });
  });
});
