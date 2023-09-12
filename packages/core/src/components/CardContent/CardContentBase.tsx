import styled from '@emotion/styled';

const CardContentBase = styled.div<{ direction?: string }>`
  display: flex;
  justify-content: space-between;

  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  align-items: ${({ direction }) =>
    direction === 'column' ? 'normal' : 'center'};
`;

export default CardContentBase;
