import styled from '@emotion/styled';
import { useHeader } from '@trading/contexts';

const CustomBreadcrumbContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 10px;
`;

export const CustomBreadcrumbContent = () => {
  const { breadcrumbContentRef } = useHeader();
  return (
    <CustomBreadcrumbContentWrapper
      ref={breadcrumbContentRef as React.RefObject<HTMLDivElement>}
    />
  );
};
