import { RadioProps } from '@components/Radio/types';

/**
 * Props for the RadioGroup component
 *
 * Orchestrates a set of Radio buttons so only one can be selected at a time.
 * Uncontrolled by default (`defaultValue`); pass `value` to control it. The
 * group injects `name`, `checked`, `onChange`, `isRequired` and `color` into
 * every direct Radio child via `cloneElement`; a child's own `color` wins.
 *
 * @example
 * ```tsx
 * // Uncontrolled radio group
 * <RadioGroup
 *   name="fruit"
 *   defaultValue="apple"
 *   onChange={(value) => console.log(value)}>
 *   <Radio id="r1" value="apple" text="Apple" />
 *   <Radio id="r2" value="orange" text="Orange" />
 *   <Radio id="r3" value="banana" text="Banana" disabled />
 * </RadioGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled, success color
 * const [selected, setSelected] = useState<string | number>('apple');
 * <RadioGroup
 *   name="fruit"
 *   color="success"
 *   value={selected}
 *   onChange={setSelected}>
 *   <Radio id="r1" value="apple" text="Apple" />
 *   <Radio id="r2" value="orange" text="Orange" />
 * </RadioGroup>
 * ```
 */
export interface RadioGroupProps {
  /**
   * Shared `name` given to every Radio child. Radios with one name form a
   * single Tab stop and are navigated with the arrow keys.
   */
  name: string;

  /**
   * Sets `aria-required` on the group and `required` on every radio
   * @default false
   */
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

  /**
   * Class name for the group's wrapper `<div>`. RadioGroup has no layout of
   * its own — use this (or `css`) for a row or a column.
   */
  className?: string;

  /**
   * Called with the picked radio's `value` when the user selects it
   */
  onChange: (value: string | number) => void;

  /**
   * Radio elements. Only direct `Radio` children render — fragments, wrappers
   * and other elements are dropped.
   */
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
