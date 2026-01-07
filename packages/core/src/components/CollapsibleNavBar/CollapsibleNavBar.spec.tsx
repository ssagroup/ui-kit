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
    getByText('Max in Work');
    getByText('History');
    getAllByText('Settings');
  });

  it('Should expand the group', () => {
    const { getByTestId } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    const statisticsArrow = getByTestId('accordion-title');

    expect(statisticsArrow as Node).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(statisticsArrow as Node);

    expect(statisticsArrow as Node).toHaveAttribute('aria-expanded', 'true');
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

      const statisticsArrow = getByText('Statistics')
        .closest('div')
        ?.querySelector('[data-testid="accordion-title"]');
      if (statisticsArrow) {
        fireEvent.click(statisticsArrow);
      }

      const balanceLink = getByText('Balance').closest('a');
      expect(balanceLink).toHaveClass('active');
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

      const statisticsArrow = getByText('Statistics')
        .closest('div')
        ?.querySelector('[data-testid="accordion-title"]');
      if (statisticsArrow) {
        fireEvent.click(statisticsArrow);
      }

      const balanceLink = getByText('Balance').closest('a');
      expect(balanceLink).not.toHaveClass('active');
    });
  });
});
