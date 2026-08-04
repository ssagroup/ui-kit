import { axe } from 'jest-axe';

// jest-axe declares its result type but does not export it.
type AxeResults = Awaited<ReturnType<typeof axe>>;

/**
 * Rules that cannot produce a trustworthy result under jsdom.
 *
 * jsdom implements no layout engine and no CSS cascade for computed colours, so
 * these rules either throw or silently pass on everything. Disabling them keeps
 * the suite honest — a passing axe run should mean "no violations axe could
 * actually evaluate here", not "no violations".
 *
 * They still matter, so they are covered elsewhere:
 * - colour contrast is enforced by design tokens plus Chromatic/Lost Pixel
 *   visual review;
 * - the region/landmark rules are page-level concerns and do not apply to a
 *   component rendered in isolation.
 */
const JSDOM_UNSUPPORTED_RULES = {
  'color-contrast': { enabled: false },
  region: { enabled: false },
  'landmark-one-main': { enabled: false },
  'page-has-heading-one': { enabled: false },
  'html-has-lang': { enabled: false },
} as const;

export type AxeOptions = {
  /**
   * Extra rule overrides, merged over the jsdom defaults. Use to switch off a
   * rule that genuinely does not apply to a component in isolation — always
   * with a comment explaining why.
   */
  rules?: Record<string, { enabled: boolean }>;
};

/**
 * Runs axe against an already-rendered container.
 *
 * Usage:
 * ```ts
 * const { container } = render(<Button text="Save" />);
 * expect(await checkA11y(container)).toHaveNoViolations();
 * ```
 */
export const checkA11y = (
  container: Element,
  options: AxeOptions = {},
): Promise<AxeResults> =>
  axe(container, {
    rules: { ...JSDOM_UNSUPPORTED_RULES, ...(options.rules ?? {}) },
  });
