import { WithLink } from '@ssa-ui-kit/core';

import { Content } from './Content';
import { Header } from './Header';
import { WidgetCardProps } from './types';
import { WidgetCardBase } from './WidgetCardBase';

export const WidgetCard = ({
  title,
  className,
  wrapperClassName,
  contentClassName,
  headerClassName,
  headerContent,
  onClick,
  link,
  children,
}: WidgetCardProps) => {
  return (
    <WithLink link={link} onClick={onClick} className={wrapperClassName}>
      <WidgetCardBase
        className={className}
        onClick={link ? undefined : onClick}>
        <Header title={title} className={headerClassName}>
          {headerContent}
        </Header>
        <Content className={contentClassName}>{children}</Content>
      </WidgetCardBase>
    </WithLink>
  );
};
