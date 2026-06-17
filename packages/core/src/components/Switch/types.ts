/**
 * Props for the Switch component
 *
 * Toggle switch component for binary on/off states. Must be used within
 * SwitchContextProvider to access toggle state and functionality.
 *
 * Colors are driven by `theme.palette` for consistency with Button, Checkbox,
 * and Radio:
 * - `primary` (default) — blue; uses `palette.primary.main` for the on-state
 *   background, `palette.primary.dark` on hover, `palette.primary.light` for
 *   the off-state focus outline.
 * - `success` — green; uses `palette.success.main` for the on-state background,
 *   `palette.success.dark` on hover, `palette.success.light` for the off-state
 *   focus outline.
 * - `custom` — no built-in color; supply exact values via the `colors` prop.
 *   On hover, a `rgba(0,0,0,0.15)` overlay darkens the track; the knob is unaffected.
 *
 * The off state always uses a neutral grey background (`greyFocused`) regardless
 * of variant. Disabled state always uses `greySelectedMenuItem` (same for all variants).
 *
 * @example
 * ```tsx
 * // Default (primary / blue)
 * <SwitchContextProvider initialState={false}>
 *   <Switch label="Enable notifications" />
 * </SwitchContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Success (green) variant
 * <SwitchContextProvider initialState={false}>
 *   <Switch label="Enable feature" color="success" />
 * </SwitchContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Custom color escape hatch
 * <SwitchContextProvider initialState={false}>
 *   <Switch
 *     label="Custom toggle"
 *     color="custom"
 *     colors={{
 *       on: '#ff0000',
 *       offOutline: '#ff9999',
 *     }}
 *   />
 * </SwitchContextProvider>
 * ```
 */
export interface SwitchProps {
  /**
   * Accessible label for the switch
   * Used as aria-label for screen readers
   */
  label: string;

  /**
   * Whether the switch is disabled
   * Disabled switches cannot be toggled; background becomes `greySelectedMenuItem`
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Palette-based color variant.
   * - `primary` — blue (uses `palette.primary`)
   * - `success` — green (uses `palette.success`)
   * - `custom` — no built-in color; supply exact values via the `colors` prop
   * @default 'primary'
   */
  color?: 'primary' | 'success' | 'custom';

  /**
   * Fine-grained color overrides — only applied when `color="custom"`.
   */
  colors?: {
    /** Background color when the switch is on (checked) */
    on?: string;
    /** Border color of the outline shown when off and focused/hovered */
    offOutline?: string;
  };
}
