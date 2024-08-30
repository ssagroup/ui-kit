import Input from '@components/Input';
import { useTypeaheadContext } from '../Typeahead.context';
import * as S from '../styles';

export const SingleTrigger = () => {
  const context = useTypeaheadContext();

  return (
    <S.TypeaheadTrigger
      as="div"
      ref={context.triggerRef}
      className={context.className}
      isOpen={context.isOpen}
      status={context.status}
      aria-labelledby={`typeahead-label-${context.typeaheadId}`}
      aria-controls={`typeahead-popup-${context.typeaheadId}`}>
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
          value={(context.selectedItems[0] || '') as string | undefined}
          {...context.register?.(context.name, context.validationSchema)}
        />
      </S.TypeaheadInputsGroupWrapper>
    </S.TypeaheadTrigger>
  );
};
