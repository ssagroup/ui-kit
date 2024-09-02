import React from 'react';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import Input from '@components/Input';
import * as S from '../styles';
import { useTypeaheadContext } from '../Typeahead.context';
import Button from '@components/Button';

export const MultipleTrigger = () => {
  const theme = useTheme();
  const context = useTypeaheadContext();
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
            inputProps={{
              onClick: context.handleInputClick,
              onKeyDown: context.handleInputKeyDown,
              onChange: context.handleInputChange,
              value: context.inputValue,
              autoComplete: 'off',
              className: ['typeahead-input', S.TypeaheadInput].join(' '),
            }}
            wrapperClassName={S.TypeaheadInputWrapper}
            ref={context.inputRef}
          />
        )}
        <input
          type="text"
          aria-hidden
          readOnly
          value={context.firstSuggestion}
          placeholder={context.selectedItems.length ? '' : context.placeholder}
          disabled={context.isDisabled}
          className={[
            'typeahead-input',
            S.TypeaheadInput,
            S.TypeaheadInputPlaceholder,
          ].join(' ')}
        />
        <input
          type="hidden"
          aria-hidden
          readOnly
          value={context.selectedItems as string[]}
          {...context.register?.(context.name, context.validationSchema)}
        />
      </S.TypeaheadInputsGroupWrapper>
      {context.selectedItems.length && (
        <Button
          variant="tertiary"
          endIcon={<Icon name="cross" size={8} />}
          css={{
            padding: '0 10px',
            position: 'absolute',
            right: 0,
            zIndex: 10,
          }}
          onClick={context.handleClearAll}
        />
      )}
    </React.Fragment>
  );
};
