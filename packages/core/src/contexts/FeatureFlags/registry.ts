import { FeatureFlagRegistry } from './types';

/**
 * The kit's opt-in flags.
 *
 * Adding a flag:
 * 1. Add an entry here with `default: false` and a `defaultIn` major.
 * 2. Read it with `useFeatureFlag('name')` and branch on it. Keep the old path
 *    byte-for-byte unchanged, since that is what every app gets by default.
 * 3. Test both paths, and add a story that pins the flag on via
 *    `parameters.featureFlags`.
 *
 * Lifecycle:
 * - In the `defaultIn` major, set `default: true`. Apps can still pass `false`.
 * - One major later, delete the entry and the old code path. Apps still
 *   passing the flag get a dev warning that it no longer exists.
 *
 * Group related changes under one flag (e.g. all field-geometry changes under
 * `fieldGeometryV2`) rather than adding one flag per tweak.
 */
export const featureFlagRegistry = {
  fieldGeometryV2: {
    description:
      'Form fields share one geometry (44px border-box controls, 12px radius, ' +
      'top-aligned labels), so fields of different kinds line up in a row. ' +
      'Unlabelled TextFields drop their empty <label> and its 6px gap; ' +
      'MultipleDropdown grows from 40px to 44px and loses its 250px cap.',
    introducedIn: '3.28.0',
    defaultIn: '4.0.0',
    default: false,
    issue: '#703',
  },
  buttonV2: {
    description:
      'A disabled Button greys its icons and children too, not only a `text` ' +
      'label, and shows a not-allowed cursor. The 6px icon gap also applies ' +
      'next to a `children` label, and in block mode. ButtonGroup wraps its ' +
      'buttons in an inline-flex <span role="group"> that takes `className` ' +
      'and `aria-label`.',
    introducedIn: '3.28.0',
    defaultIn: '4.0.0',
    default: false,
    issue: '#704',
  },
} as const satisfies FeatureFlagRegistry;

/** Names of the kit's opt-in flags. */
export type FeatureFlagName = keyof typeof featureFlagRegistry & string;

/**
 * Every flag name, for use as a key instead of a hand-typed string.
 *
 * @example
 * ```tsx
 * <FeatureFlagsProvider flags={{ [FeatureFlag.fieldGeometryV2]: true }}>
 * ```
 */
export const FeatureFlag = Object.freeze(
  Object.fromEntries(
    Object.keys(featureFlagRegistry).map((name) => [name, name]),
  ),
) as { readonly [K in FeatureFlagName]: K };
