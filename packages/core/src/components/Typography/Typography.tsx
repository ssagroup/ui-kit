import { forwardRef } from 'react';

import { css } from '@emotion/react';

import * as style from './styles';
import { TypographyProps } from './types';

const variantsMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  caption: 'span',
};

const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  {
    children,
    weight = 'regular',
    variant = 'body1',
    gutter = false,
    color = 'rgba(43, 45, 49, 1)',
    as,
    ...props
  },
  ref,
) {
  const Component = as || variantsMapping[variant];

  return (
    <Component
      ref={ref}
      css={[
        style[variant],
        style[weight],
        css`
          color: ${color};
        `,
        gutter && style.gutter,
      ]}
      {...props}>
      {children}
    </Component>
  );
});

export default Typography;
