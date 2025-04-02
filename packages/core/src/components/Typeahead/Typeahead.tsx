import { useTheme } from '@emotion/react';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@components/Popover';
import FormHelperText from '@components/FormHelperText';
import Wrapper from '@components/Wrapper';
import Label from '@components/Label';
import { TypeaheadContext } from './Typeahead.context';
import { useTypeahead } from './useTypeahead';
import { TypeaheadOptions, TypeaheadTrigger } from './components';
import { TypeaheadProps } from './types';

/**
 * The structure of the component:
 * - TypeaheadTrigger
 * - TypeaheadOptions
 * - FormHelperText
 *
 * Aria attributes are set according to
 * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
 **/
export const Typeahead = ({
  name = 'typeahead-search',
  label,
  initialSelectedItems,
  isOpen,
  isDisabled,
  isMultiple,
  children,
  className,
  startIcon,
  endIcon,
  error,
  success,
  helperText,
  validationSchema,
  placeholder = 'Select something',
  startIconClassName,
  endIconClassName,
  optionsClassName,
  wrapperClassName,
  width = 300,
  setValue,
  register,
  onChange,
  onEmptyChange,
  renderOption,
}: TypeaheadProps) => {
  const theme = useTheme();
  const hookResult = useTypeahead({
    name,
    initialSelectedItems,
    isOpen,
    isDisabled,
    isMultiple,
    children,
    className,
    startIcon,
    endIcon,
    startIconClassName,
    endIconClassName,
    error,
    success,
    validationSchema,
    placeholder,
    setValue,
    register,
    onChange,
    onEmptyChange,
    renderOption,
  });

  return (
    <TypeaheadContext.Provider value={hookResult}>
      <Wrapper
        css={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          width,
        }}
        className={wrapperClassName}
        data-testid="typeahead">
        {label && (
          <Label
            htmlFor={hookResult.inputName}
            isDisabled={isDisabled}
            data-testid="typeahead-label">
            {label}
          </Label>
        )}
        <Popover
          keyboardHandlers={false}
          floatingOptions={{
            onOpenChange: hookResult.handleOpenChange,
            open: hookResult.isOpen,
          }}>
          <TypeaheadTrigger />
          <PopoverContent
            css={{
              width: hookResult.triggerRef.current?.clientWidth,
              boxShadow: `-4px 4px 14px 0px ${theme.colors.greyDarker14}`,
              zIndex: 100,
            }}
            isFocusManagerDisabled>
            <PopoverDescription css={{ width: '100%' }}>
              {hookResult.isOpen ? (
                <TypeaheadOptions className={optionsClassName}>
                  {children}
                </TypeaheadOptions>
              ) : null}
            </PopoverDescription>
          </PopoverContent>
        </Popover>
        {(hookResult.status === 'error' || helperText) && (
          <FormHelperText
            role="status"
            status={hookResult.status}
            disabled={isDisabled}
            data-testid="helper-text">
            {error ? error?.message : helperText}
          </FormHelperText>
        )}
      </Wrapper>
    </TypeaheadContext.Provider>
  );
};
