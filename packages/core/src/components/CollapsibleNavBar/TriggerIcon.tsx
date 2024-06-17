import { css, useTheme } from '@emotion/react';
import Wrapper from '@components/Wrapper';
import Icon from '@components/Icon';
import type { MapIconsType, SVGProps } from '@components/Icon/types';

export const TriggerIcon = ({
  iconName,
  iconSize,
  className,
  CustomIcon,
}: {
  iconName: keyof MapIconsType;
  iconSize?: number;
  className?: string;
  CustomIcon?: (props: Omit<SVGProps, 'fill'>) => JSX.Element;
}) => {
  const theme = useTheme();
  return (
    <Wrapper
      css={css`
        width: auto;
        min-width: 22px;
        justify-content: center;
        overflow: visible;
        position: relative;
        height: 26px;
      `}
      className="trigger-icon">
      {CustomIcon ? (
        <CustomIcon
          size={iconSize}
          className={className}
          color={theme.colors.grey}
        />
      ) : (
        <Icon
          name={iconName}
          color={theme.colors.grey}
          size={iconSize}
          className={className}
        />
      )}
    </Wrapper>
  );
};
