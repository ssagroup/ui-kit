'use client';

import { useForm, FormProvider, type FieldValues } from 'react-hook-form';
import { DateRangePicker } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function DateRangePickerDemo() {
  const methods = useForm<FieldValues>({ defaultValues: {} });

  return (
    <PreviewRoot>
      <FormProvider {...methods}>
        <div style={{ width: 328, maxWidth: '100%' }}>
          <DateRangePicker
            name="period"
            label="Reporting period"
            showClearButton
            defaultValue={['02/10/2025', '02/15/2025']}
            messages={{ description: 'Select a start and end date' }}
          />
        </div>
      </FormProvider>
    </PreviewRoot>
  );
}
