import React from 'react';
import { screen } from '../../../customTest';
import theme from '@themes/main';
import Avatar from './Avatar';
import { AvatarSizes } from './types';

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
    it('renders with a standard color from theme.colors', () => {
      render(<Avatar color="purple" />);
      const el = screen.getByTestId('avatar');

      expect(el).toHaveStyleRule('background', theme.colors.purple);
      expect(el).not.toHaveStyleRule('box-shadow');
    });

    it('renders with a custom CSS color', () => {
      render(<Avatar color="#F7931A" />);
      const el = screen.getByTestId('avatar');

      expect(el).toHaveStyleRule('background', '#F7931A');
    });

    it('renders with a custom rgb color', () => {
      render(<Avatar color="rgb(65, 120, 225)" />);
      const el = screen.getByTestId('avatar');

      expect(el).toHaveStyleRule('background', 'rgb(65, 120, 225)');
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
    it('defaults to medium (42px)', () => {
      const { container } = render(<Avatar />);
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveStyle('width: 42px');
      expect(el).toHaveStyle('height: 42px');
    });

    it('applies large size', () => {
      const { container } = render(<Avatar size={AvatarSizes.large} />);
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveStyle('width: 64px');
      expect(el).toHaveStyle('height: 64px');
    });

    it('applies small size', () => {
      const { container } = render(<Avatar size={AvatarSizes.small} />);
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveStyle('width: 24px');
      expect(el).toHaveStyle('height: 24px');
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

  describe('Border', () => {
    it('shows border by default for image avatars', () => {
      render(<Avatar image="https://example.com/photo.jpg" />);
      const el = screen.getByTestId('avatar');
      expect(el).toHaveStyleRule('border', `3px solid ${theme.colors.blue}`);
    });

    it('hides border by default for placeholder avatars', () => {
      render(<Avatar color="purple" text="A" />);
      const el = screen.getByTestId('avatar');
      expect(getComputedStyle(el).borderTopStyle).not.toBe('solid');
    });

    it('allows enabling border for non-image avatars', () => {
      render(<Avatar color="purple" border />);
      const el = screen.getByTestId('avatar');
      expect(el).toHaveStyleRule('border', `3px solid ${theme.colors.blue}`);
    });

    it('allows disabling border for image avatars', () => {
      render(<Avatar image="https://example.com/photo.jpg" border={false} />);
      const el = screen.getByTestId('avatar');
      expect(getComputedStyle(el).borderTopStyle).not.toBe('solid');
    });

    it('supports custom border color', () => {
      render(<Avatar image="https://example.com/photo.jpg" borderColor="#000" />);
      const el = screen.getByTestId('avatar');
      expect(el).toHaveStyleRule('border', '3px solid #000');
    });
  });
});
