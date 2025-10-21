import { css, Interpolation, Theme } from '@emotion/react';

import { CardHeader } from '@ssa-ui-kit/core';

import { Title } from './Title';
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
  return (
    <CardHeader
      css={css`
        margin-bottom: 10px;
      `}
      className={className}>
      <Title variant="h3" weight="bold" css={titleCSS}>
        {title}
        {children && <span>{children}</span>}
      </Title>
    </CardHeader>
  );
};
