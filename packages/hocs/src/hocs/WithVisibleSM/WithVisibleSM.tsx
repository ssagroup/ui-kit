import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

const VisibleSM = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`;

export const WithVisibleSM = <T extends object>(
  Component: React.ComponentType<T>,
  styles?: SerializedStyles,
) => {
  const decoratedComp = (props: T) => (
    <VisibleSM data-testid="with-visible-sm" css={styles}>
      <Component {...props} />
    </VisibleSM>
  );

  decoratedComp.displayName = `WithVisibleSM(${Component.displayName})`;
  return decoratedComp;
};
