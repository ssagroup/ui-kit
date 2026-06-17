import styled from '@emotion/styled';

interface SwitchBaseProps {
  onColor: string;
  /** Explicit hover background for palette variants. When omitted, a ::after overlay darkens the track instead, leaving the knob unaffected. */
  hoverColor?: string;
  offOutlineColor: string;
}

const SwitchBase = styled('button', {
  shouldForwardProp: (prop) =>
    prop !== 'onColor' && prop !== 'hoverColor' && prop !== 'offOutlineColor',
})<SwitchBaseProps>`
  width: 44px;
  height: 24px;
  border: 0;
  outline: 0;
  padding: 0;
  border-radius: 50px;
  position: relative;
  background: ${({ onColor }) => onColor};
  cursor: pointer;

  &::before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    right: 5px;
    bottom: calc(50% - 7px);
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 1;
    transition: 0.4s;
    border-radius: 50%;
  }

  &[aria-checked='false'] {
    background: ${({ theme }) => theme.colors.greyFocused};
  }

  &:not(:disabled)[aria-checked='true']:hover {
    ${({ hoverColor }) => (hoverColor ? `background: ${hoverColor};` : '')}
  }

  ${({ hoverColor }) =>
    !hoverColor
      ? `
        &:not(:disabled)[aria-checked='true']:hover::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50px;
          background: rgba(0, 0, 0, 0.15);
          pointer-events: none;
        }
      `
      : ''}

  &:disabled {
    background: ${({ theme }) => theme.colors.greySelectedMenuItem};
    cursor: auto;
  }

  &[aria-checked='false']:focus::after,
  &:not(:disabled)[aria-checked='false']:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ offOutlineColor }) => offOutlineColor};
    border-radius: 50px;
  }

  &[aria-checked='true']::before {
    transform: translateX(0);
  }

  &[aria-checked='false']::before {
    transform: translateX(-20px);
  }
`;

export default SwitchBase;
