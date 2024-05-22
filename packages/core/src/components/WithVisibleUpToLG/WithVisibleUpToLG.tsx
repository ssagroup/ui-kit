import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

const VisibleUpToLG = styled.div`
  display: none;

  @media screen and (max-width: 1439px) {
    display: block;
  }
`;

export const WithVisibleUpToLG = <T extends object>(
  Component: React.ComponentType<T>,
  styles?: SerializedStyles,
) => {
  const decoratedComp = (props: T) => (
    <VisibleUpToLG data-testid="with-visible-up-to-lg" css={styles}>
      <Component {...props} />
    </VisibleUpToLG>
  );

  decoratedComp.displayName = `WithVisibleUpToLG(${Component.displayName})`;
  return decoratedComp;
};
