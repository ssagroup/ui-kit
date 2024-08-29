import { css } from '@emotion/css';
import Wrapper from '@components/Wrapper';
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
      aria-labelledby={`typeahead-label-${context.typeaheadId}`}
      aria-controls={`typeahead-popup-${context.typeaheadId}`}>
      <Wrapper
        className={[
          css`
            flex-direction: column !important;
          `,
          S.TypeaheadInputsGroupWrapper,
        ].join(' ')}>
        <Input
          name={context.inputName}
          status={'custom'}
          inputProps={{
            onClick: context.handleInputClick,
            onKeyDown: context.handleInputKeyDown,
            autoComplete: 'off',
            className: ['typeahead-input', S.TypeaheadInput].join(' '),
          }}
          register={context.register}
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
          {...context.register?.(context.name)}
        />
      </Wrapper>
    </S.TypeaheadTrigger>
  );
};
