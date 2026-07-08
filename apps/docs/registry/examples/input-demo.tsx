'use client';

import { useForm, type FieldError } from 'react-hook-form';
import { Input, Icon } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function InputDemo() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <PreviewRoot>
      <div style={{ width: 280, maxWidth: '100%' }}>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          validationSchema={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          status={errors.email ? 'error' : 'basic'}
          errors={errors.email as FieldError | undefined}
          showHelperText
          helperText="We'll never share your email"
          startElement={<Icon name="email" size={16} />}
        />
      </div>
    </PreviewRoot>
  );
}
