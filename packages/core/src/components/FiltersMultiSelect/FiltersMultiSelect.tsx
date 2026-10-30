import { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { UseFormReturn } from 'react-hook-form';
import { useResizeObserver } from '@ssa-ui-kit/hooks';
import {
  Input,
  Field,
  FieldProps,
  Button,
  Icon,
  Wrapper,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTrigger,
} from '@components';
import { InputProps } from '@components/Input/types';
import {
  SelectedFilter,
  useFilterMultiSelect,
  UseFiltersMultiSelectStore,
} from './useFiltersMultiSelect';
import { FiltersMultiSelectProvider } from './FiltersMultiSelectProvider';
import { FilterBadge } from './components/FilterBadge';
import { FiltersMultiSelectEmpty } from './components/FiltersMultiSelectEmpty';
import {
  getContextMenuOptionId,
  getNextActiveValue,
  nextIncludeExcludeType,
} from '@components/ContextMenu';
import { FilterMenuItem, getMenuType, setFilterType } from './utils';

/**
 * Props for the FiltersMultiSelect component.
 */
export interface FiltersMultiSelectProps extends Pick<
  FieldProps,
  'status' | 'disabled'
> {
  /** A `FiltersMultiSelectOptions` with the `FiltersMultiSelectOption` rows. */
  children: React.ReactNode;
  /** Helper text below the field, shown while `status` is `'basic'`. */
  description?: string;
  /**
   * Shown in the list when it has no options.
   * @default 'No Items Found'
   */
  emptyNode?: React.ReactNode;
  /** Error message below the field, shown while `status` is `'error'`. */
  error?: string;
  /** Element at the start of the field, before the badges. */
  icon?: React.ReactNode;
  /**
   * Props for the search `<input>`. `onKeyDown` runs before the component's
   * own keyboard handling; `onChange` and `onFocus` replace the component's
   * handlers, so the search and opening on focus stop working.
   */
  inputProps?: InputProps['inputProps'];
  /** Props for the underlying `Field.Root`. */
  fieldProps?: FieldProps;
  /** Label above the field; names the search input. */
  label?: string;
  /** Placeholder of the search input. */
  placeholder?: string;
  /**
   * Shows the search input. Without it the list can only be opened with the
   * pointer.
   * @default true
   */
  searchable?: boolean;
  /**
   * Controlled selection for the built-in store. Ignored when `store` is
   * passed — give it to `useFilterMultiSelect` instead.
   */
  selectedFilters?: SelectedFilter[];
  /**
   * Store from `useFilterMultiSelect`. Needed to read `store.search` and
   * filter the options, and to change the selection or open state from
   * outside. Without it the component keeps its own store.
   */
  store?: UseFiltersMultiSelectStore;
  /** Success message below the field, shown while `status` is `'success'`. */
  success?: string;
  /** Class name for every selected-filter badge. */
  badgeClassName?: string;
  /** Class name for the search input. */
  inputClassName?: string;
  /** Class name for the bordered box around the badges and the input. */
  wrapperClassName?: string;
  /**
   * Called with the whole new selection on every change, for the built-in
   * store. Ignored when `store` is passed — give it to `useFilterMultiSelect`
   * instead.
   */
  onChange?: (value: SelectedFilter[]) => void;
  /** React Hook Form `register`, applied to the search input. */
  register?: UseFormReturn['register'];
}

/**
 * FiltersMultiSelect - Search field for building an include / exclude filter
 * set.
 *
 * Each `FiltersMultiSelectOption` row can be included (+) or excluded (−);
 * `group` rows are selected with a single check. The selection shows as
 * badges coloured by type inside the field. The component does not filter
 * the options: read `store.search` from a `useFilterMultiSelect` store and
 * render the matching rows.
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * const store = useFilterMultiSelect({ onChange: setSelected });
 *
 * <FiltersMultiSelect store={store} label="Filters">
 *   <FiltersMultiSelectOptions>
 *     {filters
 *       .filter((filter) => filter.label.includes(store.search))
 *       .map((filter) => (
 *         <FiltersMultiSelectOption key={filter.id} filter={filter}>
 *           {filter.label}
 *         </FiltersMultiSelectOption>
 *       ))}
 *   </FiltersMultiSelectOptions>
 * </FiltersMultiSelect>
 * ```
 *
 * @see {@link useFilterMultiSelect} - The store
 * @see {@link FiltersMultiSelectOptions} - The options list
 *
 * @accessibility
 * - Focus stays in the search input; the highlighted row is announced
 *   through `aria-activedescendant`
 * - Arrow keys open the list and move the highlight; Enter cycles the row
 *   none → include → exclude → none (group rows: none ⇄ selected)
 * - Escape and Tab close the list
 */
export const FiltersMultiSelect = ({
  children,
  description,
  disabled,
  emptyNode: controlledEmptyNode,
  error,
  icon,
  fieldProps,
  inputProps,
  label,
  placeholder,
  searchable = true,
  selectedFilters: controlledSelectedFilters,
  status,
  store: controlledStore,
  success,
  badgeClassName,
  inputClassName,
  wrapperClassName,
  onChange,
  register,
}: FiltersMultiSelectProps) => {
  const id = useId();

  const [wrapperRef] = useResizeObserver<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uncontrolledStore = useFilterMultiSelect({
    selectedFilters: controlledSelectedFilters,
    onChange,
  });
  const store = controlledStore || uncontrolledStore;

  const { selectedFilters } = store;

  const listId = `filters-multi-select-list-${id}`;
  const itemsRef = useRef<FilterMenuItem[]>([]);
  // Highlighted option. Focus stays in the search input, which drives the
  // list and points at the option with aria-activedescendant.
  const [activeValue, setActiveValue] = useState<string | null>(null);

  useEffect(() => {
    if (!store.open) setActiveValue(null);
  }, [store.open]);

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    inputProps?.onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;
    const items = itemsRef.current;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        // Home / End stay with the input's caret.
        event.preventDefault();
        if (!store.open) {
          store.toggleDropdown(true);
          return;
        }
        const next = getNextActiveValue(items, activeValue, event.key);
        if (next != null) setActiveValue(next);
        break;
      }
      case 'Enter': {
        const item = items.find((entry) => entry.value === activeValue);
        if (!store.open || !item) return;
        // none → include → exclude → none; groups: none ⇄ selected.
        event.preventDefault();
        setFilterType(
          store,
          item.filter,
          nextIncludeExcludeType(
            getMenuType(store, item.filter.id),
            !!item.filter.group,
          ),
        );
        break;
      }
      case 'Tab':
        if (store.open) store.toggleDropdown(false);
        break;
    }
  };

  const emptyNode = controlledEmptyNode || (
    <FiltersMultiSelectEmpty>No Items Found</FiltersMultiSelectEmpty>
  );

  return (
    <FiltersMultiSelectProvider
      value={{
        store,
        emptyNode,
        listId,
        activeValue,
        setActiveValue,
        itemsRef,
      }}>
      <Field.Root disabled={disabled} status={status} {...fieldProps}>
        {label && (
          <Field.Label htmlFor={`formElement-search-${id}`}>
            {label}
          </Field.Label>
        )}
        <Field.Control controlRef={inputRef}>
          <Popover
            keyboardHandlers={false}
            floatingOptions={{
              onOpenChange: (open, event, reason) => {
                if (disabled) return;
                if (
                  (reason === 'click' &&
                    event?.target === wrapperRef.current) ||
                  ['outside-press', 'escape-key'].includes(reason || '')
                ) {
                  store.toggleDropdown(open);
                }
              },
              open: store.open,
            }}>
            <PopoverTrigger asChild>
              <Wrapper
                css={{ padding: '6px 14px' }}
                ref={wrapperRef}
                className={wrapperClassName}>
                <Wrapper
                  css={{
                    gap: '8px',
                    flexWrap: 'wrap',
                    flexGrow: 1,
                  }}>
                  {icon}
                  {selectedFilters.map((filter) => (
                    <FilterBadge
                      className={badgeClassName}
                      key={filter.id}
                      type={filter.type}
                      disabled={disabled}
                      withRemoveButton
                      onRemove={() => store.unselectFilters(filter)}>
                      {filter.label}
                    </FilterBadge>
                  ))}
                  {searchable && (
                    <Input
                      className={inputClassName}
                      name={`search-${id}`}
                      register={register}
                      placeholder={placeholder}
                      disabled={disabled}
                      status="custom"
                      inputProps={{
                        onChange: (e) => {
                          store.setSearch(e.target.value);
                          setActiveValue(null);
                        },
                        onFocus: () => store.toggleDropdown(true),
                        onKeyUp: (e) => {
                          if (e.key === 'Escape') {
                            inputRef.current?.blur();
                          }
                        },
                        autoComplete: 'off',
                        'aria-controls': store.open ? listId : undefined,
                        'aria-activedescendant':
                          store.open && activeValue !== null
                            ? getContextMenuOptionId(listId, activeValue)
                            : undefined,
                        ...inputProps,
                        onKeyDown: handleInputKeyDown,
                      }}
                      ref={inputRef}
                      wrapperClassName={css`
                        width: auto !important;
                        flex-grow: 1;
                      `}
                      css={{
                        with: 'auto',
                        border: '0 !important',
                        padding: '2px 0',
                        height: '32px',
                        borderRadius: 0,
                      }}
                    />
                  )}
                </Wrapper>
                <Button
                  data-testid="clear-all-filters"
                  variant="tertiary"
                  disabled={disabled}
                  css={{
                    height: '32px',
                    display:
                      disabled || !store.selectedFilters.length
                        ? 'none'
                        : 'inline-flex',
                    cursor: disabled ? 'default' : 'pointer',
                  }}
                  onClick={() =>
                    store.unselectFilters(...store.selectedFilters)
                  }
                  endIcon={
                    <Icon
                      name="cross"
                      role="button"
                      size={12}
                      css={{
                        '& path': {
                          strokeWidth: 1,
                        },
                      }}
                    />
                  }
                />
                {store.open ? (
                  <Icon name="carrot-up" size={12} />
                ) : (
                  <Icon name="carrot-down" size={12} />
                )}
              </Wrapper>
            </PopoverTrigger>
            <PopoverContent
              css={{
                width: wrapperRef.current?.clientWidth,
                zIndex: 100,
              }}
              isFocusManagerDisabled>
              <PopoverDescription css={{ width: '100%' }}>
                {children}
              </PopoverDescription>
            </PopoverContent>
          </Popover>
        </Field.Control>
        <Field.Description>{description}</Field.Description>
        <Field.Error>{error}</Field.Error>
        <Field.Success>{success}</Field.Success>
      </Field.Root>
    </FiltersMultiSelectProvider>
  );
};
