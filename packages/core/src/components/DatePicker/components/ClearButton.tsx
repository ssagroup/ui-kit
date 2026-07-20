import { Interpolation, Theme, useTheme } from '@emotion/react';
import * as C from '@components';

export type ClearButtonProps = {
  onClick: () => void;
  ariaLabel: string;
  dataTestId: string;
  className?: string;
  css?: Interpolation<Theme>;
};

export const ClearButton = ({
  onClick,
  ariaLabel,
  dataTestId,
  className,
  css: cssProp,
}: ClearButtonProps) => {
  const theme = useTheme();

  return (
    <C.Button
      endIcon={
        <C.Icon name="cross" size={16} color={theme.colors.greyDarker80} />
      }
      data-testid={dataTestId}
      onClick={onClick}
      variant="tertiary"
      aria-label={ariaLabel}
      className={className}
      css={[
        {
          padding: 0,
          '&:focus::before': {
            display: 'none',
          },
        },
        cssProp,
      ]}
    />
  );
};
