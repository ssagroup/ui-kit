import { screen, waitFor } from '../../../customTest';

import Icon from '@components/Icon';
import { IMapIcons } from './Icons.types';

const IconsList = [
  'diet',
  'calendar',
  'home',
  'stats',
  'sleep',
  'trainings',
  'measurements',
  'settings',
  'plus',
  'minus',
  'more',
  'check',
  'cross',
  'user',
  'union',
  'notification',
  'visible',
  'invisible',
  'carrot-down',
  'carrot-up',
  'carrot-left',
  'carrot-right',
  'arrow-up',
  'arrow-down',
];

const renderIcon = async (icon: keyof IMapIcons) => {
  render(<Icon name={icon} size={12} color="#fff" />);

  const iconTitle = new RegExp(icon.replace('-', ' '), 'i');

  const titleEl = await screen.findByTitle(iconTitle);
  const svg = titleEl.closest('svg') as unknown as HTMLElement;
  const path = svg.querySelector('path');

  return [svg, path];
};

const checkFillOrStrokeAttrs = (el, name) => {
  expect(el).toBeInTheDocument();
  try {
    expect(el).toHaveAttribute('fill', '#fff');
  } catch {
    try {
      expect(el).toHaveAttribute('stroke', '#fff');
    } catch (e) {
      throw new Error(`the icon ${name} is missing attribute fill or stroke`);
    }
  }
};

describe('Icons', () => {
  IconsList.forEach((iconName) => {
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

  it('Render "Radio-on" icon with attributes', async () => {
    const iconName = 'radio-on';
    const [icon] = await renderIcon(iconName);

    await waitFor(() => {
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('height', '12px');

      const [firstRectEl, secondRectEl] = (
        icon as HTMLElement
      ).querySelectorAll('rect');
      checkFillOrStrokeAttrs(firstRectEl, iconName);
      checkFillOrStrokeAttrs(secondRectEl, iconName);

      const circleEl = (icon as HTMLElement).querySelector('circle');
      checkFillOrStrokeAttrs(circleEl, iconName);
    });
  });

  it('Render "Circle" icon with attributes', async () => {
    const iconName = 'circle';
    const [icon] = await renderIcon(iconName);

    await waitFor(() => {
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('height', '12px');

      const [firstRectEl, secondRectEl] = (
        icon as HTMLElement
      ).querySelectorAll('rect');
      expect(firstRectEl).toBeInTheDocument();
      expect(firstRectEl).toHaveAttribute('fill', 'none');
      checkFillOrStrokeAttrs(secondRectEl, iconName);
    });
  });
});
