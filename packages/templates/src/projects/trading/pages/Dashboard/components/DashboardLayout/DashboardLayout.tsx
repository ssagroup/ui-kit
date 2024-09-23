import styled from '@emotion/styled';

type DashboardLayoutType = {
  children: React.ReactNode;
};

const DashboardLayoutBase = styled.div`
  min-height: 100vh;
`;

export const DashboardLayout = ({ children }: DashboardLayoutType) => {
  return <DashboardLayoutBase>{children}</DashboardLayoutBase>;
};
