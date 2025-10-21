import { MouseEventHandler, ReactNode } from 'react';

import { css, useTheme } from '@emotion/react';

import { Button, Icon, IconProps, Wrapper } from '@ssa-ui-kit/core';

export const ActionButton = ({
  iconName,
  icon,
  title,
  className,
  isDisabled,
  onClick,
  ...rest
}: {
  iconName?: IconProps['name'];
  icon?: ReactNode;
  title?: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ['data-testid']?: string;
}) => {
  const theme = useTheme();
  return (
    <Button
      variant="custom"
      startIcon={
        iconName ? (
          <Icon name={iconName} size={20} color={theme.colors.greyFilterIcon} />
        ) : (
          <Wrapper title={title}>{icon}</Wrapper>
        )
      }
      isDisabled={isDisabled}
      onClick={onClick}
      css={css`
        margin: 0 7px;
        width: 30px;
        justify-content: center;
        &:disabled {
          cursor: default;
          filter: grayscale(1);
        }
        & svg {
          width: 15px;
          height: 15px;
        }

        border-radius: 6px;
        background: ${theme.colors.greyLighter};

        ${theme.mediaQueries.md} {
          width: 40px;
          height: 40px;
          margin-left: 20px;
          padding: 0 10px;
          & svg {
            width: 20px;
            height: 20px;
          }
        }
      `}
      className={className}
      {...rest}
    />
  );
};
