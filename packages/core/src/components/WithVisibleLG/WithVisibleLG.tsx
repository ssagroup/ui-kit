import styled from '@emotion/styled';

const VisibleLG = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`;

export const WithVisibleLG = <T extends object>(
  Component: React.ComponentType<T>,
  rest?: Parameters<typeof VisibleLG>[0],
) => {
  const decoratedComp = (props: T) => (
    <VisibleLG data-testid="with-visible-lg" {...rest}>
      <Component {...props} />
    </VisibleLG>
  );

  decoratedComp.displayName = `WithVisibleLG(${Component.displayName})`;
  return decoratedComp;
};
