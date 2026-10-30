import { ComponentType } from 'react';
import { FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
import { FormProps, ThemeProps, withTheme } from '@rjsf/core';
import styled from '@emotion/styled';

import Templates, { generateTemplates } from './templates';
import Widgets, { generateWidgets } from './widgets';
import Fields, { generateFields } from './fields';

/**
 * Builds the kit's rjsf theme (templates, widgets and fields) for the given
 * form data, schema and form-context types. Pass it to rjsf's `withTheme`.
 *
 * @example
 * ```tsx
 * import { withTheme } from '@rjsf/core';
 *
 * const ProfileForm = withTheme<Profile>(JsonSchema.generateTheme<Profile>());
 * ```
 */
export function generateTheme<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(): ThemeProps<T, S, F> {
  return {
    templates: generateTemplates<T, S, F>(),
    widgets: generateWidgets<T, S, F>(),
    fields: generateFields<T, S, F>(),
  };
}

/** The kit's rjsf theme for untyped forms — see `generateTheme`. */
const Theme = generateTheme();

/**
 * Builds a themed rjsf Form component typed for the given form data, schema
 * and form-context types. Use it instead of `Form` when you want typed
 * `formData`.
 *
 * @example
 * ```tsx
 * type Profile = { fullName: string };
 * const ProfileForm = JsonSchema.generateForm<Profile>();
 *
 * <ProfileForm schema={schema} validator={validator} />
 * ```
 */
export function generateForm<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(): ComponentType<FormProps<T, S, F>> {
  return withTheme<T, S, F>(generateTheme<T, S, F>());
}

const UnstyledForm = generateForm();
/**
 * JsonSchemaForm - `@rjsf/core` Form rendered with kit components
 *
 * Takes the standard rjsf props: `schema`, `uiSchema`, `formData`,
 * `validator` (from `@rjsf/validator-ajv8`), `onSubmit`, `onChange`… Adds
 * 16px between top-level fields.
 *
 * @category Form Structure
 * @subcategory Generated
 *
 * @example
 * ```tsx
 * import validator from '@rjsf/validator-ajv8';
 * import { JsonSchema } from '@ssa-ui-kit/core';
 *
 * <JsonSchema.Form
 *   schema={{ type: 'object', properties: { name: { type: 'string' } } }}
 *   validator={validator}
 *   onSubmit={({ formData }) => save(formData)}
 * />
 * ```
 */
const Form = styled(UnstyledForm)`
  .form-group {
    margin-bottom: 16px;
  }
  .form-group:last-child {
    margin-bottom: 0;
  }
`;

export {
  Form,
  Templates,
  Theme,
  Widgets,
  Fields,
  generateTemplates,
  generateWidgets,
  generateFields,
};

export * from './constants';
export type * from './types';
