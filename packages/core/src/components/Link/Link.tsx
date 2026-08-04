import Typography from '@components/Typography';

import { LinkProps } from './Link.types';
import { LinkBase } from './LinkBase';

/**
 * Link - Styled anchor.
 *
 * Renders a plain `<a>` with the kit's `subtitle` typography. Accepts the
 * standard anchor attributes (`target`, `rel`, `download`, `onClick`, …) plus
 * `className` and the Emotion `css` prop.
 *
 * When `target="_blank"` is used, `rel` defaults to `noopener noreferrer` so a
 * new tab can't reach back into the opener; pass an explicit `rel` to override.
 *
 * @category Navigation
 *
 * @example
 * ```tsx
 * <Link href="/settings">Settings</Link>
 * ```
 *
 * @example
 * ```tsx
 * // rel is filled in automatically
 * <Link href="https://example.com" target="_blank">Docs</Link>
 * ```
 */
export const Link = ({ children, href, target, rel, ...props }: LinkProps) => (
  <LinkBase
    href={href}
    target={target}
    rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
    {...props}>
    <Typography variant="subtitle">{children}</Typography>
  </LinkBase>
);
