export type ImageItemProps = React.PropsWithChildren<{
  image: string;
  avatarSize?: number;
  link?: string;
  className?: string;
  openLinkInNewTab?: boolean;
}>;
