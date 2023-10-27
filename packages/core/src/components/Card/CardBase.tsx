import styled from '@emotion/styled';

const CardBase = styled.div<{ noShadow?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;

  background: #fff;

  box-shadow: ${({ theme, noShadow }) =>
    !noShadow && `0px 10px 40px ${theme.colors.greyDarker60}`};
  border-radius: 10px;
  border: none;

  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export default CardBase;
