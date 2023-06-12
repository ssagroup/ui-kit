import styled from '@emotion/styled';

export const ColorMarker = styled.button<{ active: boolean }>`
  cursor: pointer;

  width: 24px;
  height: 24px;

  border: none;
  border-radius: 50%;

  border: ${({ active }) => (active ? '1.4px solid #fff' : 'none')};
  box-shadow: ${({ active }) => (active ? 'inherit' : 'none !important')};
`;
