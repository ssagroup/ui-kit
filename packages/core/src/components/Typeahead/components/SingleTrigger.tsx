import { InputHTMLAttributes } from 'react';
import Input from '@components/Input';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { useTypeaheadContext } from '../Typeahead.context';
import * as S from '../styles';

export const SingleTrigger = () => {
  const context = useTypeaheadContext();
  const typeaheadInputAdditionalProps: InputHTMLAttributes<HTMLInputElement> =
    {};
  if (!context.selectedItems.length && !!context.placeholder) {
    typeaheadInputAdditionalProps.placeholder = context.placeholder;
  }

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
        data-testid="typeahead-input"
        aria-hidden
        readOnly
        value={context.firstSuggestion}
        className={[
          'typeahead-input',
          S.TypeaheadInput,
          S.TypeaheadInputPlaceholder,
        ].join(' ')}
        {...typeaheadInputAdditionalProps}
      />
      <input
        type="hidden"
        aria-hidden
        readOnly
        value={(context.selectedItems[0] || '') as string | undefined}
        {...context.register?.(context.name, context.validationSchema)}
      />
      {!context.isDisabled && context.selectedItems.length ? (
        <Button
          variant="tertiary"
          data-testid="remove-all-button"
          endIcon={<Icon name="cross" size={8} tooltip="Remove" />}
          css={{
            padding: '0 14px 0 10px',
            position: 'absolute',
            right: -28,
            zIndex: 10,
          }}
          onClick={context.handleClearAll}
        />
      ) : null}
    </S.TypeaheadInputsGroupWrapper>
  );
};
