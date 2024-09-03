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
 * Let's check all with Figma
 * add tests
 * add storybooks?
 * + check all options for the context
 * + check colors for the error/success
 * fix description for this component
 * ?- add stories for the Button component? start/endIconClassname?
 */

// TODO: Let's check:
/**
 * The structure of the component:
 *
 * MultipleDropdown
 *   DropdownToggle
 *   MultipleDropdownOptions
 *     DropdownOption
 *
 * Aria attributes are set according to
 * https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 **/

/*

- add tests
+ add storybook
+ add possibility to customize output
+ add the possibility to customize tokens output
+++ renderMultipleToken?
+ add result highlighting
+ add "name"
+ add "register"
+ add "label (title)"
- add disabled state + story
+ add success state + story
+ add error state + story
+ add cross icon + action
+ do we need highlighting here?

+ helper text?

+ inputName ---- check - when submit - get rid!

- do we need all options for the context?

// TODO: WithError => remove an error on choosing?
// TODO: add disabled story
// TODO: use colors from Figma for the borders?..
// +++ Dynamically changed items
*/
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
  errors,
  success,
  helperText,
  validationSchema,
  placeholder = 'Select something',
  startIconClassName,
  endIconClassName,
  optionsClassName,
  setValue,
  register,
  onChange,
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
    errors,
    success,
    validationSchema,
    placeholder,
    setValue,
    register,
    onChange,
    renderOption,
  });

  return (
    <TypeaheadContext.Provider value={hookResult}>
      <Wrapper
        css={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
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
          floatingOptions={{
            onOpenChange: hookResult.handleOpenChange,
            open: hookResult.isOpen,
          }}>
          <TypeaheadTrigger />
          <PopoverContent
            css={{
              width: hookResult.triggerRef.current?.clientWidth,
              boxShadow: `-4px 4px 14px 0px ${theme.colors.greyDarker14}`,
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
        {(errors?.message || helperText) && (
          <FormHelperText
            role="status"
            status={hookResult.status}
            disabled={isDisabled}>
            {errors ? errors?.message : helperText}
          </FormHelperText>
        )}
      </Wrapper>
    </TypeaheadContext.Provider>
  );
};
