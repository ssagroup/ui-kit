import Typography from '@components/Typography';

import { LinkBase } from './LinkBase';

import { LinkProps } from './Link.types';

export const Link = ({ children, href, ...props }: LinkProps) => (
  <LinkBase href={href} {...props}>
    <Typography variant="subtitle">{children}</Typography>
  </LinkBase>
);
