import { MultipleTrigger } from './MultipleTrigger';
import { SingleTrigger } from './SingleTrigger';
import { useTypeaheadContext } from '../Typeahead.context';

export const TypeaheadTrigger = () => {
  const { isMultiple } = useTypeaheadContext();
  if (isMultiple) {
    return <MultipleTrigger />;
  }
  return <SingleTrigger />;
};
