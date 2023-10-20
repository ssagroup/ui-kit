import { Theme, css } from '@emotion/react';

export const ResetBtnStyles = css`
  padding: 0;
  height: auto;
  background: none;

  &:focus,
  &:hover {
    border: none;
    background: none;
    box-shadow: none;

    &::before {
      border: none;
    }
  }
`;

export const ContentWrapper = (theme: Theme) => css`
  align-items: flex-start;
  z-index: 1;
  width: 470px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px 0px ${theme.colors.black25};
  background: ${theme.colors.greyPopoverLight};
`;

export const Close = css`
  position: absolute;
  right: 20px;
  top: 22px;
  ${ResetBtnStyles};
`;

export const ButtonsWrapper = (theme: Theme) => css`
  display: grid;
  grid-template-columns: auto;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px 13px;
  border-top: 0.4px solid #7a7c7f;
`;

export const List = css`
  max-height: 410px;
  overflow: auto;
`;
