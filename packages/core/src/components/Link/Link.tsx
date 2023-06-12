import Typography from '@components/Typography';

import { LinkProps } from './Link.types';
import { LinkBase } from './LinkBase';

export const Link = ({ children, href, ...props }: LinkProps) => (
  <LinkBase href={href} {...props}>
    <Typography variant="subtitle">{children}</Typography>
  </LinkBase>
);
