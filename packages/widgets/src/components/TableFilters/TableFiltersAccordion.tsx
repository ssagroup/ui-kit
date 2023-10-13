import { Accordion } from '@ssa-ui-kit/core';
import { AccordionViewProps } from '@ssa-ui-kit/core/src/components/AccordionGroup/types';

export const TableFiltersAccordion = (props: AccordionViewProps) => (
  <Accordion
    {...props}
    css={{
      padding: '10px 0',
      '&:last-child': {
        paddingBottom: 0,
      },
    }}
  />
);
