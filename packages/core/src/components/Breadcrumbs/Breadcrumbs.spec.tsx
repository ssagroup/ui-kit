import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './types';

const items: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'People', to: '/people' },
  { label: 'Jane Doe' },
];

function setup(ui: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(<MemoryRouter>{ui}</MemoryRouter>),
  };
}

describe('Component: Breadcrumbs', () => {
  it('renders every crumb label', () => {
    const { getByText } = setup(<Breadcrumbs items={items} />);
    items.forEach(({ label }) => getByText(label as string));
  });

  it('renders non-current crumbs as links and the last crumb as current', () => {
    const { getByRole, queryByRole, getByText } = setup(
      <Breadcrumbs items={items} />,
    );

    expect(getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(getByRole('link', { name: 'People' })).toHaveAttribute(
      'href',
      '/people',
    );
    expect(queryByRole('link', { name: 'Jane Doe' })).toBeNull();
    expect(getByText('Jane Doe')).toHaveAttribute('aria-current', 'page');
  });

  it('respects an explicit isCurrent flag', () => {
    const { getByText, queryByRole } = setup(
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'People', isCurrent: true },
          { label: 'Jane Doe', to: '/people/jane' },
        ]}
      />,
    );
    expect(getByText('People')).toHaveAttribute('aria-current', 'page');
    expect(queryByRole('link', { name: 'People' })).toBeNull();
  });

  it('renders one fewer separator than crumbs', () => {
    const { container } = setup(<Breadcrumbs items={items} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators).toHaveLength(items.length - 1);
  });

  it('returns null when there are no items', () => {
    const { container } = setup(<Breadcrumbs items={[]} />);
    expect(container.querySelector('nav')).toBeNull();
  });

  it('uses the provided aria label', () => {
    const { getByRole } = setup(
      <Breadcrumbs items={items} ariaLabel="You are here" />,
    );
    getByRole('navigation', { name: 'You are here' });
  });

  describe('truncation', () => {
    const longItems: BreadcrumbItem[] = [
      { label: 'Home', to: '/' },
      { label: 'People', to: '/people' },
      { label: 'Engineering', to: '/engineering' },
      { label: 'Frontend', to: '/frontend' },
      { label: 'Jane Doe' },
    ];

    it('collapses to first and last when items exceed maxItems', () => {
      const { getByText, queryByText, getByRole } = setup(
        <Breadcrumbs items={longItems} maxItems={3} />,
      );

      getByText('Home');
      getByText('Jane Doe');
      expect(queryByText('People')).toBeNull();
      expect(queryByText('Engineering')).toBeNull();
      getByRole('button', { name: 'Show hidden breadcrumbs' });
    });

    it('reveals the hidden crumbs from the ellipsis menu', async () => {
      const { user, getByRole } = setup(
        <Breadcrumbs items={longItems} maxItems={3} />,
      );

      await user.click(
        getByRole('button', { name: 'Show hidden breadcrumbs' }),
      );

      expect(getByRole('link', { name: 'People' })).toHaveAttribute(
        'href',
        '/people',
      );
      getByRole('link', { name: 'Engineering' });
      getByRole('link', { name: 'Frontend' });
    });

    it('does not collapse when items are within maxItems', () => {
      const { queryByRole } = setup(<Breadcrumbs items={items} maxItems={5} />);
      expect(
        queryByRole('button', { name: 'Show hidden breadcrumbs' }),
      ).toBeNull();
    });
  });
});
