import { useMatch } from 'react-router-dom';
import {
  AccordionGroupContextProvider,
  AccordionGroup,
  Accordion,
  AccordionTitle,
} from '@components/AccordionGroup';
import Wrapper from '@components/Wrapper';
import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import { NavBarAccordionContent } from './NavBarAccordionContent';
import { CollapsibleNavBarPopover } from './NavBarPopover';
import { TriggerIcon } from './TriggerIcon';
import { useCollapsibleNavBarContext } from './CollapsibleNavBarContext';
import { CollapsibleNavBarGroup } from './types';
import * as S from './styles';

const Link = CollapsibleNavBarLink.withComponent('div');

export const NavBarItemWithSubMenu = ({
  item,
  onClick,
}: {
  item: CollapsibleNavBarGroup;
  onClick?: () => void;
}) => {
  const { subMenuMaxWidth, theme } = useCollapsibleNavBarContext();
  const { iconName, iconSize, title, items, prefix, css, CustomIcon } = item;
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
              <Wrapper
                onClick={data.onClick}
                css={S.AccordionTitleWrapper(theme)}>
                <Link
                  to=""
                  className={match ? ' active' : ''}
                  navBarTheme={theme}>
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

                <Link
                  to=""
                  className={`icon-wrapper${match ? ' active' : ''}`}
                  navBarTheme={theme}>
                  {CustomIcon ? <CustomIcon /> : <Icon />}
                  <AccordionTitle {...data} css={S.AccordionTitle(theme)} />
                </Link>
              </Wrapper>
            )}
          />
        </AccordionGroup>
      </CollapsibleNavBarItem>
    </AccordionGroupContextProvider>
  );
};
