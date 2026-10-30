/**
 * Props for the Switch component
 *
 * Toggle switch for a binary on/off setting. Uncontrolled with
 * `defaultChecked`, controlled with `checked` + `onChange`; inside a
 * SwitchContextProvider (without `checked`/`defaultChecked`) the provider owns
 * the state.
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
 * of variant. When disabled, the off state uses `greySelectedMenuItem` while the
 * on state keeps its color, muted by a white overlay, so a locked-on switch
 * still reads as on.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Switch label="Enable notifications" defaultChecked onChange={save} />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled
 * const [isOn, setIsOn] = useState(false);
 * <Switch label="Enable notifications" checked={isOn} onChange={setIsOn} />
 * ```
 *
 * @example
 * ```tsx
 * // Custom color escape hatch
 * <Switch
 *   label="Custom toggle"
 *   defaultChecked
 *   color="custom"
 *   colors={{ on: '#ff0000', offOutline: '#ff9999' }}
 * />
 * ```
 */
export interface SwitchProps {
  /**
   * Accessible label for the switch
   * Used as aria-label for screen readers
   */
  label: string;

  /**
   * On state, for the controlled pattern. When provided, the parent owns the
   * value: a click only calls `onChange(next)`. Takes precedence over a
   * SwitchContextProvider.
   *
   * Controlled-ness is decided by the prop being passed at all, so
   * `checked={undefined}` renders a controlled switch that is off. Omit the
   * prop (don't pass `undefined`) to leave the switch uncontrolled.
   */
  checked?: boolean;

  /**
   * Initial on state for an uncontrolled switch. Read on mount only. Takes
   * precedence over a SwitchContextProvider.
   */
  defaultChecked?: boolean;

  /**
   * Called with the new on state after every user toggle — in standalone,
   * controlled and provider mode alike. Passing it without a provider makes
   * the switch keep its own state, starting off.
   */
  onChange?: (checked: boolean) => void;

  /**
   * Whether the switch is disabled
   * Disabled switches cannot be toggled. The off state becomes
   * `greySelectedMenuItem`; the on state keeps its color, muted.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the switch is disabled
   *
   * @deprecated Use `disabled` instead. Removed in the next major release.
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
