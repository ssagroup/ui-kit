import { useFormContext } from 'react-hook-form';
import * as C from '@components';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

export const TriggerStatusArea = () => {
  const formContext = useFormContext();
  const { messages, nameFrom, nameTo } = useDateRangePickerContext();

  const errorsFrom = formContext.formState.errors[nameFrom]?.message;
  const errorsTo = formContext.formState.errors[nameTo]?.message;
  const errorMessage = [errorsFrom, errorsTo].filter(Boolean) as string[];

  return (
    <>
      {messages?.description && (
        <C.Field.Description>{messages?.description}</C.Field.Description>
      )}
      {(errorMessage.length || messages?.error) && (
        <C.Field.Error>
          {errorMessage.length
            ? errorMessage.map((error, index) => (
                <span
                  key={`error-${index}`}
                  css={{
                    color: 'inherit',
                    '&::first-letter': { textTransform: 'uppercase' },
                  }}>
                  {error}
                </span>
              ))
            : messages?.error}
        </C.Field.Error>
      )}
      {messages?.success && (
        <C.Field.Success>{messages?.success}</C.Field.Success>
      )}
    </>
  );
};
