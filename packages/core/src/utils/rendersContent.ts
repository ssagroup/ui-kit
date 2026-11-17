import { Children, Fragment, isValidElement, ReactNode } from 'react';

/**
 * Whether a node renders anything a user would read as a label.
 *
 * `Children.toArray` already drops `null`, `undefined` and booleans, which is
 * what `cond && <span />` collapses to, and flattens arrays. It keeps a
 * Fragment as one element, so Fragments are unwrapped here: `<>{cond && 'x'}</>`
 * with `cond` false renders nothing. Empty strings are filtered out too;
 * `label || ''` is the usual way one sneaks in. Whitespace still counts: the
 * caller passed it on purpose.
 *
 * Limitation: a component element always counts, even one that returns
 * `null`, because what it renders is unknown until it renders.
 *
 * @internal
 */
export const rendersContent = (node: ReactNode): boolean =>
  Children.toArray(node).some((child) => {
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === Fragment
    ) {
      return rendersContent(child.props.children);
    }
    return child !== '';
  });
