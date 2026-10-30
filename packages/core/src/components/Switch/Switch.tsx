import { useTheme } from '@emotion/react';
import { useControllableState } from '@ssa-ui-kit/hooks';
import SwitchBase from './SwitchBase';
import { defaultSwitchContext, useSwitchContext } from './SwitchContext';
import { resolveDisabled } from '@utils/deprecation';
import { SwitchProps } from './types';

/**
 * Switch - Toggle switch component for binary states
 *
 * A toggle switch for settings that apply immediately. Uncontrolled with
 * `defaultChecked`, controlled with `checked` + `onChange`. Inside a
 * SwitchContextProvider, and without `checked`/`defaultChecked`, the provider
 * owns the state (the original API, still supported).
 *
 * Colors are sourced from `theme.palette` for consistency with Button,
 * Checkbox, and Radio. Pass `color="custom"` together with the `colors`
 * object to supply arbitrary CSS color values.
 *
 * The off state always shows a neutral grey background (`greyFocused`).
 * When disabled, the off state uses `greySelectedMenuItem`; the on state keeps its
 * color, muted by a white overlay so the on/off distinction survives.
 * Hovering the on state darkens it: palette variants swap to their `palette.*.dark`
 * token; custom colors get a `rgba(0,0,0,0.15)` overlay so the knob stays unaffected.
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Switch label="Enable notifications" defaultChecked onChange={save} />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled, success (green) variant
 * const [isOn, setIsOn] = useState(false);
 * <Switch label="Enable feature" color="success" checked={isOn} onChange={setIsOn} />
 * ```
 *
 * @example
 * ```tsx
 * // Provider-owned state (original API)
 * <SwitchContextProvider initialState={false}>
 *   <Switch label="Enable notifications" />
 * </SwitchContextProvider>
 * ```
 *
 * @see {@link SwitchContextProvider}
 *
 * @accessibility
 * - A `<button role="switch">` with `aria-checked`; Tab to focus, Space or
 *   Enter to toggle
 * - `label` is the accessible name (`aria-label`); nothing is rendered visibly
 * - Disabled switches also get `aria-readonly`
 */
const Switch = (props: SwitchProps) => {
  const {
    label,
    disabled,
    isDisabled,
    checked,
    defaultChecked,
    onChange,
    color = 'primary',
    colors,
  } = props;
  const theme = useTheme();
  const context = useSwitchContext();
  const isSwitchDisabled =
    resolveDisabled('Switch', disabled, isDisabled) ?? false;

  // The switch keeps its own state only when one of the newer props asks for
  // it. A Switch with none of them still reads the provider — or, with no
  // provider, stays inert exactly as it always has.
  //
  // `checked` is keyed on presence, like every controlled prop in the kit (see
  // `useControllableState`), so `checked={undefined}` means "controlled, off".
  // `defaultChecked` is keyed on its value: an undefined default says nothing,
  // and must not pull a pass-through wrapper out of its provider.
  const hasProvider = context !== defaultSwitchContext;
  const isStandalone =
    'checked' in props ||
    defaultChecked !== undefined ||
    (!hasProvider && 'onChange' in props);

  const [ownIsOn, setOwnIsOn] = useControllableState<boolean>({
    controlled: 'checked' in props,
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  const isOn = isStandalone ? Boolean(ownIsOn) : context.isOn;

  const handleClick = () => {
    if (isSwitchDisabled) {
      return;
    }
    if (isStandalone) {
      setOwnIsOn(!isOn);
    } else {
      context.toggle();
      onChange?.(!isOn);
    }
  };

  let onColor: string;
  let hoverColor: string | undefined;
  let offOutlineColor: string;

  if (color === 'primary') {
    onColor = theme.palette.primary.main;
    hoverColor = theme.palette.primary.dark;
    offOutlineColor = theme.palette.primary.light;
  } else if (color === 'success') {
    onColor = theme.palette.success.main;
    hoverColor = theme.palette.success.dark;
    offOutlineColor = theme.palette.success.light;
  } else {
    onColor = colors?.on || theme.palette.primary.main;
    offOutlineColor = colors?.offOutline || theme.palette.primary.light;
  }

  return (
    <SwitchBase
      type="button"
      role="switch"
      aria-readonly={isSwitchDisabled}
      aria-checked={isOn}
      aria-label={label}
      disabled={isSwitchDisabled}
      onClick={handleClick}
      onColor={onColor}
      hoverColor={hoverColor}
      offOutlineColor={offOutlineColor}
    />
  );
};

export default Switch;
