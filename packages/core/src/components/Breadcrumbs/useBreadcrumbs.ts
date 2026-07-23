import { useMemo } from 'react';
import {
  matchRoutes,
  generatePath,
  useLocation,
  RouteObject,
} from 'react-router-dom';

import { BreadcrumbItem, BreadcrumbSibling } from './types';

/** Context passed to a route's `crumb` resolver function. */
export interface BreadcrumbMatchContext {
  params: Record<string, string | undefined>;
  pathname: string;
}

/**
 * Shape read from a route's `handle` to build its crumb. Attach this to routes
 * in your `createBrowserRouter` config:
 *
 * ```ts
 * { path: 'people', handle: { crumb: 'People' } as BreadcrumbRouteHandle }
 * ```
 */
export interface BreadcrumbRouteHandle {
  /** Static label, or a resolver receiving the matched params/pathname. */
  crumb?: React.ReactNode | ((ctx: BreadcrumbMatchContext) => React.ReactNode);
  /** Fallback label used when `crumb` is absent (e.g. a page title). */
  title?: React.ReactNode;
  /** Explicitly exclude this route from the trail even if it has a title. */
  hideCrumb?: boolean;
}

export interface UseBreadcrumbsOptions {
  /** The route tree — the same array passed to `createBrowserRouter`. */
  routes: RouteObject[];
  /** Path to resolve against. Defaults to the current location. */
  pathname?: string;
  /** Attach sibling routes for the hover menu. Defaults to `true`. */
  includeSiblings?: boolean;
  /**
   * Last-resort label resolver, called when a matched route has no
   * `handle.crumb`/`handle.title`. Return `null`/`undefined` to skip the crumb.
   */
  getLabel?: (
    route: RouteObject,
    ctx: BreadcrumbMatchContext,
  ) => React.ReactNode;
}

const getHandle = (route: RouteObject) =>
  route.handle as BreadcrumbRouteHandle | undefined;

const joinPaths = (base: string, path: string) =>
  `/${`${base}/${path}`.split('/').filter(Boolean).join('/')}`;

const resolveLabel = (
  route: RouteObject,
  ctx: BreadcrumbMatchContext,
  getLabel?: UseBreadcrumbsOptions['getLabel'],
): React.ReactNode => {
  const handle = getHandle(route);

  if (handle?.hideCrumb) {
    return undefined;
  }
  if (handle?.crumb !== undefined) {
    return typeof handle.crumb === 'function'
      ? handle.crumb(ctx)
      : handle.crumb;
  }
  if (handle?.title !== undefined) {
    return handle.title;
  }

  return getLabel?.(route, ctx);
};

const hasContent = (label: React.ReactNode) =>
  label !== undefined && label !== null && label !== false;

/**
 * Resolve a sibling route's pattern to a concrete path using the current
 * params. Returns `null` when the sibling needs params we don't have (it can't
 * be navigated to from here) so the caller can drop it.
 */
const resolveSiblingPath = (
  pattern: string,
  params: Record<string, string | undefined>,
): string | null => {
  try {
    return generatePath(pattern, params as Record<string, string>);
  } catch {
    return null;
  }
};

const getSiblings = (
  siblingRoutes: RouteObject[],
  currentRoute: RouteObject,
  parentBase: string,
  params: Record<string, string | undefined>,
  getLabel?: UseBreadcrumbsOptions['getLabel'],
): BreadcrumbSibling[] =>
  siblingRoutes.reduce<BreadcrumbSibling[]>((acc, route) => {
    if (route === currentRoute || route.index || !route.path) {
      return acc;
    }

    const pattern = route.path.startsWith('/')
      ? route.path
      : joinPaths(parentBase, route.path);
    const to = resolveSiblingPath(pattern, params);
    if (to === null) {
      return acc;
    }

    const label = resolveLabel(route, { params, pathname: to }, getLabel);
    if (!hasContent(label)) {
      return acc;
    }

    acc.push({ label, to });
    return acc;
  }, []);

/**
 * Pure derivation of breadcrumb items from a route tree and a pathname.
 * Extracted from the hook so it can be unit-tested without a router.
 */
export const deriveBreadcrumbs = (
  routes: RouteObject[],
  pathname: string,
  { includeSiblings = true, getLabel }: Partial<UseBreadcrumbsOptions> = {},
): BreadcrumbItem[] => {
  const matches = matchRoutes(routes, pathname);
  if (!matches) {
    return [];
  }

  const items: BreadcrumbItem[] = [];

  matches.forEach((match, index) => {
    const ctx: BreadcrumbMatchContext = {
      params: match.params,
      pathname: match.pathname,
    };
    const label = resolveLabel(match.route, ctx, getLabel);
    if (!hasContent(label)) {
      return;
    }

    const item: BreadcrumbItem = { label, to: match.pathname };

    if (includeSiblings) {
      const parentChildren =
        index === 0 ? routes : (matches[index - 1].route.children ?? []);
      const parentBase = index === 0 ? '/' : matches[index - 1].pathnameBase;
      const siblings = getSiblings(
        parentChildren,
        match.route,
        parentBase,
        match.params,
        getLabel,
      );
      if (siblings.length) {
        item.siblings = siblings;
      }
    }

    items.push(item);
  });

  // The deepest crumb is the current page.
  if (items.length) {
    const last = items[items.length - 1];
    last.isCurrent = true;
    delete last.to;
    delete last.siblings;
  }

  return items;
};

/**
 * Route-aware breadcrumb builder. Reads the current location, matches it
 * against your route tree, and returns `BreadcrumbItem[]` ready for
 * `<Breadcrumbs>`. Labels come from each route's `handle.crumb`/`handle.title`;
 * sibling routes (other children of a crumb's parent) power the hover menu.
 *
 * @example
 * ```tsx
 * const items = useBreadcrumbs({ routes });
 * return <Breadcrumbs items={items} maxItems={4} />;
 * ```
 */
export const useBreadcrumbs = ({
  routes,
  pathname,
  includeSiblings = true,
  getLabel,
}: UseBreadcrumbsOptions): BreadcrumbItem[] => {
  const location = useLocation();
  const activePathname = pathname ?? location.pathname;

  return useMemo(
    () =>
      deriveBreadcrumbs(routes, activePathname, { includeSiblings, getLabel }),
    [routes, activePathname, includeSiblings, getLabel],
  );
};
