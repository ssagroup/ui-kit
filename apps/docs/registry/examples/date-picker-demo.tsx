'use client';

import { useForm, FormProvider, type FieldValues } from 'react-hook-form';
import { DatePicker } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function DatePickerDemo() {
  const methods = useForm<FieldValues>({
    defaultValues: { startDate: '01/15/2025 09:30' },
  });

  return (
    <PreviewRoot>
      <FormProvider {...methods}>
        <div style={{ width: 328, maxWidth: '100%' }}>
          <DatePicker
            name="startDate"
            label="Meeting starts"
            showTimePicker
            showClearButton
            defaultValue="01/15/2025 09:30"
            helperText="Pick a day, then an hour and minute"
          />
        </div>
      </FormProvider>
    </PreviewRoot>
  );
}
