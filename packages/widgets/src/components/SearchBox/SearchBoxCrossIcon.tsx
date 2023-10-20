import { useTheme } from '@emotion/react';
import { Icon } from '@ssa-ui-kit/core';

export const SearchBoxCrossIcon = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const theme = useTheme();
  return (
    <div
      role="button"
      onClick={onClick}
      onKeyDown={undefined}
      tabIndex={0}
      data-testid="cross-icon"
      css={{
        cursor: 'pointer',
        '& svg path': {
          strokeWidth: 1,
          stroke: theme.colors.greyFilterIcon,
        },
      }}>
      <Icon name="cross" size={15} color="#55575A" />
    </div>
  );
};
