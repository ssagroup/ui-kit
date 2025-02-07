import { MouseEventHandler } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import * as C from '@components';
import { useDatePickerContext } from '../useDatePickerContext';

export const DatePickerTrigger = () => {
  const { format, name, openCalendarMode, inputRef, setIsOpen } =
    useDatePickerContext();
  const formContext = useFormContext(); // Using FormProvider from react-hook-form
  const useFormResult = useForm();
  const hookFormResult = formContext ?? useFormResult;
  const { register } = hookFormResult;

  const toggleOpen = () => {
    // console.log('>>>toggleOpen', isOpen);
    setIsOpen((current) => !current);
  };

  const handleToggleOpen: MouseEventHandler<HTMLElement> = (e) => {
    const tagName = e.currentTarget.tagName.toLowerCase();
    if (
      openCalendarMode === 'both' ||
      (openCalendarMode === 'input' && tagName === 'input') ||
      (openCalendarMode === 'icon' && tagName === 'button')
    ) {
      toggleOpen();
    }
  };
  return (
    <C.PopoverTrigger asChild>
      <C.Input
        name={name}
        placeholder={format}
        showHelperText
        ref={inputRef}
        register={register}
        inputProps={{
          onClick: handleToggleOpen,
        }}
        endElement={
          <C.Button
            endIcon={<C.Icon name="calendar" size={16} />}
            onClick={handleToggleOpen}
            variant="tertiary"
            css={{
              padding: 0,
              cursor: openCalendarMode === 'input' ? 'default' : 'pointer',
              '&:focus::before': {
                display: 'none',
              },
            }}
          />
        }
      />
    </C.PopoverTrigger>
  );
};
