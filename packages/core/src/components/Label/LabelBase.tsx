import styled from '@emotion/styled';

export const LabelBase = styled.label`
  display: inline-block;

  flex: 1;
  font-weight: 500;
  font-size: 1rem;
  line-height: 22px;

  color: ${({ theme }) => theme.colors.greyDarker};

  margin: 0px 0px 6px 4px;
`;
