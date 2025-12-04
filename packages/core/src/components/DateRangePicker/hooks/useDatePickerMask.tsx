import { useMask, type MaskOptions } from '@react-input/mask';

export const useDatePickerMask = ({
  maskOptions,
}: {
  maskOptions?: MaskOptions;
}) => {
  const {
    mask,
    replacement = { _: /\d/ },
    ...restMaskOptions
  } = maskOptions || {};

  const useMaskResult = useMask({
    mask,
    replacement,
    track: ({ data }) => {
      // The mask should only format input, not validate it
      // Validation happens on blur in useDateRangePicker.handleBlur
      // This allows users to freely type and edit dates without blocking
      // Return data as-is (string for insertions, null/undefined for deletions)
      return data;
    },
    ...restMaskOptions,
  });

  return useMaskResult;
};
