/**
 * Color utilities shared by notification components (`Alert`, `Toast`, …).
 *
 * Used by any component that accepts a `color` prop and needs to auto-derive
 * readable text/icon colors, darkened border/accent shades, or luminance checks.
 *
 * Theme colors are `rgba(r, g, b, a)` strings. Arbitrary CSS colors passed by
 * consumers may be hex (`#rrggbb`) or any valid CSS color. Functions here handle
 * both formats and fall back gracefully (returning the original string) for
 * formats they cannot parse.
 */

/** Extracts [r, g, b] (0-255) from an rgba/rgb or #rrggbb string. */
function parseRgb(color: string): [number, number, number] | null {
  const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10),
    ];
  }

  const hexMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (hexMatch) {
    return [
      parseInt(hexMatch[1], 16),
      parseInt(hexMatch[2], 16),
      parseInt(hexMatch[3], 16),
    ];
  }

  return null;
}

/**
 * Computes relative luminance (WCAG 2.x formula).
 * Returns a value in [0, 1] — 0 = black, 1 = white.
 */
function getRelativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Returns `true` when the color is perceptually dark enough to need light
 * text/icons on top of it.
 *
 * Uses the WCAG luminance threshold (L < 0.179 ≈ midpoint between black and
 * "mid-grey" at contrast ratio ~3:1 against white).
 */
export function isColorDark(color: string): boolean {
  const rgb = parseRgb(color);
  if (!rgb) return false;
  return getRelativeLuminance(rgb) < 0.179;
}

/**
 * Returns a darkened version of the color by multiplying each RGB channel by
 * `factor` (default 0.65 → 35% darker).
 *
 * Falls back to the original string when the color format is not parsable
 * (e.g. CSS named colors, `hsl()`, `color-mix()`).
 */
export function darkenColor(color: string, factor = 0.65): string {
  const rgb = parseRgb(color);
  if (!rgb) return color;
  const [r, g, b] = rgb.map((c) => Math.round(c * factor));
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Returns either `'rgba(255, 255, 255, 1)'` (white) or `'rgba(43, 45, 49, 1)'`
 * (greyDarker) depending on whether the background color is perceived as dark
 * or light.
 *
 * Intended for computing readable text/icon colors on a custom background.
 *
 * @param bgColor - The background color to contrast against.
 * @param darkText - The dark text color to use on light backgrounds.
 *                   Defaults to `rgba(43, 45, 49, 1)` (theme `greyDarker`).
 * @param lightText - The light text color to use on dark backgrounds.
 *                    Defaults to `rgba(255, 255, 255, 1)` (white).
 */
export function getContrastColor(
  bgColor: string,
  darkText = 'rgba(43, 45, 49, 1)',
  lightText = 'rgba(255, 255, 255, 1)',
): string {
  return isColorDark(bgColor) ? lightText : darkText;
}
