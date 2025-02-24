import { SerializedStyles, Theme } from '@emotion/react';

export const labelListStyles = (
  theme: Theme,
  isFullscreenMode: boolean,
  isMinLGMediaQuery: boolean,
) => ({
  color: theme.colors.greyDarker,
  marginLeft: isMinLGMediaQuery ? 20 : 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
  '& > li': {
    height: !isFullscreenMode && 21.5,
    paddingLeft: 5,
    '& > span': {
      minWidth: 10,
      width: 10,
      height: 10,
      marginRight: !isFullscreenMode && 5,
      marginLeft: 0,
    },
    '& > h6': {
      fontSize: isFullscreenMode ? 16 : 12,
      fontWeight: 500,
      marginBottom: 0,
      marginRight: !isFullscreenMode && 6,
      lineHeight: '18px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
});

export const valueList = (theme: Theme) =>
  ({
    color: theme.colors.greyDarker,
    '& > li': {
      justifyContent: 'right',
      height: 21.5,
      padding: 0,
      paddingRight: 5,
      '& > h6': {
        fontSize: 12,
        fontWeight: 700,
        color: theme.colors.greyDarker,
        marginBottom: 0,
        lineHeight: '18px',
      },
    },
  }) as unknown as SerializedStyles;
