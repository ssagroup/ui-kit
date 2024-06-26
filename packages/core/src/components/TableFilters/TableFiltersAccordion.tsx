import { Accordion, AccordionViewProps } from '@components/AccordionGroup';

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
