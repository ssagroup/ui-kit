import { DateRangePickerProps } from './types';
import { getFormatForRangePickerType } from './utils';
import { DatePickerContent } from './components';
import { DateRangePickerProvider } from './DateRangePickerProvider';

/**
 * DateRangePicker — two masked inputs (**from** / **to**) with a shared popover calendar and
 * **react-hook-form** fields **`${name}From`** and **`${name}To`** inside **`FormProvider`**.
 * **`onChange`** emits **`[start, end]`** as **`Date`**, **`undefined`**, or **`null`** on the **end**
 * only for **“Present”** (open-ended range) when **`showPresentOption`** is enabled.
 *
 * ### Behavior notes
 * - **Luxon** parses strings; the form stores **formatted strings** per **format** / **rangePickerType**.
 * - Calendar selection uses a **start → end** step; **`allowReverseSelection`** can swap inverted picks.
 * - Use **`DateRangePickerFormBridge`** when the form stores **ISO** strings and **`PRESENT_VALUE`**
 *   for Present (string-safe schemas).
 *
 * @category Components
 * @subcategory Form Controls
 *
 * @example
 * ```tsx
 * import { FormProvider, useForm } from 'react-hook-form';
 * import { DateRangePicker } from '@ssa-ui-kit/core';
 *
 * function Example() {
 *   const methods = useForm({
 *     defaultValues: { tripFrom: '', tripTo: '' },
 *   });
 *   return (
 *     <FormProvider {...methods}>
 *       <DateRangePicker
 *         name="trip"
 *         label="Trip dates"
 *         onChange={(dates) => console.log(dates)}
 *       />
 *     </FormProvider>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Open-ended end date: `to === null` means Present
 * <DateRangePicker name="job" showPresentOption onChange={() => {}} />
 * ```
 *
 * @see {@link Input} — Masked inputs
 * @see {@link Popover} — Calendar overlay
 * @see {@link DateRangePickerFormBridge} — ISO / string form adapter
 *
 * @accessibility
 * - **Field** label associates with the focused input
 * - Calendar controls reuse **aria-** patterns from day/month/year views
 * - Calendar trigger uses an **aria-label** on the icon button
 */
export const DateRangePicker = ({
  format,
  showCalendarIcon = true,
  showStatusArea = true,
  rangePickerType = 'days',
  showPresentOption = false,
  ...rest
}: DateRangePickerProps) => {
  const actualFormat = format || getFormatForRangePickerType(rangePickerType);

  return (
    <DateRangePickerProvider
      format={actualFormat}
      showCalendarIcon={showCalendarIcon}
      showStatusArea={showStatusArea}
      rangePickerType={rangePickerType}
      showPresentOption={showPresentOption}
      {...rest}>
      <DatePickerContent />
    </DateRangePickerProvider>
  );
};
