import React, { InputHTMLAttributes } from 'react';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import Input from '@components/Input';
import Button from '@components/Button';
import * as S from '../styles';
import { useTypeaheadContext } from '../Typeahead.context';

export const MultipleTrigger = () => {
  const theme = useTheme();
  const context = useTypeaheadContext();
  const typeaheadInputAdditionalProps: InputHTMLAttributes<HTMLInputElement> =
    {};
  if (!context.selectedItems.length && !!context.placeholder) {
    typeaheadInputAdditionalProps.placeholder = context.placeholder;
  }
  return (
    <React.Fragment>
      {Object.values(context.optionsWithKey).length > 0 &&
        context.selectedItems.map((selectedItem, index) => {
          const currentOption = context.optionsWithKey[selectedItem];
          const optionText = currentOption
            ? currentOption.children ||
              currentOption.label ||
              currentOption.value
            : '';

          return (
            <S.TypeaheadItem
              key={`typeahead-selected-selectedItem-${index}`}
              onClick={context.handleSelectedClick}
              isDisabled={context.isDisabled}>
              <S.TypeaheadItemLabel isDisabled={context.isDisabled}>
                {optionText}
              </S.TypeaheadItemLabel>
              <S.TypeaheadItemCross
                isDisabled={context.isDisabled}
                endIcon={
                  <Icon
                    name="cross"
                    tooltip="Remove"
                    size={14}
                    color={
                      context.isDisabled
                        ? theme.colors.grey
                        : theme.colors.greyDarker
                    }
                    css={{
                      '& path': {
                        strokeWidth: 1,
                      },
                    }}
                  />
                }
                onClick={context.handleRemoveSelectedClick(selectedItem)}
              />
            </S.TypeaheadItem>
          );
        })}
      <S.TypeaheadInputsGroupWrapper isOpen={context.isOpen}>
        {!context.isDisabled && (
          <Input
            name={context.inputName}
            status={'custom'}
            disabled={context.isDisabled}
            validationSchema={context.validationSchema}
            inputProps={{
              onClick: context.handleInputClick,
              onKeyDown: context.handleInputKeyDown,
              onChange: context.handleInputChange,
              value: context.inputValue,
              autoComplete: 'off',
              className: ['typeahead-input', S.TypeaheadInput(theme)].join(' '),
            }}
            wrapperClassName={S.TypeaheadInputWrapper}
            ref={context.inputRef}
          />
        )}
        <input
          type="text"
          data-testid="typeahead-input"
          aria-hidden={context.isOpen}
          readOnly
          value={context.firstSuggestion}
          tabIndex={-1}
          disabled={context.isDisabled}
          className={[
            'typeahead-input',
            S.TypeaheadInput(theme),
            S.TypeaheadInputPlaceholder,
          ].join(' ')}
          {...typeaheadInputAdditionalProps}
        />
        <input
          type="hidden"
          readOnly
          value={context.selectedItems as string[]}
          {...context.register?.(context.name, context.validationSchema)}
        />
      </S.TypeaheadInputsGroupWrapper>
      {!context.isDisabled && context.selectedItems.length ? (
        <Button
          variant="tertiary"
          data-testid="remove-all-button"
          endIcon={<Icon name="cross" size={8} tooltip="Remove all" />}
          css={{
            padding: '0 10px',
            marginRight: 4,
            position: 'absolute',
            right: 0,
            zIndex: 10,
          }}
          onClick={context.handleClearAll}
        />
      ) : null}
    </React.Fragment>
  );
};
