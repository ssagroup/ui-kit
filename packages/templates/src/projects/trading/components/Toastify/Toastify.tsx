import { ToastContainer } from 'react-toastify';
import styled from '@emotion/styled';
export const Toastify = styled(ToastContainer)`
  .custom-toast {
    position: relative;
    display: flex;
    padding: 10px;
    min-height: 70px;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.greyDarker};
    box-shadow: 5px 5px 20px 0 ${({ theme }) => theme.colors.black25};
    border-radius: 5px;
    margin-bottom: 10px;

    &.error {
      & > svg {
        fill: ${({ theme }) => theme.colors.red};
      }

      div[role='progressbar'] {
        background: ${({ theme }) => theme.colors.red};
      }
    }

    &.success {
      & > svg {
        fill: ${({ theme }) => theme.colors.greenDark};
      }

      div[role='progressbar'] {
        background: ${({ theme }) => theme.colors.greenDark};
      }
    }
  }
`;
