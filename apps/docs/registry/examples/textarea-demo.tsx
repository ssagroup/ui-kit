'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function TextareaDemo() {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [charCount, setCharCount] = useState(0);
  const maxLength = 120;

  return (
    <PreviewRoot>
      <div style={{ width: 320, maxWidth: '100%' }}>
        <Textarea
          name="bio"
          placeholder="Tell us about yourself"
          register={register}
          validationSchema={{
            required: 'Bio is required',
            maxLength: {
              value: maxLength,
              message: `Maximum ${maxLength} characters`,
            },
          }}
          status={errors.bio ? 'error' : 'basic'}
          rows={4}
          maxLength={maxLength}
          setCountChar={(e) =>
            setCharCount((e.target as HTMLTextAreaElement).value.length)
          }
        />
        <div
          style={{
            textAlign: 'right',
            fontSize: 12,
            color: '#6b7280',
            marginTop: 4,
          }}
        >
          {charCount} / {maxLength}
        </div>
      </div>
    </PreviewRoot>
  );
}
