import { useTheme } from '@emotion/react';
import Avatar from '@components/Avatar';
import Wrapper from '@components/Wrapper';
import { ImageItemProps } from './types';

export const ImageItem = ({
  children,
  image,
  avatarSize = 24,
  link = '',
  openLinkInNewTab = false,
  className,
}: ImageItemProps) => {
  const theme = useTheme();
  const additionalProps = link
    ? {
        href: link,
        target: openLinkInNewTab ? '_blank' : undefined,
      }
    : {};
  return (
    <Wrapper
      css={{ gap: 8, textDecoration: 'none' }}
      as={link ? 'a' : 'div'}
      className={className}
      data-testid="image-item"
      {...additionalProps}>
      <Avatar size={avatarSize} image={image} />
      <span
        css={{
          color: theme.colors.greyDarker,
          fontSize: 14,
          fontWeight: 500,
          cursor: link ? 'pointer' : 'default',
          '&:hover': {
            color: theme.colors.blue,
          },
        }}>
        {children}
      </span>
    </Wrapper>
  );
};
