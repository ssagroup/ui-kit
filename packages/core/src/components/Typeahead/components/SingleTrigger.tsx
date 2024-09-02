import Input from '@components/Input';
import { useTypeaheadContext } from '../Typeahead.context';
import * as S from '../styles';

export const SingleTrigger = () => {
  const context = useTypeaheadContext();

  return (
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
        placeholder={context.placeholder}
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
        value={(context.selectedItems[0] || '') as string | undefined}
        {...context.register?.(context.name, context.validationSchema)}
      />
    </S.TypeaheadInputsGroupWrapper>
  );
};
