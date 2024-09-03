import { MultipleTrigger } from './MultipleTrigger';
import { SingleTrigger } from './SingleTrigger';
import { useTypeaheadContext } from '../Typeahead.context';
import * as S from '../styles';

export const TypeaheadTrigger = () => {
  const context = useTypeaheadContext();
  return (
    <S.TypeaheadTrigger
      as="div"
      role="combobox"
      ref={context.triggerRef}
      className={context.className}
      isOpen={context.isOpen}
      isDisabled={context.isDisabled}
      status={context.status}
      aria-labelledby={`typeahead-label-${context.typeaheadId}`}
      aria-controls={`typeahead-popup-${context.typeaheadId}`}
      startIcon={context.startIcon}
      startIconClassName={context.startIconClassName}
      endIcon={context.endIcon}
      endIconClassName={context.endIconClassName}>
      {context.isMultiple ? <MultipleTrigger /> : <SingleTrigger />}
    </S.TypeaheadTrigger>
  );
};
