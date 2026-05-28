import { AvatarSizes } from '@components/Avatar/types';

export type ImageItemProps = React.PropsWithChildren<{
  image: string;
  avatarSize?: AvatarSizes;
  link?: string;
  className?: string;
  openLinkInNewTab?: boolean;
}>;
