import { renderHook } from '@testing-library/react';
import { MemoryRouter, RouteObject } from 'react-router-dom';

import { deriveBreadcrumbs, useBreadcrumbs } from './useBreadcrumbs';

const routes: RouteObject[] = [
  {
    path: '/',
    handle: { crumb: 'Home' },
    children: [
      {
        path: 'people',
        handle: { crumb: 'People' },
        children: [
          {
            path: ':id',
            handle: {
              crumb: (ctx: { params: { id?: string } }) =>
                `User ${ctx.params.id}`,
            },
          },
        ],
      },
      { path: 'projects', handle: { crumb: 'Projects' } },
      { path: 'settings', handle: { crumb: 'Settings' } },
      { path: 'orders/:orderId', handle: { crumb: 'Orders' } },
      // A layout wrapper with no crumb — must be skipped.
      { path: 'reports', children: [{ index: true }] },
    ],
  },
];

describe('deriveBreadcrumbs', () => {
  it('builds a trail from the matched route handles', () => {
    const items = deriveBreadcrumbs(routes, '/people/42');
    expect(items.map((i) => i.label)).toEqual(['Home', 'People', 'User 42']);
  });

  it('marks the deepest crumb as current and strips its link', () => {
    const items = deriveBreadcrumbs(routes, '/people/42');
    const current = items[items.length - 1];

    expect(current.isCurrent).toBe(true);
    expect(current.to).toBeUndefined();
    expect(current.siblings).toBeUndefined();
  });

  it('resolves each crumb to its concrete pathname', () => {
    const items = deriveBreadcrumbs(routes, '/people/42');
    expect(items[0].to).toBe('/');
    expect(items[1].to).toBe('/people');
  });

  it('attaches navigable siblings from the parent route', () => {
    const items = deriveBreadcrumbs(routes, '/people/42');
    const peopleSiblings = items[1].siblings;

    expect(peopleSiblings).toEqual([
      { label: 'Projects', to: '/projects' },
      { label: 'Settings', to: '/settings' },
    ]);
  });

  it('drops sibling routes that require params we do not have', () => {
    const items = deriveBreadcrumbs(routes, '/people/42');
    const labels = items[1].siblings?.map((s) => s.label) ?? [];
    // "Orders" needs :orderId, which is absent → excluded.
    expect(labels).not.toContain('Orders');
  });

  it('skips routes without a crumb label (layout wrappers)', () => {
    const items = deriveBreadcrumbs(routes, '/reports');
    // Only Home carries a crumb on this path.
    expect(items.map((i) => i.label)).toEqual(['Home']);
  });

  it('omits siblings when includeSiblings is false', () => {
    const items = deriveBreadcrumbs(routes, '/people/42', {
      includeSiblings: false,
    });
    expect(items.every((i) => i.siblings === undefined)).toBe(true);
  });

  it('falls back to getLabel when a route has no handle', () => {
    const bareRoutes: RouteObject[] = [
      { path: '/', children: [{ path: 'dashboard' }] },
    ];
    const items = deriveBreadcrumbs(bareRoutes, '/dashboard', {
      getLabel: (route) => route.path ?? 'root',
    });
    expect(items.map((i) => i.label)).toEqual(['/', 'dashboard']);
  });

  it('returns an empty array when nothing matches', () => {
    expect(deriveBreadcrumbs(routes, '/nope/nowhere')).toEqual([]);
  });
});

describe('useBreadcrumbs', () => {
  const wrapper = (initialPath: string) => {
    const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
    );
    RouterWrapper.displayName = 'RouterWrapper';
    return RouterWrapper;
  };

  it('derives crumbs from the current location', () => {
    const { result } = renderHook(() => useBreadcrumbs({ routes }), {
      wrapper: wrapper('/people/42'),
    });
    expect(result.current.map((i) => i.label)).toEqual([
      'Home',
      'People',
      'User 42',
    ]);
  });

  it('honours an explicit pathname override', () => {
    const { result } = renderHook(
      () => useBreadcrumbs({ routes, pathname: '/projects' }),
      { wrapper: wrapper('/people/42') },
    );
    expect(result.current.map((i) => i.label)).toEqual(['Home', 'Projects']);
  });
});
