import Wrapper from '@components/Wrapper';
import {
  ArrayFieldTemplateItemType,
  ArrayFieldTemplateProps,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

export const ArrayFieldTemplate = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: ArrayFieldTemplateProps<T, S, F>,
) => {
  const {
    canAdd,
    disabled,
    idSchema,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
    uiSchema,
  } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const ArrayFieldDescriptionTemplate = getTemplate<
    'ArrayFieldDescriptionTemplate',
    T,
    S,
    F
  >('ArrayFieldDescriptionTemplate', registry, uiOptions);
  const ArrayFieldItemTemplate = getTemplate<'ArrayFieldItemTemplate', T, S, F>(
    'ArrayFieldItemTemplate',
    registry,
    uiOptions,
  );
  const ArrayFieldTitleTemplate = getTemplate<
    'ArrayFieldTitleTemplate',
    T,
    S,
    F
  >('ArrayFieldTitleTemplate', registry, uiOptions);

  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  return (
    <Wrapper
      direction="column"
      alignItems="flex-start"
      css={{ gap: 8, width: '100%' }}>
      <ArrayFieldTitleTemplate
        idSchema={idSchema}
        required={required}
        title={uiOptions.title || title}
        schema={schema}
        uiSchema={uiSchema}
        registry={registry}
      />
      {(uiOptions.description || schema.description) && (
        <div css={{ fontSize: 12 }}>
          <ArrayFieldDescriptionTemplate
            description={uiOptions.description || schema.description}
            idSchema={idSchema}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
        </div>
      )}
      {items &&
        items.map(
          ({ key, ...itemProps }: ArrayFieldTemplateItemType<T, S, F>) => (
            <ArrayFieldItemTemplate key={key} {...itemProps} />
          ),
        )}
      {canAdd && (
        <AddButton
          disabled={disabled || readonly}
          onClick={onAddClick}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </Wrapper>
  );
};
