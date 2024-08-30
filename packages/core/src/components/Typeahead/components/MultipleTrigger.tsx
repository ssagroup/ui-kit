import Icon from '@components/Icon';
import { useTheme } from '@emotion/react';
import Input from '@components/Input';
import * as S from '../styles';
import { useTypeaheadContext } from '../Typeahead.context';

export const MultipleTrigger = () => {
  const theme = useTheme();
  const context = useTypeaheadContext();
  return (
    <S.TypeaheadTrigger
      as="div"
      ref={context.triggerRef}
      className={context.className}
      isOpen={context.isOpen}
      status={context.status}
      aria-labelledby={`typeahead-label-${context.typeaheadId}`}
      aria-controls={`typeahead-popup-${context.typeaheadId}`}
      startIcon={context.startIcon}
      endIcon={context.endIcon}>
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
              onClick={context.handleSelectedClick}>
              <S.TypeaheadItemLabel>{optionText}</S.TypeaheadItemLabel>
              <S.TypeaheadItemCross
                endIcon={
                  <Icon
                    name="cross"
                    size={14}
                    color={theme.colors.greyDarker}
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
        <Input
          name={context.inputName}
          status={'custom'}
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
        <input
          type="text"
          aria-hidden
          readOnly
          value={context.firstSuggestion}
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
    </S.TypeaheadTrigger>
  );
};
