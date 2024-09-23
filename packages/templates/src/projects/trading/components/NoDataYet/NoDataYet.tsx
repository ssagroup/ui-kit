import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Typography, Wrapper } from '@ssa-ui-kit/core';
import NoDataIcon from '@trading/assets/no_data_yet.svg?react';

const Text = styled(Typography)`
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 16px;
  }
`;

export const NoDataYet = () => {
  const { t } = useTranslation();
  return (
    <Wrapper
      direction="column"
      css={{
        justifyContent: 'center',
        height: '100%;',
      }}>
      <NoDataIcon />
      <Text>{t('common.noDataYet')}!</Text>
    </Wrapper>
  );
};
