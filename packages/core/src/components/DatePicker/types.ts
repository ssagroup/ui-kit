import { Dispatch, SetStateAction } from 'react';
import { useMask } from '@react-input/mask';
import { DateTime } from 'luxon';
import { InputProps } from '@components/Input/types';
import { PICKER_TYPE } from './constants';
import { RegisterOptions } from 'react-hook-form';
import type {
  PickerCalendarType,
  DateFormat,
} from '@components/JsonSchemaForm/utils/dateFormats';

/**
 * Which calendar granularity the picker uses: full **days**, **months** only, or **years** only.
 * Drives default **format**, mask, initial calendar view, and the **Date** passed to **onChange**
 * (`startOf('day' | 'month' | 'year')`).
 *
 * - **`days`** — `mm/dd/yyyy` (or `dd/mm/yyyy`), day-level selection
 * - **`months`** — `mm/yyyy`, month-level selection
 * - **`years`** — `yyyy`, year-level selection
 */
export type PickerType = (typeof PICKER_TYPE)[keyof typeof PICKER_TYPE];

/**
 * Input/output string format for the form field. Must match **`pickerType`** (e.g. **`yyyy`** for
 * year picker). Parsed with Luxon using **`mm`** → month tokens in the format string.
 *
 * - **`mm/dd/yyyy`** | **`dd/mm/yyyy`** — day pickers
 * - **`mm/yyyy`** — month picker
 * - **`yyyy`** — year picker
 */
export type DatePickerFormat = DateFormat;

/**
 * Which surface of the popover calendar is shown: day grid, month grid, or year list.
 * Usually advanced; the header toggles this for day pickers.
 */
export type CalendarType = PickerCalendarType;

/**
 * Props for the DatePicker component
 *
 * Masked date field integrated with **react-hook-form**. Register **`name`** via
 * **`FormProvider`**; the stored value is the **formatted string**. Use **`onChange`** for a
 * **`Date`** (or undefined when cleared). Optional **`dateMin`** / **`dateMax`** use the same
 * string shape as **`format`**.
 *
 * @example
 * ```tsx
 * // Basic (day picker, US format)
 * <DatePicker name="due" label="Due date" helperText="Optional" />
 * ```
 *
 * @example
 * ```tsx
 * // European format, open calendar from icon or input
 * <DatePicker
 *   name="eu"
 *   format="dd/mm/yyyy"
 *   openCalendarMode="both"
 *   dateMin="01/01/2024"
 *   dateMax="31/12/2025"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Month-only picker with bounds
 * <DatePicker
 *   name="period"
 *   label="Period"
 *   pickerType="months"
 *   dateMin="01/2020"
 *   dateMax="12/2030"
 * />
 * ```
 */
export interface DatePickerProps {
  /**
   * Field name registered with react-hook-form (**required**).
   */
  name: string;

  /**
   * Optional label rendered above the input (**`Label`**).
   */
  label?: string;

  /**
   * Date string format for display, mask, and parsing.
   * @default From **`pickerType`**: `mm/dd/yyyy`, `mm/yyyy`, or `yyyy`
   */
  format?: DatePickerFormat;

  /**
   * Options passed to **`@react-input/mask`** (mask pattern, **`replacement`**, etc.).
   * Defaults include the built-in date/month/year masks.
   */
  maskOptions?: Parameters<typeof useMask>[0];

  /**
   * What opens the calendar: calendar **icon** only, **input** click only, or **both**.
   * @default 'icon'
   */
  openCalendarMode?: 'icon' | 'input' | 'both';

  /**
   * Day vs month vs year picker; sets default **format**, mask length, and calendar start view.
   * @default 'days' (**`PICKER_TYPE.DAYS`**)
   */
  pickerType?: PickerType;

  /**
   * Extra props forwarded to the underlying **Input** (e.g. **`id`**, **`inputProps`**).
   */
  inputProps?: Partial<InputProps>;

  /**
   * Controlled string value (must match **format**). Synced into the form via **`setValue`**.
   */
  value?: string;

  /**
   * Initial string value when uncontrolled (must match **format**).
   */
  defaultValue?: string;

  /**
   * Inclusive minimum date as a string in the current **format** (and **pickerType**).
   * @default Built-in minimum for the picker type (e.g. `01/01/1900` for days)
   */
  dateMin?: string;

  /**
   * Inclusive maximum date as a string in the current **format** (and **pickerType**).
   * @default Built-in maximum for the picker type (e.g. `01/01/2150` for days)
   */
  dateMax?: string;

  /**
   * Disables the input and calendar trigger.
   * @default false
   */
  disabled?: boolean;

  /**
   * Helper text below the field (shown with validation message when present).
   */
  helperText?: string;

  /**
   * Whether the trailing calendar icon button is shown.
   * @default true
   */
  showCalendarIcon?: boolean;

  /**
   * Last **Date** emitted from **onChange**; used with **`highlightDates`** for range styling
   * in the calendar (e.g. paired with another picker’s value).
   */
  lastChangedDate?: Date;

  /**
   * Optional range highlight between this picker’s value and **`otherDate`** (e.g. date-range UX).
   */
  highlightDates?: {
    /**
     * When true, range styling is applied between anchors according to **mode**.
     */
    enabled: boolean;
    /**
     * Whether this picker represents the **start** or **end** of the highlighted span.
     */
    mode: 'dateFrom' | 'dateTo';
    /**
     * The other boundary date (from a sibling field or parent state).
     */
    otherDate: Date | null;
  };

  /**
   * Optional class names for calendar shell, header, trigger, month arrows, and label.
   */
  classNames?: {
    header?: string;
    trigger?: {
      input?: string;
      calendarIcon?: string;
    };
    monthsSwitch?: {
      wrapper?: string;
      previousMonth?: string;
      nextMonth?: string;
    };
    calendar?: string;
    label?: string;
  };

  /**
   * Called with the selected **`Date`** (Luxon-normalized to start of day/month/year), or
   * **undefined** when the field is cleared or invalid.
   */
  onChange?: (date?: Date) => void;

  /**
   * Called when the popover opens.
   */
  onOpen?: () => void;

  /**
   * Called when the popover closes (not on first mount).
   */
  onClose?: () => void;

  /**
   * Called when validation fails or clears: first argument is the raw input string or **null**;
   * second is an error message (e.g. invalid date / out of range) or **null** when cleared.
   */
  onError?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    date: any,
    error?: string | null,
  ) => void;

  /**
   * Called when the visible month changes (day picker, prev/next month).
   */
  onMonthChange?: (date: Date) => void;

  /**
   * Called when the selected or browsed **year** changes (year list or drilling into months).
   */
  onYearChange?: (date: Date) => void;

  /**
   * Blur handler composed with internal validation (runs after **`processValue`** on blur).
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * Extra **react-hook-form** rules merged with the field (e.g. **required**).
   */
  validationSchema?: RegisterOptions;
}

/**
 * Context value for **DatePicker** internals (provider) and advanced composition.
 * Extends **DatePicker** props but replaces **`dateMin`** / **`dateMax`** strings with parsed
 * **Luxon** values and numeric parts for masks; adds open state and calendar navigation.
 *
 * Most consumers should use **DatePicker** only; this type documents hooks and subcomponents
 * that read context.
 */
export interface DatePickerContextProps extends Omit<
  DatePickerProps,
  'dateMin' | 'dateMax'
> {
  /**
   * Ref applied to the masked **input** (merged: mask ref + forwarded ref from **DatePicker**).
   */
  inputRef?: React.ForwardedRef<HTMLInputElement | null>;

  /**
   * Whether the calendar popover is open.
   */
  isOpen: boolean;

  /**
   * Active calendar surface: days grid, months, or years.
   */
  calendarType: CalendarType;

  /**
   * Current string value watched from the form (may be partial while typing).
   */
  inputValue?: string;

  /**
   * Parsed selected value in the picker’s **Luxon** representation.
   */
  dateTime?: DateTime;

  /**
   * **Luxon** date driving the visible calendar month/year (clamped between min and max).
   */
  calendarViewDateTime?: DateTime;

  /**
   * **`dateMin`** string split by **`/`** into numeric segments (index **i** matches **format** segment **i**).
   */
  dateMinParts: number[];

  /**
   * **`dateMax`** string split by **`/`** into numeric segments (index **i** matches **format** segment **i**).
   */
  dateMaxParts: number[];

  /**
   * Inclusive minimum as **DateTime** (from **dateMin** or defaults).
   */
  dateMinDT: DateTime;

  /**
   * Inclusive maximum as **DateTime** (from **dateMax** or defaults).
   */
  dateMaxDT: DateTime;

  /**
   * Indices of **day**, **month**, and **year** segments in the format string (for masks and bounds).
   */
  formatIndexes: {
    day: number;
    month: number;
    year: number;
  };

  /**
   * Resolved picker type (**days** / **months** / **years**).
   */
  pickerType: PickerType;

  /**
   * Internal **onChange** that dedupes emissions and normalizes to the picker **unit**.
   */
  safeOnChange?: (date?: DateTime) => void;

  /**
   * Updates the calendar’s visible month/year without necessarily committing a selection.
   */
  setCalendarViewDateTime: Dispatch<SetStateAction<DateTime | undefined>>;

  /**
   * Sets the selected **DateTime** (and syncs formatted string to the form when valid).
   */
  setDateTime: Dispatch<SetStateAction<DateTime<boolean> | undefined>>;

  /**
   * Opens or closes the popover.
   */
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  /**
   * Switches between days / months / years views in the popover.
   */
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;
}
