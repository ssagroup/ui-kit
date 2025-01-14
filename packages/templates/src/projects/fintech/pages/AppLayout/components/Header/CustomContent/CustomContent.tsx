import styled from '@emotion/styled';
import { useHeader } from '@fintech/contexts';

const CustomContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  margin-left: 10px;
`;

export const CustomContent = () => {
  const { headerContentRef } = useHeader();
  return (
    <CustomContentWrapper
      ref={headerContentRef as React.RefObject<HTMLDivElement>}
    />
  );
};
