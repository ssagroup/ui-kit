import {
  FormContextType,
  RegistryFieldsType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

import { DateRangeField } from './DateRangeField';

export const generateFields = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(): RegistryFieldsType<T, S, F> => {
  return {
    daterange: DateRangeField,
  };
};

export default generateFields();
