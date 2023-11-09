import { AccordionContent, RenderContentProps } from '@ssa-ui-kit/core';

export const TableFiltersAccordionContent = ({
  isOpened,
  children,
  ...rest
}: RenderContentProps & {
  children: React.ReactNode;
}) => (
  <AccordionContent
    {...rest}
    isOpened={isOpened}
    css={{
      padding: isOpened ? '18px 3px 5px 3px' : 0,
    }}>
    {children}
  </AccordionContent>
);
