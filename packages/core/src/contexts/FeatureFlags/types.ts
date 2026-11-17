/**
 * Describes one opt-in flag in a {@link FeatureFlagRegistry}.
 *
 * A flag is a breaking change that ships early, switched off: the new
 * behaviour lands in a minor release, consumers opt in when ready, the default
 * flips at `defaultIn`, and the flag is deleted one major after that.
 */
export interface FeatureFlagDefinition {
  /** What turning the flag on changes, in one or two sentences. */
  description: string;
  /** Kit version the flag first shipped in, e.g. `'3.28.0'`. */
  introducedIn: string;
  /**
   * Major version in which the flag defaults to on, e.g. `'4.0.0'`. Until then
   * a dev-only warning nudges apps that have not decided either way.
   */
  defaultIn: string;
  /**
   * Current default. `false` while the flag is opt-in; set to `true` in the
   * `defaultIn` major, where apps can still pass `false` to keep the old
   * behaviour for one more major.
   */
  default: boolean;
  /** Ticket or PR with the migration notes, shown in the dev warning. */
  issue?: string;
}

/** Every flag the kit knows about, keyed by flag name. */
export type FeatureFlagRegistry = Record<string, FeatureFlagDefinition>;

/**
 * The `flags` value a {@link FeatureFlagRegistry} accepts: each flag is
 * optional, and an omitted flag falls back to the parent provider, then to the
 * registry default.
 */
export type FeatureFlagValues<R extends FeatureFlagRegistry> = Partial<
  Record<keyof R & string, boolean>
>;
