import { useEffect, useRef, useState } from 'react';
import { PathPattern, useLocation } from 'react-router-dom';
import Wrapper from '@components/Wrapper';
import { AccordionProps, AccordionTitle } from '@components/AccordionGroup';
import {
  useCollapsibleNavBarContext,
  CollapsibleNavBarItemProvider,
  CollapsibleNavBarPopover,
  CollapsibleNavBarLink,
  ItemWithSubMenu,
  TriggerIcon,
} from '@components/CollapsibleNavBar/index.parts';
import { CollapsibleNavBarGroup } from '@components/CollapsibleNavBar/types';
import * as S from './styles';

const Link = CollapsibleNavBarLink.withComponent('div');

export const ItemAccordionTitle = ({
  data,
  item,
  useMatchPattern,
}: {
  data: Parameters<AccordionProps['renderTitle']>[0];
  item: CollapsibleNavBarGroup;
  useMatchPattern?: (prefix: string) => string | PathPattern<string>;
}) => {
  const { theme } = useCollapsibleNavBarContext();

  const linkRef = useRef<HTMLElement>(null);
  const classNamesList = Array.from(linkRef.current?.classList || []);

  const [isActive, setIsActive] = useState(classNamesList.includes('active'));
  const [isHover, setIsHover] = useState(false);
  const { pathname } = useLocation();
  const uniqName = item.iconName + item.title.replace(' ', '').toLowerCase();
  const accordionUniqName = uniqName + 'accordion';

  useEffect(() => {
    const classNamesList = Array.from(linkRef.current?.classList || []);
    setIsActive(classNamesList.includes('active'));
  }, [pathname]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const Icon = () => (
    <TriggerIcon
      iconName={item.iconName}
      iconSize={item.iconSize}
      css={{ ...item.css }}
    />
  );

  return (
    <CollapsibleNavBarItemProvider isActive={isActive} isHover={isHover}>
      <Wrapper
        onClick={data.onClick}
        css={S.AccordionTitleWrapper(theme)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Link to="" navbartheme={theme} className={isActive ? ' active' : ''}>
          <CollapsibleNavBarPopover
            triggerIcon={<Icon />}
            title={data.title}
            content={
              <ItemWithSubMenu.NavBarAccordionContent
                items={item.items}
                accordionUniqueName={accordionUniqName}
                prefix={item.prefix}
                id={accordionUniqName}
                isOpened
                isPopover
                useMatchPattern={useMatchPattern}
              />
            }
          />
        </Link>

        <Link
          to=""
          className={`icon-wrapper${isActive ? ' active' : ''}`}
          navbartheme={theme}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={linkRef as any}>
          {item.CustomIcon ? <item.CustomIcon /> : <Icon />}
          <AccordionTitle {...data} css={S.AccordionTitle(theme)} />
        </Link>
      </Wrapper>
    </CollapsibleNavBarItemProvider>
  );
};
