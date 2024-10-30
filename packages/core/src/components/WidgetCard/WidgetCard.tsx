import { useFullscreenMode, WithLink } from '@components';
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
  link,
  children,
  onClick,
}: WidgetCardProps) => {
  const { isFullscreenMode } = useFullscreenMode();
  return (
    <WithLink link={link} onClick={onClick} className={wrapperClassName}>
      <WidgetCardBase
        className={className}
        onClick={link ? undefined : onClick}
        isFullscreenMode={isFullscreenMode}>
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
