import styled from '@emotion/styled';

import { Typography } from '@ssa-ui-kit/core';

import { ModalMessageProps } from './types';

const TextWrapper = styled(Typography)`
  font-size: 16px;
  padding: 25px 0;
  text-align: center;
  line-height: normal;
`;

export const ModalMessage = ({ content }: ModalMessageProps) => {
  return typeof content === 'string' ? (
    <TextWrapper variant="body1" gutter={true}>
      {content}
    </TextWrapper>
  ) : (
    content
  );
};
