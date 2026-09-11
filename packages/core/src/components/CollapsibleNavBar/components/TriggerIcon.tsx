import { css, useTheme, CSSObject } from '@emotion/react';
import Wrapper from '@components/Wrapper';
import Icon from '@components/Icon';
import type { MapIconsType, SVGProps } from '@components/Icon/types';
// Imported from the module, not the `@components` barrel: going through the
// barrel puts this file in an import cycle with the package index, which leaves
// whichever component loses the race evaluating as `undefined`.
import { useCollapsibleNavBarContext } from '../CollapsibleNavBarContext';

export const TriggerIcon = ({
  iconName,
  iconSize,
  className,
  CustomIcon,
  css: cssProp,
}: {
  iconName: keyof MapIconsType;
  iconSize?: number;
  className?: string;
  CustomIcon?: (
    props: Omit<SVGProps, 'fill'> & {
      showIconTooltip?: boolean;
    },
  ) => React.JSX.Element;
  css?: CSSObject;
}) => {
  const theme = useTheme();
  const { showIconTooltip } = useCollapsibleNavBarContext();
  return (
    <Wrapper
      css={[
        css`
          width: auto;
          min-width: 25px;
          justify-content: center;
          overflow: visible;
          position: relative;
          height: 26px;
        `,
        cssProp,
      ]}
      className="trigger-icon">
      {CustomIcon ? (
        <CustomIcon
          size={iconSize}
          className={className}
          color={theme.colors.grey}
          showIconTooltip={showIconTooltip}
        />
      ) : (
        <Icon
          name={iconName}
          color={theme.colors.grey}
          size={iconSize}
          className={className}
          tooltip={showIconTooltip ? undefined : ''}
        />
      )}
    </Wrapper>
  );
};
