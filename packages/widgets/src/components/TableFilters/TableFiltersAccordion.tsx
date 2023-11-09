import { Accordion, AccordionViewProps } from '@ssa-ui-kit/core';

export const TableFiltersAccordion = (props: AccordionViewProps) => (
  <Accordion
    {...props}
    css={{
      display: props.isHidden ? 'none' : 'flex',
      padding: '10px 0',
      '&:last-child': {
        paddingBottom: 0,
      },
    }}
  />
);
