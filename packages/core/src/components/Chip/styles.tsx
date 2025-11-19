import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

export const ChipBase = styled.div<CommonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: Manrope, sans-serif;
  font-weight: 500;
  border-radius: 24px;
  white-space: nowrap;
  user-select: none;
  outline: none;
`;

export const small = css`
  height: 24px;
  padding: 2px 8px;
  font-size: 12px;
  line-height: 16px;
`;

export const medium = css`
  height: 32px;
  padding: 4px 12px;
  font-size: 14px;
  line-height: 20px;
`;

export const large = css`
  height: 40px;
  padding: 6px 16px;
  font-size: 16px;
  line-height: 24px;
`;

const baseFilled = (theme: Theme) => css`
  background-color: ${theme.colors.greyLighter};
  border: none;
`;

const baseOutlined = (theme: Theme) => css`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey};
`;

export const filled = (theme: Theme) => css`
  ${baseFilled(theme)};
  color: ${theme.colors.greyDarker};
`;

export const filledDisabled = (theme: Theme) => css`
  ${baseFilled(theme)};
  color: ${theme.colors.greyDisabled};
  opacity: 0.6;
`;

export const outlined = (theme: Theme) => css`
  ${baseOutlined(theme)};
  color: ${theme.colors.greyDarker};
`;

export const outlinedDisabled = (theme: Theme) => css`
  ${baseOutlined(theme)};
  color: ${theme.colors.greyDisabled};
  opacity: 0.6;
`;

export const clickable = css`
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.7;
  }
`;

export const clickableDisabled = css`
  cursor: not-allowed;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 7px;
`;

export const AvatarWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 7px;
`;

export const LabelWrapper = styled.span`
  color: inherit;
`;

export const DeleteIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 7px;
  padding: 0;
  padding-top: 1px;
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
  transition: opacity 0.2s ease;

  & svg path {
    stroke-width: 1;
  }

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
