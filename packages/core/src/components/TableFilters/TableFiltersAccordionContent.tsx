import {
  AccordionContent,
  RenderContentProps,
} from '@components/AccordionGroup';

export const TableFiltersAccordionContent = ({
  open,
  children,
  ...rest
}: RenderContentProps & {
  children: React.ReactNode;
}) => (
  <AccordionContent
    {...rest}
    open={open}
    css={{
      padding: open ? '18px 3px 5px 3px' : 0,
    }}>
    {children}
  </AccordionContent>
);
