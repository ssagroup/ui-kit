import { useMatch } from 'react-router-dom';
import {
  AccordionGroupContextProvider,
  AccordionGroup,
  Accordion,
  Wrapper,
  AccordionTitle,
} from '@ssa-ui-kit/core';
import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import { NavBarAccordionContent } from './NavBarAccordionContent';
import { CollapsibleNavBarPopover } from './NavBarPopover';
import { TriggerIcon } from './TriggerIcon';
import { CollapsibleNavBarGroup } from './types';
import * as S from './styles';

const Link = CollapsibleNavBarLink.withComponent('div');

export const NavBarItemWithSubMenu = ({
  item,
}: {
  item: CollapsibleNavBarGroup;
}) => {
  const { iconName, iconSize, title, items, prefix, css } = item;
  const uniqName = iconName + title.replace(' ', '').toLowerCase();
  const accordionUniqName = uniqName + 'accordion';
  const match = useMatch(prefix + ':id');

  const Icon = () => (
    <TriggerIcon iconName={iconName} iconSize={iconSize} css={{ ...css }} />
  );

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
                isPopover={false}
                {...props}
              />
            )}
            renderTitle={(data) => (
              <Wrapper onClick={data.onClick} css={S.AccordionTitleWrapper}>
                <Link to="" className={`icon-wrapper${match ? ' active' : ''}`}>
                  <CollapsibleNavBarPopover
                    triggerIcon={<Icon />}
                    title={data.title}
                    content={
                      <NavBarAccordionContent
                        items={items}
                        accordionUniqueName={accordionUniqName}
                        prefix={prefix}
                        id={accordionUniqName}
                        isOpened
                        isPopover
                      />
                    }
                  />
                </Link>
                <Icon />
                <AccordionTitle {...data} css={S.AccordionTitle} />
              </Wrapper>
            )}
          />
        </AccordionGroup>
      </CollapsibleNavBarItem>
    </AccordionGroupContextProvider>
  );
};
