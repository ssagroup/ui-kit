import { useTheme } from '@emotion/react';

import { Button, Icon, ModalDismissButton, Typography } from '@ssa-ui-kit/core';

import { ModalHeaderProps } from './types';

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  const theme = useTheme();
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
      }}>
      {title ? (
        <Typography variant="h4" css={{ fontSize: '20px', fontWeight: 700 }}>
          {title}
        </Typography>
      ) : null}
      <ModalDismissButton>
        <Button
          variant="tertiary"
          size="small"
          startIcon={
            <Icon name="cross" size={18} color={theme.colors.greyFilterIcon} />
          }
          onClick={onClose}
        />
      </ModalDismissButton>
    </div>
  );
};
