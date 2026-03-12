export type RGBString = `rgb${string}`;

type MakeColors<T extends Array<string>> = {
  [K in T[number]]?: RGBString;
};

type Colors = MakeColors<
  [
    'black',
    'black25',
    'black45',
    'white',
    'white60',
    'white80',
    'white30',
    'dark',
    'greyLighter',
    'greyLighter20',
    'greyLighter40',
    'greyLighter60',
    'greySelectedMenuItem',
    'greyFocused',
    'greyFocused40',
    'grey',
    'grey20',
    'grey40',
    'greyShadow16',
    'greyShadow24',
    'greyDarker',
    'greyDarker40',
    'greyDarker60',
    'greyDarker80',
    'greyDarker14',
    'greyDark',
    'greyDisabled',
    'greyDisabledCheckbox',
    'greyButtonGradient',
    'greyButtonGradientLight',
    'greyBackground',
    'greyBackgroundLight',
    'greyPopoverLight',
    'greyGraphite',
    'greyGraphite70',
    'greyShadow',
    'greyOutline',
    'greyShadowHover',
    'greyDropdownMain',
    'greyDropdownFocused',
    'greyDropdownText',
    'greyArrowSidebar',
    'greyFilterIcon',
    'greyCancelClearButton',
    'redLighter',
    'redLighter6',
    'redLighter40',
    'red',
    'red6',
    'redDark',
    'red40',
    'greenLighter',
    'greenLighter6',
    'greenLighter20',
    'greenLighter40',
    'greenLighter60',
    'green',
    'green6',
    'green20',
    'green40',
    'green60',
    'greenMint',
    'greenDark',
    'pink',
    'pink20',
    'pinkDark',
    'pinkDarker',
    'pinkShadow40',
    'pinkLighter',
    'pinkLighter20',
    'pinkLighter40',
    'yellow',
    'yellow20',
    'yellowLighter',
    'yellowLighter20',
    'yellowLighter40',
    'yellowWarm',
    'yellowWarm20',
    'yellowWarm40',
    'turquoise',
    'turquoise20',
    'turquoiseShadow40',
    'turquoiseLighter',
    'turquoiseLighter20',
    'turquoiseLighter40',
    'purple',
    'purple20',
    'purpleLighter',
    'purpleLighter20',
    'purpleLighter40',
    'purpleDark',
    'purpleDark40',
    'blue',
    'blue6',
    'blue20',
    'blueCool',
    'blueDark',
    'blueLightDarker',
    'blueDropdownWithSelectedItems',
    'blueDropdownWithSelectedItemsBorder',
    'blueLighter',
    'blueLighter6',
    'blueLighter20',
    'blueLighter40',
    'blueLight',
    'blueLight20',
    'blueLightDarker40',
    'blueLightLighter',
    'blueLightLighter20',
    'blueLightLighter40',
    'blueNotification',
    'blueNotification40',
    'blueButtonHoverGradientFrom',
    'blueButtonHoverGradientTo',
    'blueButtonActive',
    'blueRoyal',
    'blueRoyal6',
    'blueRoyal16',
    'blueRoyal12',
    'cyanTeal',
    'dangerShades300',
    'dangerShades500',
    'dangerShades700',
    'successShades500',
    'successShades700',
  ]
>;

export type ColorsKeys = keyof Colors;

type MediaQueryString = `@media${string}`;

/**
 * Palette color token for a single semantic color.
 *
 * Used by Button (and potentially other components) to drive background colors
 * across interactive states:
 * - `main`  — default/resting background
 * - `dark`  — hover and active (pressed) background
 * - `light` — focus background (keyboard navigation highlight)
 *
 * All three values can be `transparent` (used by the `tertiary` variant).
 */
export interface PaletteColor {
  /** Default/resting background color */
  main: RGBString | 'transparent';
  /** Focus state background — lighter, softer highlight */
  light: RGBString | 'transparent';
  /** Hover and active state background — darker, stronger emphasis */
  dark: RGBString | 'transparent';
}

/**
 * Semantic color palette for the design system.
 *
 * Each entry maps to a Button variant of the same name and controls its
 * background color across interactive states via `PaletteColor` (main / dark / light).
 *
 * Override individual entries in a custom theme to restyle Button variants
 * without affecting other components that use `theme.colors`.
 *
 * @example
 * ```ts
 * const customTheme: Theme = {
 *   ...mainTheme,
 *   palette: {
 *     ...mainTheme.palette,
 *     primary: {
 *       main: 'rgb(0, 102, 255)',
 *       dark: 'rgb(0, 51, 204)',
 *       light: 'rgb(51, 133, 255)',
 *     },
 *   },
 * };
 * ```
 */
export interface Palette {
  /** Blue brand color — high-emphasis primary actions. White text. */
  primary: PaletteColor;
  /** Grey neutral color — medium-emphasis secondary actions. Dark text. */
  secondary: PaletteColor;
  /** Red — destructive or error actions. White text. */
  error: PaletteColor;
  /** Orange — caution or warning actions. White text. */
  warning: PaletteColor;
  /** Green — success or confirmation actions. White text. */
  success: PaletteColor;
  /** All-transparent — low-emphasis ghost button. Dark text. Focus shown via outline only.
   * Legacy: we keep it in the palette for compatibility but do not recommend using it;
   * prefer component-specific options (e.g. transparent/ghost props) where available. */
  tertiary: PaletteColor;
}

export interface Theme {
  colors: Colors;
  /**
   * Semantic color palette used by Button variants.
   * Override individual entries to restyle buttons without touching global theme colors.
   */
  palette: Palette;
  mediaQueries: {
    xs: MediaQueryString;
    sm: MediaQueryString;
    upToMd: MediaQueryString;
    md: MediaQueryString;
    lg: MediaQueryString;
    xlg: MediaQueryString;
  };
}

export interface CommonProps {
  as?: React.ElementType;
  className?: string;
}
