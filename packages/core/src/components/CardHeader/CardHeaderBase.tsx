import styled from '@emotion/styled';

const CardHeaderBase = styled.div<{ transparent?: boolean; hasIcon?: boolean }>`
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 20px;

  background: ${(props) => (props.transparent ? 'transparent' : 'initial')};

  padding-left: ${(props) => (props.hasIcon ? '30px' : null)};

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: ${(props) => (props.hasIcon ? '40px' : null)};
  }
`;

export default CardHeaderBase;
