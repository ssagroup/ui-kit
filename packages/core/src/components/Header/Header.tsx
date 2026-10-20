import { forwardRef, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useMergeRefs } from '@floating-ui/react';

import Icon from '@components/Icon';
import { useDrawer } from '@components/Drawer';

import { HeaderProps } from './types';
import { HeaderNavEntry } from './HeaderNavMenu';
import { HeaderMobileMenu } from './HeaderMobileMenu';
import * as S from './styles';

/**
 * Header - The application's top bar: logo, main navigation and a free slot
 * on the right for the user profile, notifications or log out.
 *
 * ### Navigation
 * `items` render as react-router links, so the Header must sit inside a
 * router. The item matching the current location is highlighted, and so is
 * every group above it. Groups open a dropdown — on hover with a mouse, on
 * tap on touch screens — and a dropdown item can open a flyout one level
 * further. Following a link closes them.
 *
 * ### Layout
 * The layout follows the Header's own width, not the window's. From 900px
 * the navigation is centred between the logo and the right side, and scrolls
 * sideways when it does not fit. Below 900px it moves into a drawer opened
 * by a burger button, the logo is centred and `rightSide` stays as it is.
 *
 * ### Selected state
 * The design sets the selected item in bold. The kit marks it by color
 * only: a heavier face widens the item and shifts the whole bar whenever the
 * route changes.
 *
 * @category Navigation
 * @example
 * ```tsx
 * <Header
 *   logo={<img src="/logo.svg" alt="Acme" height={38} />}
 *   items={[
 *     { id: 'home', label: 'Home', path: '/' },
 *     {
 *       id: 'people',
 *       label: 'People',
 *       children: [
 *         { id: 'employees', label: 'Employees', path: '/people/employees' },
 *       ],
 *     },
 *   ]}
 *   rightSide={<UserProfile {...profile} />}
 * />
 * ```
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    logo,
    items = [],
    rightSide,
    theme: headerTheme = 'light',
    size = 'small',
    navLabel = 'Main',
    menuButtonLabel = 'Open menu',
    ...props
  },
  ref,
) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const palette = S.resolvePalette(theme, headerTheme);
  const drawer = useDrawer({
    position: 'left',
    // Capped at the viewport by Drawer, so phones still get the full width.
    width: 400,
    dismissable: true,
  });
  // useDrawer hands out a new `toggle` every render; reading it through a
  // ref keeps the observer below subscribed once.
  const toggleRef = useRef(drawer.toggle);
  useEffect(() => {
    toggleRef.current = drawer.toggle;
  });

  const headerRef = useRef<HTMLElement>(null);
  const mergedRef = useMergeRefs([headerRef, ref]);

  // The drawer is mobile-only; a header growing past the breakpoint must not
  // leave it open over the desktop bar. Effects never run on the server;
  // ResizeObserver may still be missing (jsdom).
  useEffect(() => {
    const element = headerRef.current;
    if (!element || typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width >= S.DESKTOP_MIN_WIDTH) {
        toggleRef.current(false);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hasItems = items.length > 0;

  return (
    <header ref={mergedRef} css={S.container(palette)} {...props}>
      <div css={S.bar(size)}>
        {hasItems ? (
          <button
            type="button"
            css={S.burger(theme, palette)}
            aria-label={menuButtonLabel}
            aria-expanded={drawer.open}
            {...drawer.interactions.getReferenceProps()}>
            <Icon name="menu" size={24} color="currentColor" />
          </button>
        ) : (
          <span css={S.burgerPlaceholder} />
        )}
        <div css={S.logo(size)}>{logo}</div>
        {hasItems ? (
          <nav css={S.nav} aria-label={navLabel}>
            <ul css={S.navList}>
              {items.map((item) => (
                <li key={item.id}>
                  <HeaderNavEntry
                    item={item}
                    depth={0}
                    palette={palette}
                    pathname={pathname}
                  />
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <span css={S.nav} />
        )}
        <div css={S.rightSide}>{rightSide}</div>
      </div>
      {hasItems && (
        <HeaderMobileMenu
          store={drawer}
          items={items}
          headerTheme={headerTheme}
          palette={palette}
          pathname={pathname}
          navLabel={navLabel}
        />
      )}
    </header>
  );
});
