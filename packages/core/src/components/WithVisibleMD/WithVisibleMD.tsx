import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

const VisibleMD = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`;

export const WithVisibleMD = <T extends object>(
  Component: React.ComponentType<T>,
  styles?: SerializedStyles,
) => {
  const decoratedComp = (props: T) => (
    <VisibleMD data-testid="with-visible-md" css={styles}>
      <Component {...props} />
    </VisibleMD>
  );

  decoratedComp.displayName = `WithVisibleMD(${Component.displayName})`;
  return decoratedComp;
};
