import styled from '@emotion/styled';
import { NotificationCard } from '@components/NotificationCard';

const Main = styled.main`
  background: linear-gradient(
      143deg,
      #e7ebf1 -4.16%,
      #d7d9dd 39.37%,
      #cccdd2 52.66%,
      #e1e4ea 87.68%
    ),
    #f8f9fb;
  width: 100%;
  padding: 60px 10px 10px 15px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 10px 21px 10px 35px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 10px 49px 10px 36px;
  }

  ${({ theme }) => theme.mediaQueries.xlg} {
    padding: 10px 60px 10px 62px;
  }
`;
export const Layout = ({ children }: { children: React.ReactNode }) => {
  /* cSpell:disable */
  return (
    <div
      css={{
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
      }}>
      {children}
      <Main>
        {new Array(30).fill(1).map((_, index) => (
          <NotificationCard
            key={index}
            title="CyberVeinToken is Now Available"
            text="With our newest listing, we’re welcoming Wrapped"
            isRead={false}
            type="Informational"
            time={Date.now()}
          />
        ))}
      </Main>
    </div>
  );
  /* cSpell:enable */
};
