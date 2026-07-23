import { Fragment } from 'react';

import Icon from '@components/Icon';
import theme from '@themes/main';

import { WithLink } from '../WithLink';

import { BreadcrumbMenu } from './BreadcrumbMenu';
import { BreadcrumbItem, BreadcrumbsProps } from './types';
import { collapseItems } from './utils';
import * as styles from './styles';

const DefaultSeparator = (
  <Icon name="carrot-right" size={14} color={theme.colors.greyDarker80} />
);

/**
 * Breadcrumbs — navigational trail of the current page's location.
 *
 * Accepts a list of `{ label, to }` items and renders them as react-router
 * links separated by a chevron, with the current (last) crumb shown as a
 * non-navigable, emphasised label. When the trail is longer than `maxItems`
 * it collapses to `first … last`, with the hidden crumbs available from the
 * `…` menu.
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   maxItems={4}
 *   items={[
 *     { label: 'Home', to: '/' },
 *     { label: 'People', to: '/people' },
 *     { label: 'Jane Doe' },
 *   ]}
 * />
 * ```
 */
export const Breadcrumbs = ({
  items,
  maxItems,
  separator = DefaultSeparator,
  ariaLabel = 'Breadcrumb',
  className,
  css,
}: BreadcrumbsProps) => {
  if (!items.length) {
    return null;
  }

  const lastIndex = items.length - 1;
  const entries = collapseItems(items, maxItems);

  const isCurrent = (item: BreadcrumbItem, index: number) =>
    item.isCurrent ?? index === lastIndex;

  const renderCrumb = (item: BreadcrumbItem, index: number) => {
    if (isCurrent(item, index)) {
      return (
        <span css={styles.crumbCurrent} aria-current="page">
          {item.label}
        </span>
      );
    }

    const inner = item.to ? (
      <WithLink link={item.to} onClick={item.onClick}>
        <span css={styles.crumbLink}>{item.label}</span>
      </WithLink>
    ) : item.onClick ? (
      <button type="button" css={styles.crumbLink} onClick={item.onClick}>
        {item.label}
      </button>
    ) : (
      <span css={styles.crumbText}>{item.label}</span>
    );

    if (item.siblings?.length) {
      return (
        <BreadcrumbMenu
          trigger={<span css={styles.item}>{inner}</span>}
          items={item.siblings}
        />
      );
    }

    return inner;
  };

  return (
    <nav aria-label={ariaLabel} css={[styles.nav, css]} className={className}>
      <ol css={styles.list}>
        {entries.map((entry, position) => {
          const isLastEntry = position === entries.length - 1;

          return (
            <Fragment
              key={entry.type === 'item' ? `item-${entry.index}` : 'ellipsis'}>
              <li css={styles.item}>
                {entry.type === 'item' ? (
                  renderCrumb(entry.item, entry.index)
                ) : (
                  <BreadcrumbMenu
                    trigger={
                      <button
                        type="button"
                        css={styles.crumbLink}
                        aria-label="Show hidden breadcrumbs">
                        ...
                      </button>
                    }
                    items={entry.items
                      .filter((item) => item.to)
                      .map((item) => ({ label: item.label, to: item.to! }))}
                  />
                )}
              </li>
              {!isLastEntry && (
                <li css={styles.separator} aria-hidden="true">
                  {separator}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
