import { Fragment } from 'react';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import Wrapper from '@components/Wrapper';
import { useFullscreenMode } from '@components/FullscreenModeContext';
import { PieChartProps } from './types';
import { PieChartButton } from './styles';

export const PieChartHeader = ({
  features = [],
}: Pick<PieChartProps, 'features'>) => {
  const theme = useTheme();
  const { toggleFullscreenMode, isFullscreenMode } = useFullscreenMode();

  const handleToggleFullscreenMode = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    toggleFullscreenMode();
  };

  if (!features.length) {
    return <Fragment></Fragment>;
  }
  return (
    <Wrapper css={{ width: 'auto', marginLeft: 'auto' }}>
      {features.includes('fullscreenMode') && (
        <PieChartButton variant="tertiary" onClick={handleToggleFullscreenMode}>
          <Icon
            name={isFullscreenMode ? 'cross' : 'maximize'}
            css={{
              cursor: 'pointer',
            }}
            tooltip={isFullscreenMode ? 'Close' : 'Maximize'}
            size={18}
            color={theme.colors.greyFilterIcon}
          />
        </PieChartButton>
      )}
    </Wrapper>
  );
};
