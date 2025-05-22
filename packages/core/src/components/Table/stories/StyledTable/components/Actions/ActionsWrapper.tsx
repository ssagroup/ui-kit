import Wrapper from '@components/Wrapper';

export const ActionsWrapper = ({
  children,
  ...rest
}: Parameters<typeof Wrapper>[0]) => (
  <Wrapper
    direction="column"
    alignItems="flex-start"
    css={{
      background: '#fff',
      width: 140,
      color: '#2b2d31',
      fontWeight: 500,
      borderRadius: 5,
      boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.25)',
    }}
    {...rest}>
    {children}
  </Wrapper>
);
