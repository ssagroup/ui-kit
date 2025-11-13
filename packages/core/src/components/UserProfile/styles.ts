import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import Wrapper from '@components/Wrapper';

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
  width: 224px;
  background: ${theme.colors.greyPopoverLight};
  border-radius: 20px;
  box-shadow: 0 4px 15px 0 ${theme.colors.black25};
`;

export const UserInfo = css`
  gap: 2px;
  width: 100%;
  padding: 10px;
`;

export const LogoutWrapper = (theme: Theme) => css`
  width: 100%;
  padding: 10px 10px 18px 10px;
  border-top: 0.5px solid ${theme.colors.greyGraphite70};
`;

export const CustomButton = css`
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  line-height: 19px;
  font-weight: 500;
`;

export const AdditionalInfoWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: flex-start;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.greyDropdownFocused};
`;

export const CustomContentWrapper = styled(Wrapper)`
  width: 100%;
  padding: 10px;
  border-top: 0.5px solid ${({ theme }) => theme.colors.greyGraphite70};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.greyGraphite70};
`;
