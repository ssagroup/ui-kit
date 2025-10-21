import styled from '@emotion/styled';
import { NoDataYet as NoDataIcon } from '@icons';

import { Typography, useTranslation, Wrapper } from '@ssa-ui-kit/core';

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
      <Text>{t('messages.noDataYet')}!</Text>
    </Wrapper>
  );
};
