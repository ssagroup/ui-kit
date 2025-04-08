import styled from '@emotion/styled';
import {
  FieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

import {
  Accordion,
  AccordionContent,
  AccordionTitle,
  useAccordionGroupContext,
} from '@components/AccordionGroup';
import { useEffect } from 'react';

export type AccordionOptions = {
  targetField: string;
  collapsed?: boolean;
};

const StyledAccordionTitle = styled(AccordionTitle)<{ collapsed: boolean }>`
  color: ${({ theme }) => theme.colors.greyDarker};
  font-weight: 700;
  padding: 0;

  ${({ collapsed }) => !collapsed && `margin-bottom: 20px;`}

  & svg {
    & path {
      stroke: ${({ theme }) => theme.colors.greyDarker80};
    }
  }
`;

export const AccordionField = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: FieldProps<T, S, F>,
) => {
  const { uiSchema, idSchema, name, schema, registry } = props;
  const accordionOptions = (uiSchema?.['ui:options'] as AccordionOptions) || {};
  if (!accordionOptions.targetField) {
    throw new Error(
      'AccordionField: options.targetField is required to render AccordionField',
    );
  }
  const title = uiSchema?.['ui:title']
    ? uiSchema['ui:title']
    : schema?.title
      ? schema.title
      : name;

  // if `ui:widget` is set to 'hide', this field won't be mounted
  // useAccordionGroupContext manages the open/close state of accordions across mounts
  const { openedAccordions, toggleOpenedAccordion, setStayOpen } =
    useAccordionGroupContext();

  useEffect(() => {
    // prevent this accordion from being auto-collapsed when another one is opened
    setStayOpen(true);
  }, []);

  const openedAccordion = openedAccordions.find(
    ({ id }) => id === idSchema.$id,
  );

  const collapsed =
    openedAccordion !== undefined ? false : !!accordionOptions.collapsed;

  const onAccordionClick = () => {
    toggleOpenedAccordion({ id: idSchema.$id }, !collapsed);
  };

  const TargetField = registry.fields[accordionOptions.targetField];

  const accordionId = `${idSchema.$id}.accordion`;

  return (
    <Accordion
      id={accordionId}
      size="small"
      ariaControls={`${accordionId}-content`}
      title={title}
      isOpened={!collapsed}
      onClick={() => onAccordionClick()}
      css={{ padding: 0, border: 'none' }}
      renderContent={(contentProps) => (
        <AccordionContent {...contentProps} css={{ width: '100%' }}>
          <TargetField {...props} schema={{ ...schema, title: '' }} />
        </AccordionContent>
      )}
      renderTitle={(titleProps) => (
        <StyledAccordionTitle {...titleProps} collapsed={collapsed} />
      )}
    />
  );
};
