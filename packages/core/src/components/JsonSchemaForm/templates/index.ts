import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TemplatesType,
} from '@rjsf/utils';

import { SubmitButton } from './SubmitButton';
import {
  AddButton,
  RemoveButton,
  CopyButton,
  MoveDownButton,
  MoveUpButton,
} from './IconButton';
import { BaseInputTemplate } from './BaseInputTemplate';
import { ArrayFieldItemTemplate } from './ArrayFieldItemTemplate';
import { ArrayFieldTemplate } from './ArrayFieldTemplate';
import { TitleFieldTemplate } from './TitleFieldTemplate';
import { ObjectFieldTemplate } from './ObjectFieldTemplate';
import { FieldTemplate } from './FieldTemplate';

export function generateTemplates<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(): Partial<TemplatesType<T, S, F>> {
  return {
    ArrayFieldItemTemplate,
    ArrayFieldTemplate,
    BaseInputTemplate,
    ButtonTemplates: {
      SubmitButton,
      AddButton,
      RemoveButton,
      CopyButton,
      MoveDownButton,
      MoveUpButton,
    },
    TitleFieldTemplate,
    ObjectFieldTemplate,
    FieldTemplate,
  };
}

export default generateTemplates();
