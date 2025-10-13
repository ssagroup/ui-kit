import {
  FormContextType,
  RegistryWidgetsType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

import { CheckboxesWidget } from './CheckboxesWidget';
import { CheckboxWidget } from './CheckboxWidget';
import { DateWidget } from './DateWidget';
import { PasswordWidget } from './PasswordWidget';
import { RadioWidget } from './RadioWidget';
import { RangeWidget } from './RangeWidget';
import { SelectWidget } from './SelectWidget';

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
    DateWidget,
  };
}

export default generateWidgets();
