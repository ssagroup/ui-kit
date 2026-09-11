import { useState, useId, useEffect, useMemo, useRef } from 'react';

import { useWindowSize } from '@ssa-ui-kit/hooks';

import Wrapper from '@components/Wrapper';

import * as S from './styles';
import {
  CollapsibleNavBarBase,
  CollapsibleNavBarWrapper,
  CollapsibleNavBarList,
  CollapsibleNavToggle,
  NavContentToggle,
  NavHeader,
  NavTree,
  hasHeaderContent,
} from './components';
import { CollapsibleNavBarProvider } from './CollapsibleNavBarContext';
import { toTreeItems } from './navItems';
import { CollapsibleNavBarExtendedProps } from './types';
import { SCREEN_SIZES } from '../../consts';

/**
 * CollapsibleNavBar — the app sidebar: a logo, a menu, and three layouts.
 *
 * Below `md` it is a full-screen overlay behind a hamburger; from `md` it is
 * an 85px rail of icons whose sub-routes open as popover flyouts; from `lg` it
 * expands to full rows. Which layout is showing is CSS, driven by a hidden
 * checkbox, so the DOM is the same in all three.
 *
 * The menu itself is a {@link TreeView} in `list` semantics — this component
 * supplies the routing: resolving each item's `to`, deriving the active row
 * from the current location, and closing the mobile overlay on navigation.
 * Items are one or two levels; a group is an item with `items`.
 *
 * Must be rendered inside a react-router router.
 *
 * @example
 * ```tsx
 * <CollapsibleNavBar
 *   renderLogo={<Logo />}
 *   items={[
 *     { path: '', iconName: 'home', iconSize: 20, title: 'Dashboard' },
 *     {
 *       prefix: 'statistics/',
 *       iconName: 'chart',
 *       iconSize: 22,
 *       title: 'Statistics',
 *       items: [
 *         { path: 'balance', title: 'Balance' },
 *         { path: 'orders', title: 'Orders' },
 *       ],
 *     },
 *   ]}
 *   onChange={(isExpanded) => console.log(isExpanded)}
 * />
 * ```
 */
export const CollapsibleNavBar = ({
  items,
  renderLogo,
  header,
  theme = 'default',
  activeColor,
  subMenuMaxWidth,
  showIconTooltip = false,
  className,
  useMatchPattern,
  onChange,
  exactMatch = false,
  defaultExpanded = false,
}: CollapsibleNavBarExtendedProps) => {
  const toggleId = useId();
  const { width } = useWindowSize();
  const [isChecked, onToggle] = useState(defaultExpanded);
  const isMobile = width < SCREEN_SIZES['900'].width;

  const treeItems = useMemo(() => toTreeItems(items), [items]);

  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // The menu keeps the logo's top margin unless a header is actually drawn.
  const showHeader = hasHeaderContent(header);

  // Collapse whenever the viewport changes size — but not on mount, which
  // would immediately undo `defaultExpanded`.
  const hasMeasured = useRef(false);
  useEffect(() => {
    if (!hasMeasured.current) {
      hasMeasured.current = true;
      return;
    }
    onToggle(false);
  }, [width]);

  useEffect(() => {
    onChange?.(isChecked);
  }, [isChecked]);

  const handleCloseMobileMenu = () => {
    if (isMobile) {
      onToggle(!isChecked);
    }
  };

  return (
    <CollapsibleNavBarProvider
      theme={theme}
      subMenuMaxWidth={subMenuMaxWidth}
      showIconTooltip={showIconTooltip}
      exactMatch={exactMatch}>
      <CollapsibleNavBarBase
        className={className + (isChecked ? ' opened' : '')}
        data-theme={theme}>
        <input
          type="checkbox"
          id={toggleId}
          checked={isChecked}
          onChange={() => {
            onToggle(!isChecked);
          }}
        />

        <CollapsibleNavToggle id={toggleId} />

        <CollapsibleNavBarWrapper navBarTheme={theme}>
          <Wrapper css={S.LogoWrapper}>
            {renderLogo}
            <NavContentToggle id={toggleId} isChecked={isChecked} />
          </Wrapper>
          {showHeader && <NavHeader {...header} />}
          <CollapsibleNavBarList
            navBarTheme={theme}
            as="div"
            className={showHeader ? 'has-header' : undefined}>
            <NavTree
              items={treeItems}
              activeColor={activeColor}
              useMatchPattern={useMatchPattern}
              onNavigate={handleCloseMobileMenu}
              expandedIds={expandedIds}
              onExpandedIdsChange={setExpandedIds}
            />
          </CollapsibleNavBarList>
        </CollapsibleNavBarWrapper>
      </CollapsibleNavBarBase>
    </CollapsibleNavBarProvider>
  );
};
