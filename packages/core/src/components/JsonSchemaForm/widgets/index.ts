import {
  FormContextType,
  RegistryWidgetsType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

import { CheckboxWidget } from './CheckboxWidget';
import { CheckboxesWidget } from './CheckboxesWidget';
import { RadioWidget } from './RadioWidget';
import { SelectWidget } from './SelectWidget';
import { PasswordWidget } from './PasswordWidget';
import { RangeWidget } from './RangeWidget';

export function generateWidgets<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(): RegistryWidgetsType<T, S, F> {
  return {
    CheckboxWidget,
    CheckboxesWidget,
    RadioWidget,
    PasswordWidget,
    SelectWidget,
    RangeWidget,
  };
}

export default generateWidgets();
