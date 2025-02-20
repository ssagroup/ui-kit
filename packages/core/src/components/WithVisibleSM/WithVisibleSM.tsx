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
      {/* TODO: HoC prop types not working with new emotion https://github.com/emotion-js/emotion/issues/3261 */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Component {...(props as any)} />
    </VisibleSM>
  );

  decoratedComp.displayName = `WithVisibleSM(${Component.displayName})`;
  return decoratedComp;
};
