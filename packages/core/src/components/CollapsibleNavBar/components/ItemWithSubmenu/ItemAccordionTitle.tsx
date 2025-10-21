import { useEffect, useRef, useState } from 'react';
import { PathPattern, useLocation, useMatch } from 'react-router-dom';

import { AccordionProps, AccordionTitle } from '@components/AccordionGroup';
import {
  CollapsibleNavBarItemProvider,
  useCollapsibleNavBarContext,
} from '@components/CollapsibleNavBar';
import { CollapsibleNavBarGroup } from '@components/CollapsibleNavBar/types';
import Wrapper from '@components/Wrapper';

import { CollapsibleNavBarLink } from '../CollapsibleNavBarLink';
import { CollapsibleNavBarPopover } from '../NavBarPopover';
import { TriggerIcon } from '../TriggerIcon';

import { NavBarAccordionContent } from './AccordionContent';
import * as S from './styles';

const Link = CollapsibleNavBarLink.withComponent('div');

export const ItemAccordionTitle = ({
  data,
  item,
  accordionUniqueName,
  useMatchPattern,
}: {
  data: Parameters<AccordionProps['renderTitle']>[0];
  item: CollapsibleNavBarGroup;
  accordionUniqueName: string;
  useMatchPattern?: (prefix: string) => string | PathPattern<string>;
}) => {
  const { theme, showIconTooltip } = useCollapsibleNavBarContext();

  const linkRef = useRef<HTMLElement>(null);
  const classNamesList = Array.from(linkRef.current?.classList || []);

  const [isActive, setIsActive] = useState(classNamesList.includes('active'));
  const [isHover, setIsHover] = useState(false);
  const { pathname } = useLocation();

  const matchPattern = useMatchPattern
    ? useMatchPattern(item.prefix)
    : item.prefix + ':id';
  const match = useMatch(matchPattern);

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
        <Link
          to=""
          navbartheme={theme}
          className={isActive || match ? ' active' : ''}>
          <CollapsibleNavBarPopover
            triggerIcon={<Icon />}
            title={data.title}
            content={
              <NavBarAccordionContent
                items={item.items}
                accordionUniqueName={accordionUniqueName}
                prefix={item.prefix}
                id={accordionUniqueName}
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
          {item.CustomIcon ? (
            <item.CustomIcon showIconTooltip={showIconTooltip} />
          ) : (
            <Icon />
          )}
          <AccordionTitle {...data} css={S.AccordionTitle(theme)} />
        </Link>
      </Wrapper>
    </CollapsibleNavBarItemProvider>
  );
};
