import type { ReactNode } from 'react';
import {
  enumOptionsIndexForValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  EnumOptionsType,
} from '@rjsf/utils';
import {
  highlightInputMatch,
  Typeahead,
  TypeaheadOption,
  Avatar,
} from '@components';

const DEFAULT_AVATAR_SIZE = 20;

type AvatarOption = string | { image: string; size?: number };

type SelectOptionSchemaExtension = {
  avatar?: AvatarOption;
};

type SelectWidgetUiOptions = {
  typeaheadAvatarSize?: number;
};

const getAvatarNode = <S extends StrictRJSFSchema>(
  option: EnumOptionsType<S>,
  uiOptions: SelectWidgetUiOptions,
): ReactNode => {
  const avatar = (option.schema as SelectOptionSchemaExtension | undefined)
    ?.avatar;

  if (!avatar) return;

  const { image, size } =
    typeof avatar === 'string' ? { image: avatar, size: undefined } : avatar;

  if (!image) return;

  const avatarSize =
    size ?? uiOptions.typeaheadAvatarSize ?? DEFAULT_AVATAR_SIZE;

  return <Avatar size={avatarSize} image={image} />;
};

export const SelectWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const {
    id,
    name,
    disabled,
    options,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    value,
    onChangeOverride,
    multiple,
    uiSchema,
  } = props;
  const { enumOptions = [], enumDisabled = [] } = options;
  const customPlaceholder = placeholder || uiSchema?.['ui:placeholder'];
  const selectUiOptions =
    (uiSchema?.['ui:options'] as SelectWidgetUiOptions) || {};

  const isMultiple = !!multiple || Array.isArray(value);
  const items = Array.isArray(enumOptions)
    ? (enumOptions as EnumOptionsType<S>[])
    : [];

  const handleChange = onChangeOverride
    ? onChangeOverride
    : (value?: string | number | (string | number)[]) => {
        onChange(value);
      };

  const getSelectedItems = (): (string | number)[] => {
    if (isMultiple) {
      if (Array.isArray(value)) return value;
      if (value !== undefined) return [value];
      return [];
    }

    if (value === undefined || value === null) return [];

    const index = enumOptionsIndexForValue<S>(value, enumOptions);
    return index !== undefined ? [value] : [];
  };

  const selectedItems = getSelectedItems();

  const handleFormChange = (
    newValue: string | number | (string | number)[],
  ) => {
    if (isMultiple) {
      const arrayValue = Array.isArray(newValue) ? newValue : [newValue];
      handleChange(arrayValue);
    } else {
      const singleValue = Array.isArray(newValue) ? newValue[0] : newValue;
      handleChange(singleValue);
    }
  };

  const handleTypeaheadChange = (
    changedValue: string | number,
    isAdded: boolean,
  ) => {
    if (isMultiple) {
      const newSelected = isAdded
        ? [...selectedItems, changedValue]
        : selectedItems.filter((item) => item !== changedValue);
      handleFormChange(newSelected);
    } else {
      const newValue = isAdded ? changedValue : undefined;
      handleFormChange(newValue as string | number);
    }
  };

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, target && target.value);

  const handleFocus = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onFocus(id, target && target.value);

  const onEmptyChange = (isEmpty?: boolean) => {
    if (isEmpty) {
      handleChange(isMultiple ? [] : undefined);
    }
  };

  const onClearAll = () => {
    handleChange(isMultiple ? [] : undefined);
  };

  const onRemoveSelectedClick = (removedValue: string | number) => {
    if (isMultiple) {
      const newSelected = selectedItems.filter((item) => item !== removedValue);
      handleChange(newSelected);
    } else {
      handleChange(undefined);
    }
  };

  return (
    <div id={id} onBlur={handleBlur} onFocus={handleFocus}>
      <Typeahead
        width="100%"
        selectedItems={selectedItems}
        isDisabled={disabled}
        name={name}
        isMultiple={isMultiple}
        placeholder={customPlaceholder || undefined}
        onChange={handleTypeaheadChange}
        onEmptyChange={onEmptyChange}
        onClearAll={onClearAll}
        onRemoveSelectedClick={onRemoveSelectedClick}
        renderOption={({ label, input }) => highlightInputMatch(label, input)}>
        {items.map((item) => (
          <TypeaheadOption
            key={item.value}
            value={item.value}
            label={item.label || item.value}
            avatar={getAvatarNode(item, selectUiOptions)}
            isDisabled={
              disabled ||
              (Array.isArray(enumDisabled) &&
                enumDisabled.includes(item.value as string))
            }>
            {item.label || item.value}
          </TypeaheadOption>
        ))}
      </Typeahead>
    </div>
  );
};
