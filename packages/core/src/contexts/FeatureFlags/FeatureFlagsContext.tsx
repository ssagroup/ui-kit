import { createFeatureFlags } from './createFeatureFlags';
import { FeatureFlag, featureFlagRegistry, FeatureFlagName } from './registry';
import { FeatureFlagValues } from './types';

const kitFlags = createFeatureFlags(featureFlagRegistry);

/** Flag values accepted by {@link FeatureFlagsProvider}. */
export type FeatureFlags = FeatureFlagValues<typeof featureFlagRegistry>;

/**
 * Turns the kit's opt-in breaking changes on (or off) for everything inside it.
 *
 * Providers nest: an inner provider overrides only the flags it names and
 * inherits the rest, so a flag can be enabled for one page or form at a time.
 * Portaled content (popovers, dropdown lists, modals) inherits flags from where
 * it is rendered in the React tree, not from where it lands in the DOM.
 *
 * Flags you omit use the kit default, which is off until the flag's
 * `defaultIn` major. Pass `false` explicitly to keep the old behaviour and
 * silence the dev-only "becomes the default" warning.
 *
 * @example
 * ```tsx
 * // Opt in for one screen; the rest of the app keeps today's behaviour.
 * <FeatureFlagsProvider flags={{ fieldGeometryV2: true }}>
 *   <EditPageLayout />
 * </FeatureFlagsProvider>
 * ```
 */
export const FeatureFlagsProvider = kitFlags.Provider;

/**
 * Reads one of the kit's opt-in flags.
 *
 * Kit components use it to branch between old and new behaviour. Apps can use
 * it too, e.g. so a wrapper around a kit field drops its own spacing fix once
 * the flag that makes it unnecessary is on.
 *
 * @example
 * ```tsx
 * const geometryV2 = useFeatureFlag('fieldGeometryV2');
 * const height = geometryV2 ? 44 : 46;
 * ```
 */
export const useFeatureFlag = kitFlags.useFlag;

/**
 * Reads all of the kit's opt-in flags at once, resolved against providers and
 * kit defaults.
 *
 * Handy when a component branches on several flags. Only the flags you
 * actually read count towards the dev-only "becomes the default" warning.
 *
 * @example
 * ```tsx
 * const { fieldGeometryV2 } = useFeatureFlags();
 * ```
 */
export const useFeatureFlags = kitFlags.useFlags;

export { FeatureFlag, featureFlagRegistry };
export type { FeatureFlagName };
