import { css, SerializedStyles, Theme } from '@emotion/react';

/**
 * Shared skin for floating surfaces (Tooltip, Popover).
 *
 * Tooltip and Popover stay separate components on purpose — they have
 * different roles, interactions and focus behavior — but they render the same
 * surface, so the visual tokens live here instead of being duplicated (and
 * drifting) in each component's own styles.
 *
 * The two deliberately disagree on what an *unset* surface means, because they
 * started from different places:
 * - Tooltip has always drawn a surface of its own, so it defaults to
 *   `color: 'grey'` and `hasShadow: true`.
 * - Popover has always been a bare positioned container whose content brings
 *   its own surface, so `color` is unset by default and `hasShadow` follows it
 *   (`Boolean(color)`) — leaving every popover written before these props
 *   existed rendering exactly as it did.
 *
 * Everything below the defaults — the tokens themselves — is identical for
 * both.
 */

/**
 * Color scheme of a floating surface — mirrors the `Color` dimension of the
 * design.
 * - `grey`: light grey surface with dark text
 * - `white`: white surface with dark text — bordered by default
 * - `dark`: dark surface with white text
 * - `nonOpaque`: semi-transparent white surface with dark text
 */
export type FloatingSurfaceColor = 'grey' | 'white' | 'dark' | 'nonOpaque';

/** Padding/typography scale of a floating surface. */
export type FloatingSurfaceSize = 'small' | 'medium' | 'large';

export const small = css`
  font-size: 8px;
  line-height: normal;
  padding: 6px 12px;
`;

export const medium = css`
  font-size: 12px;
  line-height: 16px;
  padding: 8px 16px;
`;

export const large = css`
  font-size: 14px;
  line-height: 18px;
  padding: 12px 20px;
`;

export const surfaceSizes: Record<FloatingSurfaceSize, SerializedStyles> = {
  small,
  medium,
  large,
};

/** The two colors a surface is built from. */
interface SurfacePalette {
  /** Surface background — also fills the arrow. */
  background: (theme: Theme) => string | undefined;
  /**
   * Surface text color, as an explicit value.
   *
   * Needed wherever `currentColor`/inheritance can't be relied on — a global
   * `* { color: … }` reset (Storybook ships one, and consumer apps often do
   * too) sets the computed color of every element it matches, including nested
   * SVGs, so `currentColor` there resolves to the reset's value rather than the
   * surface's.
   */
  text: (theme: Theme) => string | undefined;
}

/**
 * Single source of truth for the surface colors. The `background`/`text`/`css`
 * lookups below are all derived from it, so a variant can't end up with a
 * background from one map and a text color from another.
 */
export const surfacePalettes: Record<FloatingSurfaceColor, SurfacePalette> = {
  grey: {
    background: (theme) => theme.palette.secondary.light,
    text: (theme) => theme.colors.greyDarker,
  },
  white: {
    background: (theme) => theme.colors.white,
    text: (theme) => theme.colors.greyDarker,
  },
  dark: {
    background: (theme) => theme.colors.greyBackground,
    text: (theme) => theme.colors.white,
  },
  nonOpaque: {
    background: (theme) => theme.colors.white64,
    text: (theme) => theme.colors.greyDarker,
  },
};

const skin = (color: FloatingSurfaceColor) => (theme: Theme) => css`
  background: ${surfacePalettes[color].background(theme)};
  color: ${surfacePalettes[color].text(theme)};
`;

export const grey = skin('grey');
export const white = skin('white');
export const dark = skin('dark');
export const nonOpaque = skin('nonOpaque');

export const surfaceColors: Record<
  FloatingSurfaceColor,
  (theme: Theme) => SerializedStyles
> = {
  grey,
  white,
  dark,
  nonOpaque,
};

/** Background color of a surface — also used to fill its arrow. */
export const surfaceBackgrounds: Record<
  FloatingSurfaceColor,
  (theme: Theme) => string | undefined
> = {
  grey: surfacePalettes.grey.background,
  white: surfacePalettes.white.background,
  dark: surfacePalettes.dark.background,
  nonOpaque: surfacePalettes.nonOpaque.background,
};

/** Text color of a surface, as an explicit value. */
export const surfaceTextColors: Record<
  FloatingSurfaceColor,
  (theme: Theme) => string | undefined
> = {
  grey: surfacePalettes.grey.text,
  white: surfacePalettes.white.text,
  dark: surfacePalettes.dark.text,
  nonOpaque: surfacePalettes.nonOpaque.text,
};

export const border = (theme: Theme) => css`
  border: 1px solid ${theme.colors.grey};
`;

export const shadow = (theme: Theme) => css`
  box-shadow: 0 10px 40px ${theme.colors.greyShadow};
`;

export const radius = css`
  border-radius: 8px;
`;

/**
 * Headline rendered above the surface content.
 *
 * `color` is declared rather than left to plain inheritance: a global
 * `* { color: … }` reset (Storybook ships one, and consumer apps often do too)
 * outranks an inherited value, so the headline would otherwise ignore the
 * surface color.
 */
export const title = css`
  font-weight: 700;
  color: inherit;
`;

/** Applied to the surface when a title is rendered alongside its content. */
export const withTitle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

/**
 * Whether a border is drawn by default for a given color — only the white
 * surface is outlined in the design, but the two are independent and either
 * default can be overridden.
 */
export const isBorderedByDefault = (color?: FloatingSurfaceColor) =>
  color === 'white';

/** Arrow attributes a consumer may override, e.g. through `arrowProps`. */
export interface SurfaceArrowOverrides {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface SurfaceArrowOptions {
  theme: Theme;
  /**
   * Surface color the arrow is filled from. Unset falls back to
   * {@link FALLBACK_ARROW_SURFACE}, since an unpainted arrow renders black.
   */
  color?: FloatingSurfaceColor;
  /** Whether the surface itself is outlined. */
  hasBorder?: boolean;
  overrides?: SurfaceArrowOverrides;
}

/**
 * Surface an arrow is filled from when the component draws none of its own.
 *
 * A colorless surface has no background to read, but the fill can't simply be
 * left out: `FloatingArrow` spreads it onto the `<svg>`, so an undefined fill
 * means no `fill` attribute at all and the arrow falls back to SVG's initial
 * value — solid black. The kit's own unstyled popovers (the date-range
 * calendar, the dropdown menus) put a white card in the content, so that is
 * what the arrow assumes; anything else sets `color` or `arrowProps.fill`.
 */
const FALLBACK_ARROW_SURFACE: FloatingSurfaceColor = 'white';

/**
 * Resolves a floating arrow's paint from the surface it points out of, so
 * Tooltip and Popover can't drift apart on it.
 *
 * The outline is tied to the surface's own: an arrow is a cut-out of the
 * surface, so a stroke on it only reads correctly when the surface is bordered
 * too. Without a border there is no stroke, whatever `arrowProps` asks for.
 */
export const resolveSurfaceArrowProps = ({
  theme,
  color,
  hasBorder,
  overrides,
}: SurfaceArrowOptions): SurfaceArrowOverrides => ({
  fill:
    overrides?.fill ??
    surfaceBackgrounds[color ?? FALLBACK_ARROW_SURFACE](theme),
  stroke: hasBorder ? (overrides?.stroke ?? theme.colors.grey) : undefined,
  strokeWidth: hasBorder ? (overrides?.strokeWidth ?? 1) : undefined,
});
