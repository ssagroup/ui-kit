import { forwardRef, useId } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { FooterColumn, FooterLink, FooterProps } from './types';
import * as S from './styles';

const FooterLinkItem = ({
  link,
  palette,
}: {
  link: FooterLink;
  palette: S.FooterPalette;
}) => {
  const theme = useTheme();
  if (link.path) {
    return (
      <Link to={link.path} css={S.link(theme, palette)}>
        {link.label}
      </Link>
    );
  }
  if (link.href) {
    return (
      <a href={link.href} css={S.link(theme, palette)}>
        {link.label}
      </a>
    );
  }
  return <span>{link.label}</span>;
};

const FooterNavColumn = ({
  column,
  palette,
}: {
  column: FooterColumn;
  palette: S.FooterPalette;
}) => {
  const titleId = useId();
  return (
    <nav css={S.column} aria-labelledby={titleId}>
      <p id={titleId} css={S.columnTitle}>
        {column.title}
      </p>
      <ul css={S.linkList}>
        {column.links.map((link) => (
          <li key={link.id}>
            <FooterLinkItem link={link} palette={palette} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * Footer - The page's bottom bar: a copyright line and legal links, and
 * optionally a logo, a short description and navigation columns above them.
 *
 * ### Default and extended
 * With only `copyright` and `links` the Footer is a single bar in one of
 * three sizes. Passing `logo`, `description` or `columns` makes it extended:
 * the brand block and columns sit above the same bar. The design has the
 * extended footer in medium only, so it ignores `size`.
 *
 * ### Links
 * A link with a `path` renders as a react-router link, so the Footer must
 * then sit inside a router; a link with an `href` renders as a plain anchor.
 * Each column is its own navigation landmark, named by its title.
 *
 * ### Layout
 * The layout follows the Footer's own width, not the window's. Below 900px
 * the bottom bar stacks the copyright over the links, and the extended
 * footer puts the brand block above its columns, two per row.
 *
 * @category Navigation
 * @example
 * ```tsx
 * <Footer
 *   copyright="Acme © 2007-2026. All rights reserved."
 *   links={[
 *     { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
 *     { id: 'terms', label: 'Terms & Conditions', path: '/terms' },
 *   ]}
 *   logo={<img src="/logo.svg" alt="Acme" height={64} />}
 *   columns={[
 *     {
 *       id: 'company',
 *       title: 'Company',
 *       links: [{ id: 'about', label: 'About us', path: '/about' }],
 *     },
 *   ]}
 * />
 * ```
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  {
    copyright,
    links = [],
    logo,
    description,
    columns = [],
    theme: footerTheme = 'light',
    size = 'small',
    linksLabel = 'Legal',
    ...props
  },
  ref,
) {
  const theme = useTheme();
  const palette = S.resolvePalette(theme, footerTheme);
  const isExtended = !!logo || !!description || columns.length > 0;

  const bottomBar = (
    <div css={S.bottomBar(isExtended ? 'medium' : size)}>
      {copyright ? <p css={S.copyright}>{copyright}</p> : <span />}
      {links.length > 0 && (
        <nav aria-label={linksLabel}>
          <ul css={S.legalList}>
            {links.map((link) => (
              <li key={link.id}>
                <FooterLinkItem link={link} palette={palette} />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );

  return (
    <footer ref={ref} css={S.container(palette)} {...props}>
      <div css={S.inner}>
        {isExtended ? (
          <div css={S.extended}>
            <div css={S.content}>
              {(logo || description) && (
                <div css={S.brand}>
                  {logo && <div css={S.logo}>{logo}</div>}
                  {description && <p css={S.description}>{description}</p>}
                </div>
              )}
              {columns.length > 0 && (
                <div css={S.columns}>
                  {columns.map((column) => (
                    <FooterNavColumn
                      key={column.id}
                      column={column}
                      palette={palette}
                    />
                  ))}
                </div>
              )}
            </div>
            {bottomBar}
          </div>
        ) : (
          bottomBar
        )}
      </div>
    </footer>
  );
});
