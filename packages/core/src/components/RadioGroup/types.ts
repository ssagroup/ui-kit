import { RadioProps } from '@components/Radio/types';

/**
 * Props for the RadioGroup component
 *
 * Orchestrates a set of Radio buttons so only one can be selected at a time.
 * The group manages the active value in internal state, syncs with `externalState`,
 * and injects `name`, `isChecked`, and `onChange` into every Radio child via
 * `cloneElement`. Individual Radio components can still override the group's
 * `color` prop with their own `color` prop.
 *
 * @example
 * ```tsx
 * // Basic radio group
 * <RadioGroup name="fruit" onChange={(value) => console.log(value)}>
 *   <Radio id="r1" value="apple" text="Apple" />
 *   <Radio id="r2" value="orange" text="Orange" />
 *   <Radio id="r3" value="banana" text="Banana" disabled />
 * </RadioGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled with external state and success color
 * const [selected, setSelected] = useState('apple');
 * <RadioGroup
 *   name="fruit"
 *   color="success"
 *   externalState={selected}
 *   onChange={setSelected}>
 *   <Radio id="r1" value="apple" text="Apple" />
 *   <Radio id="r2" value="orange" text="Orange" />
 * </RadioGroup>
 * ```
 */
export interface RadioGroupProps {
  name: string;
  isRequired?: boolean;

  /**
   * Selected value, for the controlled pattern. When provided, the parent owns
   * the selection and the group only reports intent through `onChange`.
   */
  value?: string | number;

  /**
   * Initially selected value. Only used when neither `value` nor the
   * deprecated `externalState` is provided — both of those track the parent
   * for the group's whole lifetime and so outrank an initial value.
   */
  defaultValue?: string | number;

  /**
   * @deprecated Use `value` instead. Removed in the next major release.
   * Note the semantics differ slightly: `externalState` is synced *into*
   * internal state, so the group still moves on click even when the parent
   * ignores `onChange`. `value` is fully controlled.
   */
  externalState?: string | number;
  className?: string;
  onChange: (value: string | number) => void;
  children?: React.ReactElement<RadioProps>[] | React.ReactElement<RadioProps>;
  /**
   * Palette-based color variant applied to every Radio child.
   * Individual Radio components can still override this with their own `color` prop.
   * - `primary` — blue (uses `palette.primary`)
   * - `success` — green (uses `palette.success`)
   * - `custom` — pass `colors` to each Radio individually
   * @default 'primary'
   */
  color?: RadioProps['color'];
}
