import { DevTool } from '@hookform/devtools';
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

// TODO: Let's use Popover!
// TODO: Let's divide by subcomponents!
// TODO: Single? Output just the input with text, instead of tokens!
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
            {/*
          ...dropdown options, filtered? server?
          ...click? add to "input", hide options + filter them
          ...check for the multiple feature
          ...fix single feature
          ...add possibility to styling the options +input...
          ...add tests
          ...add storybook
          ...add possibility to customize output
          ...add result highlighting
          */}
            <TypeaheadOptions className={optionsClassname}>
              {hookResult.items}
            </TypeaheadOptions>
          </PopoverDescription>
        </PopoverContent>
      </Popover>
      <DevTool control={hookResult.useFormResult.control} />
    </TypeaheadContext.Provider>
  );
};
