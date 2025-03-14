import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@components/Button';
import { useFullscreenMode, Icon, Wrapper } from '@components';

import { TreeMapChartFeature } from './TreeMapChart';

export const FullScreenButton = styled(Button)`
  height: auto;
  padding: 0;
  background: none;
  box-shadow: none;

  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
    &::before {
      display: none;
    }
  }

  &:hover {
    svg path {
      fill: ${({ theme }) => theme.colors.greyDarker};
    }
  }
`;

export interface TreeMapChartHeaderProps {
  features: TreeMapChartFeature[];
}

export const TreeMapChartHeader = ({ features }: TreeMapChartHeaderProps) => {
  const { isFullscreenMode, toggleFullscreenMode } = useFullscreenMode();
  const theme = useTheme();

  return (
    <Wrapper css={{ width: 'auto', marginLeft: 'auto' }}>
      {features.includes('fullscreenMode') && (
        <FullScreenButton variant="tertiary" onClick={toggleFullscreenMode}>
          <Icon
            name={isFullscreenMode ? 'cross' : 'maximize'}
            css={{
              cursor: 'pointer',
            }}
            tooltip={isFullscreenMode ? 'Close' : 'Maximize'}
            size={18}
            color={theme.colors.greyFilterIcon}
          />
        </FullScreenButton>
      )}
    </Wrapper>
  );
};
