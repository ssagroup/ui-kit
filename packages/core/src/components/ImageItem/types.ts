import { AvatarSizes } from '@components/Avatar/types';

export type ImageItemProps = React.PropsWithChildren<{
  image: string;
  avatarSize?: AvatarSizes;
  /** Shows a border around the avatar. @default false */
  avatarBorder?: boolean;
  link?: string;
  className?: string;
  openLinkInNewTab?: boolean;
}>;
