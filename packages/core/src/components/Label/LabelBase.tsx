import styled from '@emotion/styled';

export const LabelBase = styled.label<{ isDisabled?: boolean }>`
  display: inline-block;

  flex: 1;
  font-weight: 500;
  font-size: 1rem;
  line-height: 22px;

  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.grey : theme.colors.greyDarker};

  margin: 0 0 6px 4px;
`;
