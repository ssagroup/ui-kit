import { useTheme } from '@emotion/react';
import Avatar from '@components/Avatar';
import Wrapper from '@components/Wrapper';

export const ImageItem = ({
  children,
  image,
  avatarSize = 24,
  link = '',
}: React.PropsWithChildren<{
  image: string;
  avatarSize?: number;
  link?: string;
}>) => {
  const theme = useTheme();
  const additionalProps = link
    ? {
        href: link,
      }
    : {};
  return (
    <Wrapper
      css={{ gap: 8, textDecoration: 'none' }}
      as={link ? 'a' : 'div'}
      {...additionalProps}>
      <Avatar size={avatarSize} image={image} />
      <span
        css={{
          color: theme.colors.greyDarker,
          fontSize: 14,
          fontWeight: 500,
          cursor: link ? 'pointer' : 'default',
          '&:hover': {
            color: '#346FE3',
          },
        }}>
        {children}
      </span>
    </Wrapper>
  );
};
