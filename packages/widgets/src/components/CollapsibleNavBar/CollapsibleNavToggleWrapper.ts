import NavToggleWrapper from '@components/NavBar/NavToggleWrapper';
import styled from '@emotion/styled';

const CollapsibleNavToggleWrapper = styled(NavToggleWrapper)`
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.greyLighter};

  height: 40px;
  width: 40px;
`;

export default CollapsibleNavToggleWrapper;
