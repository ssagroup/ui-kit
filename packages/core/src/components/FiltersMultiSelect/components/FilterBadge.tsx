import { css, useTheme } from '@emotion/react';

import Button from '@components/Button';
import Badge from '@components/Badge';
import Icon from '@components/Icon';

import { SelectedFilter } from '../useFiltersMultiSelect';

interface FilterBadgeProps {
  type: SelectedFilter['type'];
  disabled?: boolean;
  className?: string;
  withRemoveButton?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export const FilterBadge = ({
  type,
  disabled,
  className,
  withRemoveButton,
  onRemove,
  children,
}: FilterBadgeProps) => {
  const theme = useTheme();

  const colors = {
    include: {
      light: theme.colors.greenLighter,
      main: theme.colors.green,
      text: theme.colors.greenDark,
    },
    exclude: {
      light: theme.colors.redLighter,
      main: theme.colors.red,
      text: theme.colors.redDark,
    },
    group: {
      light: theme.colors.blueLighter,
      main: theme.colors.blue,
      text: theme.colors.blue,
    },
  };

  const mixTarget = disabled ? theme.colors.greyLighter : theme.colors.white;

  const mixIfDisabled = (color?: string) =>
    disabled ? `color-mix(in srgb, ${color}, ${mixTarget})` : color;

  return (
    <Badge
      className={className}
      data-filter-type={type}
      css={css`
        cursor: default;

        font-weight: 500;
        font-size: 14px;

        display: flex;
        align-items: center;
        gap: 10px;

        padding: 0 12px;
        height: 32px;
        border-radius: 24px;
        border: 1px solid transparent;
        box-shadow: none;

        background:
          linear-gradient(
              295.98deg,
              color-mix(in srgb, ${colors[type].light} 6%, ${mixTarget}) 16.38%,
              color-mix(in srgb, ${colors[type].main} 6%, ${mixTarget}) 83.62%
            )
            padding-box,
          linear-gradient(
              295.98deg,
              ${mixIfDisabled(colors[type].light)} 16.38%,
              ${mixIfDisabled(colors[type].main)} 83.62%
            )
            border-box;

        color: ${mixIfDisabled(colors[type].text)};

        & svg {
          path {
            stroke: ${mixIfDisabled(colors[type].text)};
            stroke-width: 1;
          }
        }
      `}>
      {children}
      {withRemoveButton && (
        <Button
          variant="tertiary"
          isDisabled={disabled}
          css={{ padding: 0, cursor: disabled ? 'default' : 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          endIcon={<Icon name="cross" role="button" size={12} />}
        />
      )}
    </Badge>
  );
};
