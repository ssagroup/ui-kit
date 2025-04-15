import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useElementSize } from '@ssa-ui-kit/hooks';
import Wrapper from '@components/Wrapper';

export type GaugeBarThreshold = { value: number; color: string };
export type GaugeBarValueFormatter = (
  value: number,
  color: string,
) => React.ReactNode;

export interface GaugeBarProps {
  value: number;
  valueFormatter?: GaugeBarValueFormatter;
  title?: React.ReactNode;
  thresholds?: GaugeBarThreshold[];
  gap?: number;
  brickWidth?: number;
  min?: number;
  max?: number;
}

const Brick = styled('div', {
  shouldForwardProp: (propName) => !propName.startsWith('$'),
})<{ $width: number; $color: string; $inactive: boolean }>`
  position: relative;
  height: 100%;
  width: ${({ $width }) => `${$width}px`};
  background: ${({ $color }) => $color};
  border-radius: 12px;
  overflow: hidden;

  opacity: ${({ $inactive }) => ($inactive ? 0.4 : 1)};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(85, 87, 90, 0.1);
    opacity: ${({ $inactive }) => ($inactive ? 1 : 0)};
    transition: opacity 0.2s;
  }
`;

export const GaugeBar = ({
  title,
  value,
  min,
  max,
  gap = 2,
  brickWidth = 6,
  thresholds = [],
  valueFormatter,
}: GaugeBarProps) => {
  const { ref, width } = useElementSize<HTMLDivElement>();
  const { ref: valueRef, width: valueWidth } = useElementSize<HTMLDivElement>();
  const theme = useTheme();

  const baseThreshold = {
    value: 0,
    color: theme.colors.green as string,
  };

  const _min = min || 0;
  const _max = max || 100;

  const _thresholds = thresholds.slice().sort((a, b) => b.value - a.value);
  const activeThreshold =
    _thresholds.find((threshold) => value >= threshold.value) || baseThreshold;

  const totalBricks = Math.max(
    0,
    Math.floor((width - valueWidth) / (brickWidth + gap)) - 1,
  );
  const percentagePerBrick = (_max - _min) / totalBricks;

  const bricks = new Array(totalBricks).fill(0).map((_, index) => {
    const brickValue = _min + index * percentagePerBrick;

    const threshold =
      _thresholds.find((threshold) => brickValue >= threshold.value) ||
      baseThreshold;

    const inactive = value < brickValue;
    return (
      <Brick
        key={index}
        $width={brickWidth}
        $color={threshold!.color}
        $inactive={inactive}
      />
    );
  });

  return (
    <div
      css={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div css={{ fontWeight: 500, fontSize: '12px' }}>{title}</div>
      <Wrapper ref={ref} css={{ flex: 1, gap: '10px' }}>
        <div
          css={{
            flex: 1,
            height: '100%',
            padding: '10px 0',
            display: 'flex',
            gap: `${gap}px`,
          }}>
          {bricks}
        </div>
        <div
          ref={valueRef}
          style={{ color: activeThreshold!.color }}
          css={{
            fontWeight: 700,
            fontSize: '18px',
          }}>
          {valueFormatter?.(value, activeThreshold!.color) || value}
        </div>
      </Wrapper>
    </div>
  );
};
