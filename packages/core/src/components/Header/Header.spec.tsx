import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { Header } from './Header';
import { HeaderNavItem, HeaderProps } from './types';
import { screen, waitFor, within } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';

const items: HeaderNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  {
    id: 'people',
    label: 'People',
    children: [
      { id: 'employees', label: 'Employees', path: '/people/employees' },
      {
        id: 'teams',
        label: 'Teams',
        children: [
          { id: 'frontend', label: 'Frontend', path: '/people/teams/frontend' },
          { id: 'backend', label: 'Backend', path: '/people/teams/backend' },
        ],
      },
      { id: 'archive', label: 'Archive', path: '/archive', disabled: true },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    disabled: true,
    children: [{ id: 'monthly', label: 'Monthly', path: '/reports/monthly' }],
  },
  { id: 'settings', label: 'Settings', path: '/settings', disabled: true },
];

const Location = () => (
  <output data-testid="location">{useLocation().pathname}</output>
);

const renderHeader = (
  props: Partial<HeaderProps> = {},
  initialPath = '/dashboard',
) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Header items={items} {...props} />
              <Location />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

/**
 * jsdom ignores media queries, so the desktop nav keeps its mobile
 * `display: none` there; query it directly, including hidden elements.
 */
const desktopNav = () =>
  within(document.querySelector<HTMLElement>('header > nav')!);

describe('Header', () => {
  it('renders the logo, links and right side', () => {
    renderHeader({
      logo: <img src="/logo.svg" alt="Acme" />,
      rightSide: <button type="button">Profile</button>,
    });

    expect(screen.getByRole('img', { name: 'Acme' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
    expect(
      desktopNav().getByRole('link', { name: 'Dashboard', hidden: true }),
    ).toHaveAttribute('href', '/dashboard');
  });

  it('leaves the logo box empty without a logo', () => {
    const { container } = renderHeader();
    const header = container.querySelector('header')!;
    // burger, logo box, nav, right side
    expect(header.children[1]).toBeEmptyDOMElement();
  });

  it('marks the current page and highlights its groups', () => {
    renderHeader({}, '/people/teams/frontend');

    const dashboard = desktopNav().getByRole('link', {
      name: 'Dashboard',
      hidden: true,
    });
    const people = desktopNav().getByRole('button', {
      name: 'People',
      hidden: true,
    });
    expect(dashboard).not.toHaveAttribute('aria-current');
    // jsdom does not resolve the cascade reliably (it matches :hover), so
    // compare the generated classes: the active group gets its own.
    const settings = desktopNav().getByText('Settings').parentElement!;
    expect(dashboard.className).toBe(settings.className);
    expect(people.className).not.toBe(dashboard.className);
  });

  it('renders disabled items without a link', () => {
    renderHeader();

    expect(
      desktopNav().queryByRole('link', { name: 'Settings', hidden: true }),
    ).not.toBeInTheDocument();
    expect(desktopNav().getByText('Settings').parentElement).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('opens a dropdown on hover', async () => {
    const user = userEvent.setup();
    renderHeader();

    const people = desktopNav().getByRole('button', {
      name: 'People',
      hidden: true,
    });
    await user.hover(people);
    expect(people).toHaveAttribute('aria-expanded', 'true');
    expect(
      await screen.findByRole('link', { name: 'Employees' }),
    ).toBeVisible();
  });

  it('keeps a disabled group closed on hover', async () => {
    const user = userEvent.setup();
    renderHeader();

    const reports = desktopNav().getByRole('button', {
      name: 'Reports',
      hidden: true,
    });
    await user.hover(reports);
    expect(reports).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('link', { name: 'Monthly' }),
    ).not.toBeInTheDocument();
  });

  it('opens a flyout from a dropdown item', async () => {
    const user = userEvent.setup();
    renderHeader();

    // Hovering into the flyout needs real geometry for the safe triangle,
    // which jsdom lacks; the keyboard path exercises the same nesting.
    const people = desktopNav().getByRole('button', {
      name: 'People',
      hidden: true,
    });
    people.focus();
    await user.keyboard('{Enter}');
    screen.getByRole('button', { name: 'Teams' }).focus();
    await user.keyboard('{Enter}');

    expect(screen.getByRole('button', { name: 'Teams' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('link', { name: 'Frontend' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Employees' })).toBeInTheDocument();
  });

  it('opens a dropdown from the keyboard and closes it with Escape', async () => {
    const user = userEvent.setup();
    renderHeader();

    const people = desktopNav().getByRole('button', {
      name: 'People',
      hidden: true,
    });
    people.focus();
    await user.keyboard('{Enter}');
    expect(people).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Employees' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(
        screen.queryByRole('link', { name: 'Employees' }),
      ).not.toBeInTheDocument(),
    );
  });

  it('navigates and closes every menu when a flyout link is followed', async () => {
    const user = userEvent.setup();
    renderHeader();

    desktopNav().getByRole('button', { name: 'People', hidden: true }).focus();
    await user.keyboard('{Enter}');
    screen.getByRole('button', { name: 'Teams' }).focus();
    await user.keyboard('{Enter}');
    await user.click(screen.getByRole('link', { name: 'Backend' }));

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/people/teams/backend',
    );
    await waitFor(() =>
      expect(
        screen.queryByRole('link', { name: 'Employees' }),
      ).not.toBeInTheDocument(),
    );
  });

  describe('mobile menu', () => {
    it('opens a drawer with the active group expanded', async () => {
      const user = userEvent.setup();
      renderHeader({}, '/people/employees');

      await user.click(screen.getByRole('button', { name: 'Open menu' }));

      const drawerNav = await screen.findAllByRole('navigation', {
        name: 'Main',
      });
      const mobile = within(drawerNav[drawerNav.length - 1]);
      expect(mobile.getByRole('button', { name: 'People' })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(mobile.getByRole('link', { name: 'Employees' })).toHaveAttribute(
        'aria-current',
        'page',
      );
      expect(mobile.getByRole('button', { name: 'Teams' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });

    it('closes the drawer after navigating', async () => {
      const user = userEvent.setup();
      renderHeader();

      await user.click(screen.getByRole('button', { name: 'Open menu' }));
      const drawerNav = await screen.findAllByRole('navigation', {
        name: 'Main',
      });
      const mobile = within(drawerNav[drawerNav.length - 1]);
      await user.click(mobile.getByRole('button', { name: 'People' }));
      await user.click(mobile.getByRole('link', { name: 'Employees' }));

      expect(screen.getByTestId('location')).toHaveTextContent(
        '/people/employees',
      );
      await waitFor(() =>
        expect(
          screen.getAllByRole('navigation', { hidden: true }),
        ).toHaveLength(1),
      );
    });

    it('has no burger when there are no items', () => {
      renderHeader({ items: [] });
      expect(
        screen.queryByRole('button', { name: 'Open menu' }),
      ).not.toBeInTheDocument();
    });
  });

  it('has no axe violations', async () => {
    const { container } = renderHeader({
      logo: <img src="/logo.svg" alt="Acme" />,
    });
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
