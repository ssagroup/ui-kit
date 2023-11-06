import { useLocation } from 'react-router-dom';
import * as S from './styles';

import {
  Accordion,
  AccordionGroup,
  AccordionGroupContextProvider,
  AccordionTitle,
  ResponsiveImage,
  Wrapper,
} from '@ssa-ui-kit/core';

import CollapsibleNavBarBase from './CollapsibleNavBarBase';
import CollapsibleNavBarWrapper from './CollapsibleNavBarWrapper';
import CollapsibleNavBarList from './CollapsibleNavBarList';
import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import CollapsibleNavToggle from './CollapsibleNavToggle';

import { INavBarExtendedProps } from './types';
import { NavBarAccordionContent } from './NavBarAccordionContent';
import { CollapsibleNavBarPopover } from './NavBarPopover';
import { NavContentToggle } from './CollapsibleNavContentToggle';
import { TriggerIcon } from './TriggerIcon';

/**
 * UI Component that shows the collapsible navigation bar
 *
 */
export const CollapsibleNavBar = ({ items }: INavBarExtendedProps) => {
  const { pathname } = useLocation();

  return (
    <CollapsibleNavBarBase>
      <CollapsibleNavToggle />

      <CollapsibleNavBarWrapper>
        <Wrapper css={S.LogoWrapper}>
          <ResponsiveImage
            css={S.ResponsiveLogo}
            srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FCTP_Large_Left.png?alt=media&token=b6fe7ab8-fd0b-475f-bb08-360311f27693 69w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FCTP_Medium_Left.png?alt=media&token=a1aeba69-7c07-40c9-aeac-c2477640870d 55w"
            sizes="(min-width: 900px) 55px, (min-width: 1440px) 69px"
            src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FCTP_Small_Left.png?alt=media&token=bff7149e-3b90-4657-8a11-040e83990e6f"
            alt="SSA CTP logo"
          />
          <NavContentToggle id={'contentToggler'} />
        </Wrapper>
        <CollapsibleNavBarList>
          {items.map((item) => {
            if ('items' in item) {
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
                            accordionUniqName={accordionUniqName}
                            prefix={prefix}
                            pathname={pathname}
                            isPopover={false}
                            {...props}
                          />
                        )}
                        renderTitle={(data) => (
                          <Wrapper
                            onClick={data.onClick}
                            css={S.AccordionTitleWrapper}>
                            <div css={S.IconWrapper} className="icon-wrapper">
                              <CollapsibleNavBarPopover
                                triggerIcon={
                                  <TriggerIcon
                                    iconName={iconName}
                                    iconSize={iconSize}
                                  />
                                }
                                title={data.title}
                                content={
                                  <NavBarAccordionContent
                                    items={items}
                                    accordionUniqName={accordionUniqName}
                                    prefix={prefix}
                                    pathname={pathname}
                                    id={accordionUniqName}
                                    isOpened
                                    isPopover
                                  />
                                }
                              />
                            </div>
                            <TriggerIcon
                              iconName={iconName}
                              iconSize={iconSize}
                            />
                            <AccordionTitle {...data} css={S.AccordionTitle} />
                          </Wrapper>
                        )}
                      />
                    </AccordionGroup>
                  </CollapsibleNavBarItem>
                </AccordionGroupContextProvider>
              );
            } else {
              const { path, iconName, title, iconSize } = item;
              return (
                <CollapsibleNavBarItem key={path}>
                  <CollapsibleNavBarLink
                    to={'/' + path}
                    active={pathname === path ? true : undefined}>
                    <CollapsibleNavBarPopover
                      triggerIcon={
                        <TriggerIcon
                          iconName={iconName}
                          iconSize={iconSize}
                          css={{ marginRight: 20 }}
                        />
                      }
                      title={title}
                    />
                    <TriggerIcon
                      iconName={iconName}
                      iconSize={iconSize}
                      css={{ marginRight: 20 }}
                    />
                    <span>{title}</span>
                  </CollapsibleNavBarLink>
                </CollapsibleNavBarItem>
              );
            }
          })}
        </CollapsibleNavBarList>
      </CollapsibleNavBarWrapper>
    </CollapsibleNavBarBase>
  );
};
