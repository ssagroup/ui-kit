import {
  ObjectFieldTemplateProps,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
  titleId,
  descriptionId,
  ObjectFieldTemplatePropertyType,
  canExpand,
} from '@rjsf/utils';

import Wrapper from '@components/Wrapper';

export const ObjectFieldTemplate = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: ObjectFieldTemplateProps<T, S, F>,
) => {
  const {
    disabled,
    description,
    idSchema,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
    uiSchema,
    properties,
    formData,
  } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const TitleFieldTemplate = getTemplate<'TitleFieldTemplate', T, S, F>(
    'TitleFieldTemplate',
    registry,
    uiOptions,
  );
  const DescriptionFieldTemplate = getTemplate<
    'DescriptionFieldTemplate',
    T,
    S,
    F
  >('DescriptionFieldTemplate', registry, uiOptions);

  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  return (
    <Wrapper
      id={idSchema.$id}
      direction="column"
      alignItems="stretch"
      className="form-group">
      <TitleFieldTemplate
        id={titleId<T>(idSchema)}
        title={title}
        required={required}
        schema={schema}
        uiSchema={uiSchema}
        registry={registry}
      />
      {description && (
        <div css={{ fontSize: 12 }}>
          <DescriptionFieldTemplate
            id={descriptionId<T>(idSchema)}
            description={description}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
        </div>
      )}
      {properties
        .filter((e) => !e.hidden)
        .map((element: ObjectFieldTemplatePropertyType) => element.content)}
      {canExpand(schema, uiSchema, formData) && (
        <AddButton
          disabled={disabled || readonly}
          onClick={onAddClick(schema)}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </Wrapper>
  );
};
