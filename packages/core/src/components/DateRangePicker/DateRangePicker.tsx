import { DatePicker } from '@components/DatePicker';
import Icon from '@components/Icon';
import Wrapper from '@components/Wrapper';
import { DateRangePickerProps } from './types';

export const DateRangePicker = (props: DateRangePickerProps) => {
  /**
   * TODO:
   * - output both datepickers without own label + calendar icon
   * - handle helper text as a single helper text region
   * --- input props? add an additional prop?
   */
  return (
    <Wrapper>
      <DatePicker name="datepicker-range-from" {...props} />
      <Icon name="carrot-right" size={10} />
      <DatePicker name="datepicker-range-to" {...props} />
    </Wrapper>
  );
};
