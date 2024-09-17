import { InputHTMLAttributes } from 'react';
import { useTheme } from '@emotion/react';
import Input from '@components/Input';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { useTypeaheadContext } from '../Typeahead.context';
import * as S from '../styles';

export const SingleTrigger = () => {
  const context = useTypeaheadContext();
  const theme = useTheme();
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
        value={(context.selectedItems[0] || '') as string | undefined}
        {...context.register?.(context.name, context.validationSchema)}
      />
      {!context.isDisabled && context.selectedItems.length ? (
        <Button
          variant="tertiary"
          data-testid="remove-all-button"
          endIcon={<Icon name="cross" size={8} tooltip="Remove" />}
          css={{
            padding: '0 10px',
            marginRight: 4,
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
