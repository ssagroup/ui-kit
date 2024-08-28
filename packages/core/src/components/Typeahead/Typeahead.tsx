import { TypeaheadProps } from './types';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@components/Popover';
import { TypeaheadContext } from './Typeahead.context';
import { TypeaheadOptions } from './TypeaheadOptions';
import { useTypeahead } from './useTypeahead';
import { TypeaheadTrigger } from './components';

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
*/
export const Typeahead = ({
  initialSelectedItems = [],
  isOpen,
  isDisabled,
  isMultiple,
  children,
  className,
  optionsClassname,
  onChange,
  renderOption,
}: TypeaheadProps) => {
  const hookResult = useTypeahead({
    initialSelectedItems,
    isOpen,
    isDisabled,
    isMultiple,
    children,
    className,
    onChange,
    renderOption,
  });

  return (
    <TypeaheadContext.Provider value={hookResult}>
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
    </TypeaheadContext.Provider>
  );
};
