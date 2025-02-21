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
      {/* TODO: HoC prop types not working with new emotion https://github.com/emotion-js/emotion/issues/3261 */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Component {...(props as any)} />
    </VisibleUpToLG>
  );

  decoratedComp.displayName = `WithVisibleUpToLG(${Component.displayName})`;
  return decoratedComp;
};
