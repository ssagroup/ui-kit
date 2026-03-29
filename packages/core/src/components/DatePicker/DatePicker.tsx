import { forwardRef } from 'react';
import { DatePickerProps } from './types';
import { DatePickerContent } from './components';
import { DatePickerProvider } from './DatePickerContext';

/**
 * DatePicker — masked date input with a popover calendar. Use inside **`FormProvider`**
 * (react-hook-form): the field value is the formatted string; **`onChange`** receives a
 * JavaScript **`Date`** (or undefined when cleared). Supports **day**, **month**, or **year**
 * granularity via **`pickerType`**, **`mm/dd/yyyy`** / **`dd/mm/yyyy`** / **`mm/yyyy`** / **`yyyy`**
 * formats, optional **min/max** bounds, and **openCalendarMode** (icon, input, or both).
 *
 * ### Behavior notes
 * - Parsing and display use **Luxon**; the form stores the string matching **`format`**.
 * - Validation runs when the mask is complete or on **blur**; errors surface through
 *   react-hook-form and **`onError`**.
 * - **`highlightDates`** helps range UIs by styling days between two dates.
 *
 * @category Components
 * @subcategory Form Controls
 *
 * @example
 * ```tsx
 * import { FormProvider, useForm } from 'react-hook-form';
 * import { DatePicker } from '@ssa-ui-kit/core';
 *
 * function Example() {
 *   const methods = useForm({ defaultValues: { startDate: '' } });
 *   return (
 *     <FormProvider {...methods}>
 *       <DatePicker
 *         name="startDate"
 *         label="Start date"
 *         format="mm/dd/yyyy"
 *         onChange={(date) => console.log(date)}
 *       />
 *     </FormProvider>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Month picker (mm/yyyy) with bounds
 * <DatePicker
 *   name="period"
 *   label="Period"
 *   pickerType="months"
 *   dateMin="01/2020"
 *   dateMax="12/2030"
 *   onChange={(d) => {}}
 * />
 * ```
 *
 * @see {@link Input} — Underlying text field
 * @see {@link Popover} — Calendar overlay
 *
 * @accessibility
 * - Label is associated with the input via **`htmlFor`** / **`id`**
 * - Calendar days use **`aria-disabled`** and **`aria-label`** where applicable
 * - Icon trigger exposes **`aria-label="Calendar"`**
 */
const DatePickerInner = (
  {
    format,
    openCalendarMode = 'icon',
    showCalendarIcon = true,
    ...rest
  }: DatePickerProps,
  inputRef?: React.ForwardedRef<HTMLInputElement | null>,
) => (
  <DatePickerProvider
    format={format}
    openCalendarMode={openCalendarMode}
    inputRef={inputRef}
    showCalendarIcon={showCalendarIcon}
    {...rest}>
    <DatePickerContent />
  </DatePickerProvider>
);

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  DatePickerInner,
);
