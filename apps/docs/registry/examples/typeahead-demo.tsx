'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Typeahead, TypeaheadOption, highlightInputMatch } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

const items = [
  { id: 1, value: 'TypeScript' },
  { id: 2, value: 'JavaScript' },
  { id: 3, value: 'Rust' },
  { id: 4, value: 'Go' },
  { id: 5, value: 'Python' },
  { id: 6, value: 'Swift' },
];

export default function TypeaheadDemo() {
  const methods = useForm();

  return (
    <PreviewRoot>
      <FormProvider {...methods}>
        <form style={{ width: 320, maxWidth: '100%', paddingBottom: 220 }}>
          <Typeahead
            name="language"
            label="Language"
            helperText="Start typing to filter"
            defaultSelectedItems={[items[0].id]}
            renderOption={({ label, input }) =>
              highlightInputMatch(label, input)
            }
          >
            {items.map(({ value, id }) => (
              <TypeaheadOption key={id} value={id} label={String(value)}>
                {value}
              </TypeaheadOption>
            ))}
          </Typeahead>
        </form>
      </FormProvider>
    </PreviewRoot>
  );
}
