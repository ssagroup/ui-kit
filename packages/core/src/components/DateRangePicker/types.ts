import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  FocusEventHandler,
} from 'react';
import { DateTime } from 'luxon';
import { useMask } from '@react-input/mask';
import { FieldContextValue } from '@components/Field/FieldProvider';
import { InputProps } from '@components/Input/types';

import type {
  PickerCalendarType,
  DateFormat,
} from '@components/JsonSchemaForm/utils/dateFormats';

/**
 * Which side of the range has focus for calendar selection and keyboard flow: **from** or **to**.
 */
export type LastFocusedElement = 'from' | 'to';

/**
 * Calendar granularity: **days**, **months**, or **years** (same as **DatePicker** / shared **PickerCalendarType**).
 */
export type RangePickerType = PickerCalendarType;

/**
 * Mask and parse format for both inputs (e.g. **`mm/dd/yyyy`**, **`dd/mm/yyyy`**, **`mm/yyyy`**, **`yyyy`**).
 */
export type Format = DateFormat;

/**
 * Tuple passed to **`onChange`**: **[start, end]** in JavaScript **`Date`**, **`null`**, or **`undefined`**.
 *
 * - **`Date`** — valid anchor for that side
 * - **`null`** — **end date only**: user chose **“Present”** (open-ended range). **Start** is never **`null`**.
 * - **`undefined`** — that side is empty / cleared
 */
export type DateRangePickerOnChangeDates = [
  Date | null | undefined,
  Date | null | undefined,
];

/**
 * Parsed range as **Luxon** values before emitting JS dates (**`[from, to]`**).
 */
export type DateTimeTuple = [DateTime | undefined, DateTime | undefined];

/**
 * Active calendar view: day grid, month grid, or year list (aligned with **rangePickerType** / header navigation).
 */
export type CalendarType = PickerCalendarType;

/**
 * Props for **DateRangePicker**
 *
 * Two masked inputs registered as **`${name}From`** and **`${name}To`** under **react-hook-form**
 * **`FormProvider`**. Stored values are **formatted strings**; **`onChange`** receives **`DateRangePickerOnChangeDates`**.
 * Optional **“Present”** applies only to the **end** date (**`showPresentOption`**).
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   name="employment"
 *   label="Employment period"
 *   messages={{ description: 'Start and end dates' }}
 *   onChange={(dates) => console.log(dates)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   name="period"
 *   rangePickerType="months"
 *   format="mm/yyyy"
 *   dateMin="01/2020"
 *   dateMax="12/2030"
 *   showPresentOption
 * />
 * ```
 */
export interface DateRangePickerProps {
  /**
   * Base field name; registers **`${name}From`** and **`${name}To`** with react-hook-form.
   */
  name: string;

  /**
   * Optional label (**`Field.Label`**); **`htmlFor`** follows the focused input.
   */
  label?: string;

  /**
   * Date string format for both fields. Defaults from **`rangePickerType`** if omitted.
   */
  format?: Format;

  /**
   * Initial open state for the calendar popover (controlled open seed).
   */
  isOpenState?: boolean;

  /**
   * Controlled tuple of string values matching **format**; **`null`** at index **1** means **“Present”** end.
   */
  value?: [string | undefined | null, string | undefined | null];

  /**
   * Initial tuple; **`[string, null]`** end means **Present** (open-ended).
   */
  defaultValue?: [string, string | null] | [string, string];

  /**
   * Options for **`@react-input/mask`** (shared pattern for both inputs).
   */
  maskOptions?: Parameters<typeof useMask>[0];

  /**
   * Extra props for the underlying **Input** fields.
   */
  inputProps?: Partial<InputProps>;

  /**
   * Visual status for **`Field.Root`** (**error** / **success** / **basic**).
   */
  status?: FieldContextValue['status'];

  /**
   * Whether **`messages`** render in **`TriggerStatusArea`** below the inputs.
   * @default true
   */
  showStatusArea?: boolean;

  /**
   * Inclusive minimum date string (shape matches **format** and **rangePickerType**).
   */
  dateMin?: string;

  /**
   * Inclusive maximum date string (shape matches **format** and **rangePickerType**).
   */
  dateMax?: string;

  /**
   * Disables both inputs and the calendar trigger.
   * @default false
   */
  disabled?: boolean;

  /**
   * Shows the calendar icon button to open the popover.
   * @default true
   */
  showCalendarIcon?: boolean;

  /**
   * **days** | **months** | **years** — drives default **format**, mask, and calendar chrome.
   * @default 'days'
   */
  rangePickerType?: RangePickerType;

  /**
   * Optional copy for the status area (description / success / error messaging).
   */
  messages?: {
    description?: string;
    success?: string;
    error?: string;
  };

  /**
   * Optional class names for trigger layout, inputs, icon, calendar shell, and label.
   */
  classNames?: {
    trigger?: {
      root?: string;
      controlsWrapper?: string;
      inputFrom?: string;
      inputTo?: string;
      arrowIcon?: string;
      calendarIcon?: string;
    };
    calendar?: string;
    label?: string;
  };

  /**
   * Emits **`[start, end]`** as **`Date`**, **`null`** (Present end only), or **`undefined`** per side.
   */
  onChange?: (dates?: DateRangePickerOnChangeDates) => void;

  /**
   * Calendar popover opened.
   */
  onOpen?: () => void;

  /**
   * Calendar popover closed.
   */
  onClose?: () => void;

  /**
   * Validation or parse error: raw input value and message (e.g. invalid / out of range).
   */
  onError?: (date: unknown, error?: string | null) => void;

  /**
   * Visible month changed (prev/next) while in day view.
   */
  onMonthChange?: (date: Date) => void;

  /**
   * Year changed from year list or header drill-down.
   */
  onYearChange?: (date: Date) => void;

  /**
   * Blur handler composed with internal validation.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /**
   * If the user picks an end before a start, swap the two dates instead of rejecting.
   * @default false
   */
  allowReverseSelection?: boolean;

  /**
   * Shows a **Present** control in the calendar (end date only — ongoing range).
   * @default false
   */
  showPresentOption?: boolean;
}

/**
 * Context value for **DateRangePicker** (provider + subcomponents). Extends picker props but
 * replaces **`dateMin`** / **`dateMax`** strings with **Luxon** bounds and segment arrays; adds
 * dual field names, refs, range selection step, and **Present** end state.
 *
 * Most apps use **DateRangePicker** only; this documents **useDateRangePickerContext** consumers.
 */
export interface DateRangePickerContextProps extends Omit<
  DateRangePickerProps,
  'dateMin' | 'dateMax'
> {
  /**
   * Registered field name for the **start** input (**`${name}From`**).
   */
  nameFrom: string;

  /**
   * Registered field name for the **end** input (**`${name}To`**).
   */
  nameTo: string;

  /**
   * Whether the calendar popover is open.
   */
  isOpen: boolean;

  /**
   * **Luxon** date for the calendar header / navigation (current visible month or year).
   */
  currentCalendarViewDT: DateTime;

  /**
   * **`0`** when **from** is focused, **`1`** when **to** is focused.
   */
  currentIndex: number;

  /**
   * Per-side calendar view anchors (**`[fromView, toView]`**).
   */
  calendarViewDateTime: DateTimeTuple;

  /**
   * Active popover view: **days**, **months**, or **years**.
   */
  calendarType: CalendarType;

  /**
   * Watched form value for the **from** field.
   */
  inputValueFrom?: string;

  /**
   * Watched form value for the **to** field.
   */
  inputValueTo?: string;

  /**
   * Ref for the **from** masked input (merged).
   */
  inputFromRef: React.ForwardedRef<HTMLInputElement | null>;

  /**
   * Ref for the **to** masked input (merged).
   */
  inputToRef: React.ForwardedRef<HTMLInputElement | null>;

  /**
   * Parsed **Luxon** range (**`[from, to]`**).
   */
  dateTime: DateTimeTuple;

  /**
   * **`dateMin`** split by **`/`** into numeric segments (index **i** matches **format** segment **i**).
   */
  dateMinParts: number[];

  /**
   * **`dateMax`** split by **`/`** into numeric segments (index **i** matches **format** segment **i**).
   */
  dateMaxParts: number[];

  /**
   * Inclusive minimum as **DateTime**.
   */
  dateMinDT: DateTime;

  /**
   * Inclusive maximum as **DateTime**.
   */
  dateMaxDT: DateTime;

  /**
   * Indices of **dd**, **mm**, **yyyy** in the **format** string.
   */
  formatIndexes: {
    day: number;
    month: number;
    year: number;
  };

  /**
   * Which input is focused for calendar and validation.
   */
  lastFocusedElement: LastFocusedElement;

  /**
   * Last **`onChange`** tuple in **JS** dates (supports **Present** as **`null`** on end).
   */
  lastChangedDate?: [Date | undefined | null, Date | undefined | null];

  /**
   * Internal change handler (Luxon) used when selecting from the calendar.
   */
  safeOnChange?: (date?: DateTime) => void;

  /**
   * Sets **from** vs **to** focus.
   */
  setLastFocusedElement: Dispatch<SetStateAction<LastFocusedElement>>;

  /**
   * Updates last emitted **Date** tuple for parents and highlights.
   */
  setLastChangedDate: Dispatch<
    SetStateAction<[Date | undefined | null, Date | undefined | null]>
  >;

  /**
   * Toggles popover from icon or input (**implementation**-specific rules).
   */
  handleToggleOpen: MouseEventHandler<HTMLButtonElement | HTMLInputElement>;

  /**
   * Updates one or both calendar view anchors.
   */
  setCalendarViewDateTime: Dispatch<SetStateAction<DateTimeTuple>>;

  /**
   * Sets the selected **Luxon** range.
   */
  setDateTime: Dispatch<SetStateAction<DateTimeTuple>>;

  /**
   * Opens or closes the popover.
   */
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  /**
   * Switches day / month / year surface in the popover.
   */
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;

  /**
   * **start** → **end** two-step calendar selection, or **null** when not in that flow.
   */
  rangeSelectionStep: 'start' | 'end' | null;

  setRangeSelectionStep: Dispatch<SetStateAction<'start' | 'end' | null>>;

  /**
   * Clears **from** or **to** and syncs form state.
   */
  clearInputValue: (field: 'from' | 'to') => void;

  /**
   * End field shows **Present** (open-ended); form **to** value may be empty while flag is true.
   */
  isEndDatePresent: boolean;

  setIsEndDatePresent: Dispatch<SetStateAction<boolean>>;
}
