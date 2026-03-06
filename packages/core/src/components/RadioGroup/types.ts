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
 *   <Radio id="r3" value="banana" text="Banana" isDisabled />
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
