import { useTheme } from '@emotion/react';
import { Button, Icon } from '@ssa-ui-kit/core';

export const SearchBoxCrossIcon = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const theme = useTheme();
  return (
    <Button
      onClick={onClick}
      variant="custom"
      data-testid="cross-icon"
      css={{
        padding: 0,
        background: 'none',
        '& svg path': {
          strokeWidth: 1,
          stroke: theme.colors.greyFilterIcon,
        },
      }}>
      <Icon name="cross" size={15} color="#55575A" />
    </Button>
  );
};
