import { useEffect } from 'react';
import Wrapper from '@components/Wrapper';
import Input from '@components/Input';
import { useTypeaheadContext } from '../Typeahead.context';
import * as S from '../styles';

// TODO: use optionText here?..
export const SingleTrigger = () => {
  const context = useTypeaheadContext();
  const { setValue } = context.useFormResult;
  const selectedItem = context.selectedItems[0];
  useEffect(() => {
    console.log('>>>SingleTrigger', selectedItem);
    // if (selectedItem) {
    setValue('typeahead-input', selectedItem);
    // }
  }, [selectedItem]);
  return (
    <S.TypeaheadTrigger
      as="div"
      ref={context.triggerRef}
      className={context.className}
      isOpen={context.isOpen}
      aria-labelledby={`typeahead-label-${context.typeaheadId}`}
      aria-controls={`typeahead-popup-${context.typeaheadId}`}>
      {/* {Object.values(context.optionsWithKey).length > 0 &&
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
        })} */}
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
