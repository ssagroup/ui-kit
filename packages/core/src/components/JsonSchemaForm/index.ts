import { ComponentType } from 'react';
import { FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
import { FormProps, ThemeProps, withTheme } from '@rjsf/core';
import styled from '@emotion/styled';

import Templates, { generateTemplates } from './templates';
import Widgets, { generateWidgets } from './widgets';

export function generateTheme<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(): ThemeProps<T, S, F> {
  return {
    templates: generateTemplates<T, S, F>(),
    widgets: generateWidgets<T, S, F>(),
  };
}

const Theme = generateTheme();

export function generateForm<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(): ComponentType<FormProps<T, S, F>> {
  return withTheme<T, S, F>(generateTheme<T, S, F>());
}

const UnstyledForm = generateForm();
const Form = styled(UnstyledForm)`
  .form-group {
    margin-bottom: 16px;
  }
  .form-group:last-child {
    margin-bottom: 0;
  }
`;

export { Form, Templates, Theme, Widgets, generateTemplates, generateWidgets };
