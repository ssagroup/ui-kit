import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TemplatesType,
} from '@rjsf/utils';

import { ArrayFieldItemTemplate } from './ArrayFieldItemTemplate';
import { ArrayFieldTemplate } from './ArrayFieldTemplate';
import { BaseInputTemplate } from './BaseInputTemplate';
import { FieldTemplate } from './FieldTemplate';
import {
  AddButton,
  CopyButton,
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from './IconButton';
import { ObjectFieldTemplate } from './ObjectFieldTemplate';
import { SubmitButton } from './SubmitButton';
import { TitleFieldTemplate } from './TitleFieldTemplate';

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
