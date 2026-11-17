import { MultipleTrigger } from './MultipleTrigger';
import { SingleTrigger } from './SingleTrigger';
import { useTypeaheadContext } from '../Typeahead.context';
import { useFeatureFlag } from '@contexts/FeatureFlags';
import * as S from '../styles';

export const TypeaheadTrigger = () => {
  const context = useTypeaheadContext();
  const fieldGeometryV2 = useFeatureFlag('fieldGeometryV2');
  return (
    <S.TypeaheadTrigger
      fieldGeometryV2={fieldGeometryV2}
      as="div"
      role="combobox"
      ref={context.triggerRef}
      className={context.className}
      isOpen={context.isOpen}
      isDisabled={context.isDisabled}
      status={context.status}
      aria-labelledby={context.labelId}
      aria-controls={`typeahead-popup-${context.typeaheadId}`}
      data-single-line={context.singleLine || undefined}
      startIcon={context.startIcon}
      startIconClassName={context.startIconClassName}
      endIcon={context.endIcon}
      endIconClassName={context.endIconClassName}>
      {context.isMultiple ? <MultipleTrigger /> : <SingleTrigger />}
    </S.TypeaheadTrigger>
  );
};
