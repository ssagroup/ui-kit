import {
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@components/Popover';
import Label from '@components/Label';
import FormHelperText from '@components/FormHelperText';
import Wrapper from '@components/Wrapper';
import { TypeaheadContext } from './Typeahead.context';
import { TypeaheadOptions } from './TypeaheadOptions';
import { useTypeahead } from './useTypeahead';
import { TypeaheadTrigger } from './components';
import { TypeaheadProps } from './types';

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

// TODO: name
// TODO: register?
/*

- add tests
- add storybook
- add possibility to customize output
- add the possibility to customize tokens output
--- renderMultipleToken?
- add result highlighting
- add "name"
- add "register"
- add "label (title)"
- add disabled state + story
- add success state + story
- add error state + story
- add cross icon + action
- do we need highlighting here?

- inputName ---- check - when submit - get rid!
*/
export const Typeahead = ({
  name = 'typeahead-search',
  label,
  initialSelectedItems = [],
  isOpen,
  isDisabled,
  isMultiple,
  children,
  className,
  optionsClassname,
  startIcon,
  endIcon,
  errors,
  success,
  helperText,
  validationSchema,
  setValue,
  register,
  onChange,
  renderOption,
}: TypeaheadProps) => {
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
    setValue,
    register,
    onChange,
    renderOption,
  });
  const status = success ? 'success' : errors ? 'error' : 'basic';
  return (
    <TypeaheadContext.Provider value={hookResult}>
      <Wrapper
        css={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <Label htmlFor={`typeahead-${name}`}>{label}</Label>
        <Popover
          floatingOptions={{
            onOpenChange: hookResult.handleOpenChange,
            open: hookResult.isOpen,
          }}>
          <TypeaheadTrigger />
          <PopoverContent
            css={{ width: hookResult.triggerRef.current?.clientWidth }}
            isFocusManagerDisabled>
            <PopoverDescription css={{ width: '100%' }}>
              <TypeaheadOptions className={optionsClassname}>
                {hookResult.items}
              </TypeaheadOptions>
            </PopoverDescription>
          </PopoverContent>
        </Popover>
        <FormHelperText role="status" status={status} disabled={isDisabled}>
          {errors ? errors?.message : helperText}
        </FormHelperText>
      </Wrapper>
    </TypeaheadContext.Provider>
  );
};
