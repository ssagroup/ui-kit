import { useId } from 'react';
import { PathPattern } from 'react-router-dom';
import {
  AccordionGroupContextProvider,
  AccordionGroup,
  Accordion,
} from '@components/AccordionGroup';
import { CollapsibleNavBarItem } from './CollapsibleNavBarItem';
import { NavBarAccordionContent } from './AccordionContent';
import { ItemAccordionTitle } from './ItemAccordionTitle';
import { useCollapsibleNavBarContext } from '../../CollapsibleNavBarContext';
import { CollapsibleNavBarGroup } from '../../types';

export const Item = ({
  item,
  useMatchPattern,
  onClick,
}: {
  item: CollapsibleNavBarGroup;
  useMatchPattern?: (prefix: string) => string | PathPattern<string>;
  onClick?: () => void;
}) => {
  const { subMenuMaxWidth } = useCollapsibleNavBarContext();
  const { title, items, prefix = '' } = item;
  const uniqName = useId();
  const accordionUniqName = uniqName + 'accordion';

  return (
    <AccordionGroupContextProvider key={uniqName}>
      <CollapsibleNavBarItem>
        <AccordionGroup
          size="small"
          css={{
            width: '100%',
          }}>
          <Accordion
            id={accordionUniqName}
            title={title}
            isOpened={false}
            ariaControls={`${accordionUniqName}-panel`}
            css={{
              padding: 0,
              maxWidth: subMenuMaxWidth,
              '& ul li:last-child': {
                paddingBottom: 10,
              },
            }}
            renderContent={(props) => (
              <NavBarAccordionContent
                items={items}
                accordionUniqueName={accordionUniqName}
                prefix={prefix}
                isPopover={false}
                onClick={onClick}
                {...props}
              />
            )}
            renderTitle={(data) => (
              <ItemAccordionTitle
                data={data}
                item={item}
                useMatchPattern={useMatchPattern}
                accordionUniqueName={accordionUniqName}
              />
            )}
          />
        </AccordionGroup>
      </CollapsibleNavBarItem>
    </AccordionGroupContextProvider>
  );
};
