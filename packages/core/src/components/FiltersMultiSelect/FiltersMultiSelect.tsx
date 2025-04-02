import { useId, useRef } from 'react';
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

export interface FiltersMultiSelectProps
  extends Pick<FieldProps, 'status' | 'disabled'> {
  children: React.ReactNode;
  description?: string;
  emptyNode?: React.ReactNode;
  error?: string;
  icon?: React.ReactNode;
  inputProps?: InputProps['inputProps'];
  fieldProps?: FieldProps;
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  selectedFilters?: SelectedFilter[];
  store?: UseFiltersMultiSelectStore;
  success?: string;
  badgeClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  onChange?: (value: SelectedFilter[]) => void;
  register?: UseFormReturn['register'];
}

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

  const emptyNode = controlledEmptyNode || (
    <FiltersMultiSelectEmpty>No Items Found</FiltersMultiSelectEmpty>
  );

  return (
    <FiltersMultiSelectProvider value={{ store, emptyNode }}>
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
              open: store.opened,
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
                        onChange: (e) => store.setSearch(e.target.value),
                        onFocus: () => store.toggleDropdown(true),
                        onKeyUp: (e) => {
                          if (e.key === 'Escape') {
                            inputRef.current?.blur();
                          }
                        },
                        autoComplete: 'off',
                        ...inputProps,
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
                  isDisabled={disabled}
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
                {store.opened ? (
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
