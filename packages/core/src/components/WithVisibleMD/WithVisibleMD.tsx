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
      {/* TODO: HoC prop types not working with new emotion https://github.com/emotion-js/emotion/issues/3261 */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Component {...(props as any)} />
    </VisibleMD>
  );

  decoratedComp.displayName = `WithVisibleMD(${Component.displayName})`;
  return decoratedComp;
};
