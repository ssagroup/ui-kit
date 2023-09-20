import { Accordion } from '@components/AccordionGroup';
import { AccordionViewProps } from '@components/AccordionGroup/types';

export const TableFiltersAccordion = (props: AccordionViewProps) => (
  <Accordion
    {...props}
    css={{
      padding: '10px 0',
    }}
  />
);
