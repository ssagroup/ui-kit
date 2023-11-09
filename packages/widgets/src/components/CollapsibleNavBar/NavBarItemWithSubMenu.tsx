import {
  AccordionGroupContextProvider,
  AccordionGroup,
  Accordion,
  Wrapper,
  AccordionTitle,
} from '@ssa-ui-kit/core';
import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import { NavBarAccordionContent } from './NavBarAccordionContent';
import { CollapsibleNavBarPopover } from './NavBarPopover';
import { TriggerIcon } from './TriggerIcon';
import { CollapsibleNavBarGroup } from './types';
import * as S from './styles';

export const NavBarItemWithSubMenu = ({
  item,
  pathname,
}: {
  item: CollapsibleNavBarGroup;
  pathname: string;
}) => {
  const { iconName, iconSize, title, items, prefix } = item;
  const uniqName = iconName + title.replace(' ', '').toLowerCase();
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
              '& ul li:last-child': {
                paddingBottom: 10,
              },
            }}
            renderContent={(props) => (
              <NavBarAccordionContent
                items={items}
                accordionUniqueName={accordionUniqName}
                prefix={prefix}
                pathname={pathname}
                isPopover={false}
                {...props}
              />
            )}
            renderTitle={(data) => (
              <Wrapper onClick={data.onClick} css={S.AccordionTitleWrapper}>
                <div css={S.IconWrapper} className="icon-wrapper">
                  <CollapsibleNavBarPopover
                    triggerIcon={
                      <TriggerIcon iconName={iconName} iconSize={iconSize} />
                    }
                    title={data.title}
                    content={
                      <NavBarAccordionContent
                        items={items}
                        accordionUniqueName={accordionUniqName}
                        prefix={prefix}
                        pathname={pathname}
                        id={accordionUniqName}
                        isOpened
                        isPopover
                      />
                    }
                  />
                </div>
                <TriggerIcon iconName={iconName} iconSize={iconSize} />
                <AccordionTitle {...data} css={S.AccordionTitle} />
              </Wrapper>
            )}
          />
        </AccordionGroup>
      </CollapsibleNavBarItem>
    </AccordionGroupContextProvider>
  );
};
