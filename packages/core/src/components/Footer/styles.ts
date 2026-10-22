import { css, Theme } from '@emotion/react';

import { FooterSize, FooterTheme } from './types';

export const TYPOGRAPHY: Record<
  FooterSize,
  { fontSize: number; lineHeight: number; fontWeight: number }
> = {
  small: { fontSize: 14, lineHeight: 18, fontWeight: 500 },
  medium: { fontSize: 16, lineHeight: 24, fontWeight: 500 },
  large: { fontSize: 20, lineHeight: 28, fontWeight: 600 },
};

/** From this footer width up the design layout; below it, everything stacks. */
export const DESKTOP_MIN_WIDTH = 900;

/**
 * A container query, as in the Header: the layout follows the footer's own
 * width, so a Footer in a narrow region of a page stacks too.
 */
const desktop = `@container ssa-footer (min-width: ${DESKTOP_MIN_WIDTH}px)`;

export const resolvePalette = (theme: Theme, footerTheme: FooterTheme) => {
  switch (footerTheme) {
    case 'dark':
      // Same bar as the dark Header, so the two match on one page.
      return {
        background: `linear-gradient(172deg, ${theme.colors.greyDarker} 0%, ${theme.colors.greyDark} 100%)`,
        text: theme.colors.white80,
        accent: theme.colors.blueDropdownWithSelectedItemsBorder,
      };
    case 'light':
      return {
        background: theme.palette.secondary.dark,
        text: theme.colors.greyDarker,
        accent: theme.palette.primary.dark,
      };
  }
};

export type FooterPalette = ReturnType<typeof resolvePalette>;

const typography = (size: FooterSize) => css`
  font-size: ${TYPOGRAPHY[size].fontSize}px;
  font-weight: ${TYPOGRAPHY[size].fontWeight};
  line-height: ${TYPOGRAPHY[size].lineHeight}px;
`;

/**
 * The query container. It is the footer itself, so consumer styles land on
 * the outermost element; the padding the query switches lives on the inner
 * wrapper, as a container cannot query its own width. The kit's global reset
 * gives every element its own color, hence the explicit inherit inside.
 */
export const container = (palette: FooterPalette) => css`
  container: ssa-footer / inline-size;
  display: block;
  width: 100%;
  background: ${palette.background};
  color: ${palette.text};

  & * {
    color: inherit;
  }
`;

export const inner = css`
  padding: 12px 16px;

  ${desktop} {
    padding: 12px 40px;
  }
`;

/**
 * Design: 24px above the content, 40px between it and the bottom bar. The
 * container already pads 12px, so this adds the other 12px on top.
 */
export const extended = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 12px;

  ${desktop} {
    gap: 40px;
  }
`;

export const content = css`
  display: flex;
  flex-direction: column;
  gap: 32px;

  ${desktop} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const brand = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  max-width: 320px;
`;

/**
 * Fixed height, as in the design's placeholder; width follows the logo so
 * wordmarks fit.
 */
export const logo = css`
  display: flex;
  align-items: center;
  height: 64px;
  min-width: 64px;

  & > img,
  & > svg {
    display: block;
    max-height: 100%;
  }
`;

export const description = css`
  margin: 0;
  ${typography('medium')};
  font-weight: 700;
`;

/**
 * Two columns side by side on phones. On desktop the design's 160px gaps,
 * shrinking with the footer so a fourth column still fits.
 */
export const columns = css`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 16px;

  ${desktop} {
    display: flex;
    column-gap: clamp(40px, 11cqi, 160px);
  }
`;

export const column = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const columnTitle = css`
  margin: 0;
  ${typography('medium')};
  font-weight: 700;
`;

export const linkList = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  ${typography('medium')};
`;

/** Stacked on phones; copyright left and links right from 900px. */
export const bottomBar = (size: FooterSize) => css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${typography(size)};

  ${desktop} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }
`;

export const copyright = css`
  margin: 0;
`;

export const legalList = css`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const link = (theme: Theme, palette: FooterPalette) => css`
  color: inherit;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: ${palette.accent};
  }

  &:focus-visible {
    outline: 2px solid ${theme.palette.primary.main};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;
