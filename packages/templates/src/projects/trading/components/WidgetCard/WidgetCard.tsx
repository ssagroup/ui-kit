import { WithLink } from '@ssa-ui-kit/widgets';

import { WidgetCardBase } from './WidgetCardBase';
import { Header } from './Header';
import { Content } from './Content';
import { WidgetCardProps } from './types';

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
