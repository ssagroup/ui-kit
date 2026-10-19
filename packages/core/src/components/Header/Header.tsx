import { forwardRef, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';
import { useDrawer } from '@components/Drawer';

import { HeaderProps } from './types';
import { HeaderNavEntry } from './HeaderNavMenu';
import { HeaderMobileMenu } from './HeaderMobileMenu';
import * as S from './styles';

/** Matches `theme.mediaQueries.md`, where the burger hands over to the bar. */
const DESKTOP_QUERY = '(min-width: 900px)';

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
 * From 900px the navigation is centred between the logo and the right side,
 * and scrolls sideways when it does not fit. Below 900px it moves into a
 * drawer opened by a burger button, the logo is centred and `rightSide`
 * stays as it is.
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
    width: '100%',
    dismissable: true,
  });
  // useDrawer hands out a new `toggle` every render; reading it through a
  // ref keeps the media listener below subscribed once.
  const toggleRef = useRef(drawer.toggle);
  useEffect(() => {
    toggleRef.current = drawer.toggle;
  });

  // The drawer is mobile-only; growing past the breakpoint must not leave it
  // covering the desktop bar. Effects never run on the server, so `window`
  // is there; `matchMedia` may not be (jsdom).
  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }
    const query = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        toggleRef.current(false);
      }
    };
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  const hasItems = items.length > 0;

  return (
    <header ref={ref} css={S.root(theme, palette, size)} {...props}>
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
        <span css={S.burgerPlaceholder(theme)} />
      )}
      <div css={S.logo(size)}>{logo}</div>
      {hasItems ? (
        <nav css={S.nav(theme)} aria-label={navLabel}>
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
        <span css={S.nav(theme)} />
      )}
      <div css={S.rightSide}>{rightSide}</div>
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
