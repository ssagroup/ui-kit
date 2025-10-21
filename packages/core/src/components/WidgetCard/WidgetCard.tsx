import { useFullscreenMode, WithLink } from '@components';

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
  link,
  children,
  width,
  height,
  onClick,
}: WidgetCardProps) => {
  const { isFullscreenMode } = useFullscreenMode();
  return (
    <WithLink link={link} onClick={onClick} className={wrapperClassName}>
      <WidgetCardBase
        className={className}
        onClick={link ? undefined : onClick}
        isFullscreenMode={isFullscreenMode}
        width={width}
        height={height}>
        <Header title={title} className={headerClassName}>
          {headerContent}
        </Header>
        <Content
          className={contentClassName}
          isFullscreenMode={isFullscreenMode}>
          {children}
        </Content>
      </WidgetCardBase>
    </WithLink>
  );
};
