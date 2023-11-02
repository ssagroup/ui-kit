import { AccordionContent } from '@ssa-ui-kit/core';
import { RenderContentProps } from '@ssa-ui-kit/core/dist/components/AccordionGroup/types';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import * as S from './styles';

export const CollapsibleNavBarAccordionContent = ({
  items,
  accordionUniqName,
  prefix,
  pathname,
  isPopover,
  ...rest
}: RenderContentProps & {
  items: Array<{ path: string; title: string }>;
  accordionUniqName: string;
  prefix?: string;
  pathname: string;
  isPopover?: boolean;
}) => (
  <AccordionContent
    {...rest}
    css={[S.AccordionContent, isPopover && S.AccordionContentPopover]}>
    {items.map((subMenuItem) => (
      <CollapsibleNavBarLink
        key={`${accordionUniqName}-link-${subMenuItem.title
          .replace(' ', '')
          .toLowerCase()}`}
        to={'/' + prefix + subMenuItem.path}
        active={pathname === subMenuItem.path ? true : undefined}>
        {subMenuItem.title}
      </CollapsibleNavBarLink>
    ))}
  </AccordionContent>
);
