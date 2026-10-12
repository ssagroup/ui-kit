import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';
import { IconProps } from '@components/Icon/types';

import { getHighlightColors } from '../consts';
import { CalendarDayHighlight } from '../types';
import * as S from '../styles';

/** The round gradient badge of a whole-day highlight. */
export const HighlightBadge = ({
  highlight,
}: {
  highlight: CalendarDayHighlight;
}) => {
  const theme = useTheme();
  const { gradient } = getHighlightColors(theme, highlight.color);
  const { icon } = highlight;

  if (icon === undefined || icon === null) return null;

  return (
    <span css={S.highlightBadge(gradient)} aria-hidden>
      {typeof icon === 'string' ? (
        <Icon
          name={icon as IconProps['name']}
          size={16}
          color={theme.colors.white}
        />
      ) : (
        icon
      )}
    </span>
  );
};
