import { Fragment } from 'react';
import { Interpolation, Theme, css, useTheme } from '@emotion/react';
import CardHeader from '@components/CardHeader';
import { WidgetCardTitle } from './Title';
import { WidgetCardProps } from './types';

type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
  titleCSS?: Interpolation<Theme>;
} & Pick<WidgetCardProps, 'title'>;

export const Header = ({
  title,
  className,
  children,
  titleCSS,
}: HeaderProps) => {
  const theme = useTheme();

  return (
    <CardHeader
      css={css`
        margin-bottom: 5px;
        ${theme.mediaQueries.md} {
          margin-bottom: 10px;
        }
      `}
      className={className}>
      <WidgetCardTitle
        variant="h3"
        weight="bold"
        css={[
          css`
            flex-direction: row;
            width: 100%;
          `,
          titleCSS,
        ]}>
        {title}
        {children && <Fragment>{children}</Fragment>}
      </WidgetCardTitle>
    </CardHeader>
  );
};
