import Icon from '@components/Icon';
import { iconsList } from '@components/Icon';
import { screen, waitFor } from '../../../customTest';
import { IMapIcons } from './types';

const renderIcon = async (icon: keyof IMapIcons) => {
  render(<Icon name={icon} size={12} color="#fff" />);

  const iconTitle = new RegExp(icon.replace('-', ' '), 'i');

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
    } catch (e) {
      throw new Error(`the icon ${name} is missing attribute fill or stroke`);
    }
  }
};

describe('Icons', () => {
  iconsList.forEach((iconName) => {
    it(`Render ${iconName} icon with attributes`, async () => {
      const [icon, path] = await renderIcon(iconName as keyof IMapIcons);

      await waitFor(() => {
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('height', '12px');

        checkFillOrStrokeAttrs(path, iconName);
      });
    });
  });

  it('Default render with 24px', async () => {
    render(<Icon name="calendar" color="#fff" />);

    await waitFor(() => {
      const icon = screen
        .getByTitle('Calendar')
        .closest('svg') as unknown as HTMLElement;

      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('height', '24px');
    });
  });
});
