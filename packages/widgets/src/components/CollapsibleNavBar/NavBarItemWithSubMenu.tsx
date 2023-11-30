import { useMatch } from 'react-router-dom';
import styled from '@emotion/styled';
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

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  ${({ theme }) => S.SVGMainStyle(theme)}

  &:hover svg {
    ${({ theme }) => S.SVGHoverShadow(theme)}
  }

  /* This is the duplicate from <NavBarLink /> */
  &.active {
    filter: drop-shadow(-4px 4px 14px ${({ theme }) => theme.colors.white});
    color: ${({ theme }) => theme.colors.white};

    svg {
      filter: drop-shadow(-4px 4px 14px ${({ theme }) => theme.colors.white});
      path {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export const NavBarItemWithSubMenu = ({
  item,
}: {
  item: CollapsibleNavBarGroup;
}) => {
  const { iconName, iconSize, title, items, prefix } = item;
  const uniqName = iconName + title.replace(' ', '').toLowerCase();
  const accordionUniqName = uniqName + 'accordion';
  const match = useMatch(prefix + ':id');

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
                <IconWrapper
                  className={`icon-wrapper${match ? ' active' : undefined}`}>
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
                        id={accordionUniqName}
                        isOpened
                        isPopover
                      />
                    }
                  />
                </IconWrapper>
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
