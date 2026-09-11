import { fireEvent } from '@testing-library/dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ITEMS } from './stories/consts';
import { StoryComponent } from './stories/StoryComponent';
import { Logo } from './stories/Logo';
import { CollapsibleNavBar } from '@components';
import { CollapsibleNavBarExtendedProps } from './types';

describe('CollapsibleNavBar', () => {
  it('Should be correctly rendered', () => {
    const { getByText, getAllByText } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    getByText('Dashboard');
    getByText('Bots');
    getByText('Notifications');
    getByText('Statistics');
    getByText('History');
    getAllByText('Settings');
  });

  it('Should mount a group’s items only once it is expanded', () => {
    const { getByText, queryByText } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    // The group's rows used to be in the DOM at all times and merely hidden by
    // CSS; TreeView mounts them on expansion instead.
    expect(queryByText('Max in Work')).toBeNull();

    fireEvent.click(getByText('Statistics'));

    getByText('Max in Work');
  });

  it('Should expand the group', () => {
    const { getByText, getByRole } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    // `hidden: true` because jsdom reports the rail layout, where the chevron
    // is CSS-hidden in favour of the popover flyout.
    expect(
      getByRole('button', { name: 'Expand', hidden: true }),
    ).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(getByText('Statistics'));

    expect(
      getByRole('button', { name: 'Collapse', hidden: true }),
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should be expanded', () => {
    const { getByTestId } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    const contentToggler = getByTestId('collapsible-nav-content-toggle-label');

    fireEvent.click(contentToggler as Node);

    expect(getByTestId('collapsible-nav-content-toggle-label')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  describe('exactMatch prop', () => {
    const testItems: CollapsibleNavBarExtendedProps['items'] = [
      { path: 'bots', iconName: 'robot', iconSize: 20, title: 'Bots' },
      {
        prefix: 'statistics/',
        iconName: 'chart',
        iconSize: 22,
        title: 'Statistics',
        items: [
          { path: 'balance', title: 'Balance' },
          { path: 'orders', title: 'Orders' },
        ],
      },
    ];

    it('Should mark parent route as active for sub-routes when exactMatch is false (default)', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/bots/edit']}>
          <Routes>
            <Route
              path="/*"
              element={
                <CollapsibleNavBar
                  items={testItems}
                  renderLogo={<Logo />}
                  exactMatch={false}
                />
              }
            />
          </Routes>
        </MemoryRouter>,
      );

      const botsLink = getByText('Bots').closest('a');
      expect(botsLink).toHaveClass('active');
    });

    it('Should NOT mark parent route as active for sub-routes when exactMatch is true', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/bots/edit']}>
          <Routes>
            <Route
              path="/*"
              element={
                <CollapsibleNavBar
                  items={testItems}
                  renderLogo={<Logo />}
                  exactMatch={true}
                />
              }
            />
          </Routes>
        </MemoryRouter>,
      );

      const botsLink = getByText('Bots').closest('a');
      expect(botsLink).not.toHaveClass('active');
    });

    it('Should mark submenu item as active for sub-routes when exactMatch is false (default)', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/statistics/balance/edit']}>
          <Routes>
            <Route
              path="/*"
              element={
                <CollapsibleNavBar
                  items={testItems}
                  renderLogo={<Logo />}
                  exactMatch={false}
                />
              }
            />
          </Routes>
        </MemoryRouter>,
      );

      // The active route already opens its group, so no click is needed.
      const balanceLink = getByText('Balance').closest('a');
      expect(balanceLink).toHaveClass('active');
    });

    it('Should NOT mark the root item active on every other route', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/bots']}>
          <Routes>
            <Route
              path="/*"
              element={
                <CollapsibleNavBar items={ITEMS} renderLogo={<Logo />} />
              }
            />
          </Routes>
        </MemoryRouter>,
      );

      // A prefix match on `/` would otherwise swallow every route, leaving the
      // dashboard permanently selected.
      expect(getByText('Dashboard').closest('a')).not.toHaveClass('active');
      expect(getByText('Bots').closest('a')).toHaveClass('active');
    });

    it('Should mark the root item active on the root route', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/*"
              element={
                <CollapsibleNavBar items={ITEMS} renderLogo={<Logo />} />
              }
            />
          </Routes>
        </MemoryRouter>,
      );

      expect(getByText('Dashboard').closest('a')).toHaveClass('active');
    });

    it('Should paint the active row with `activeColor`', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/bots']}>
          <Routes>
            <Route
              path="/*"
              element={
                <CollapsibleNavBar
                  items={ITEMS}
                  renderLogo={<Logo />}
                  activeColor="rgb(255, 0, 0)"
                />
              }
            />
          </Routes>
        </MemoryRouter>,
      );

      expect(getByText('Bots').closest('a')).toHaveStyle({
        color: 'rgb(255, 0, 0)',
      });
    });

    it('Should NOT mark submenu item as active for sub-routes when exactMatch is true', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['/statistics/balance/edit']}>
          <Routes>
            <Route
              path="/*"
              element={
                <CollapsibleNavBar
                  items={testItems}
                  renderLogo={<Logo />}
                  exactMatch={true}
                />
              }
            />
          </Routes>
        </MemoryRouter>,
      );

      // Nothing matches under exactMatch, so the group has to be opened by hand.
      fireEvent.click(getByText('Statistics'));

      const balanceLink = getByText('Balance').closest('a');
      expect(balanceLink).not.toHaveClass('active');
    });
  });
  describe('header', () => {
    it('Should render the headline, avatar, name and image it is given', () => {
      const { getByText, getByAltText } = render(
        <StoryComponent
          items={ITEMS}
          header={{
            title: 'Headline Text',
            name: 'Name Surname',
            avatar: <span>AV</span>,
            image: <img src="/person.jpg" alt="Portrait" />,
          }}
        />,
      );

      getByText('Headline Text');
      getByText('Name Surname');
      getByText('AV');
      getByAltText('Portrait');
    });

    it('Should render nothing when the header is empty', () => {
      const { container } = render(
        <StoryComponent items={ITEMS} header={{}} />,
      );

      expect(container.querySelector('.collapsible-nav-header')).toBeNull();
      // The menu's top margin belongs to the logo until a header replaces it.
      expect(container.querySelector('.has-header')).toBeNull();
    });

    it('Should render a header without a headline', () => {
      const { getByText, getByAltText, container } = render(
        <StoryComponent
          items={ITEMS}
          header={{
            name: 'Name Surname',
            image: <img src="/person.jpg" alt="Portrait" />,
          }}
        />,
      );

      getByText('Name Surname');
      getByAltText('Portrait');
      expect(container.querySelector('.has-header')).not.toBeNull();
    });

    it('Should not require a logo', () => {
      const { getByText } = render(
        <StoryComponent items={ITEMS} renderLogo={undefined} />,
      );

      getByText('Dashboard');
    });
  });
});
