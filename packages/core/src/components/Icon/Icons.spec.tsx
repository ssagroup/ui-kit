import { css, SerializedStyles } from '@emotion/react';
import Icon from '@components/Icon';
import { iconsList } from '@components/Icon';
import { MapIconsType } from './types';
import { screen } from '../../../customTest';

const renderIcon = async (
  icon: keyof MapIconsType,
  size?: number,
  css?: SerializedStyles,
) => {
  render(<Icon name={icon} size={size} color="#fff" css={css} />);

  const iconTitle = new RegExp(icon.replaceAll('-', ' '), 'i');

  const titleEl = await screen.findByTitle(iconTitle);
  const svg = titleEl.closest('svg') as unknown as HTMLElement;
  const element =
    svg.querySelector('path') ||
    svg.querySelector('rect') ||
    svg.querySelector('circle');

  return [svg, element];
};

const checkFillOrStrokeAttrs = (
  el: HTMLElement | SVGPathElement | null,
  name: string,
) => {
  expect(el).toBeInTheDocument();
  try {
    expect(el).toHaveAttribute('fill');
  } catch {
    try {
      expect(el).toHaveAttribute('stroke');
    } catch {
      throw new Error(`the icon "${name}" is missing attribute fill or stroke`);
    }
  }
};

describe('Icons', () => {
  iconsList.forEach((iconName) => {
    it(`Renders "${iconName}" icon with attributes`, async () => {
      const [, path] = await renderIcon(iconName as keyof MapIconsType);

      checkFillOrStrokeAttrs(path, iconName);
    });

    it(`Renders "${iconName}" icon with custom styles`, async () => {
      const [icon] = await renderIcon(
        iconName as keyof MapIconsType,
        undefined,
        css`
          background-color: magenta;
        `,
      );

      expect(icon).toHaveStyle(`
        background-color: magenta;
      `);
    });

    it(`Renders "${iconName}" icon with the default size`, async () => {
      const [icon] = await renderIcon(iconName as keyof MapIconsType);

      expect(icon).toBeInTheDocument();
      const width = (icon as unknown as SVGElement).getAttribute('width');
      const height = (icon as unknown as SVGElement).getAttribute('height');

      const sizeRegEx = /^\d+px$/;
      expect(width).toMatch(sizeRegEx);
      expect(height).toMatch(sizeRegEx);
    });

    it(`Renders "${iconName}" icon with a custom size`, async () => {
      const [icon] = await renderIcon(iconName as keyof MapIconsType, 12);

      expect(icon).toBeInTheDocument();

      if (iconName === 'more-vertical') {
        expect(icon).toHaveAttribute('width', '3px');
      } else {
        expect(icon).toHaveAttribute('width', '12px');
      }
      expect(icon).toHaveAttribute('height', '12px');
    });
  });
});
