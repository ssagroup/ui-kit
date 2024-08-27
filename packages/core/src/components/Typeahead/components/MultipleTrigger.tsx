import Icon from '@components/Icon';
import { useTheme } from '@emotion/react';
import Wrapper from '@components/Wrapper';
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
      aria-labelledby={`typeahead-label-${context.typeaheadId}`}
      aria-controls={`typeahead-popup-${context.typeaheadId}`}>
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
                    size={10}
                    color={theme.colors.greyDarker}
                  />
                }
                onClick={context.handleRemoveSelectedClick(selectedItem)}
              />
            </S.TypeaheadItem>
          );
        })}
      <Wrapper className={S.TypeaheadInputsGroupWrapper}>
        <Input
          name="typeahead-input"
          status={'custom'}
          inputProps={{
            onClick: context.handleInputClick,
            onKeyDown: context.handleInputKeyDown,
            autoComplete: 'off',
            className: ['typeahead-input', S.TypeaheadInput].join(' '),
          }}
          register={context.useFormResult.register}
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
      </Wrapper>
    </S.TypeaheadTrigger>
  );
};
