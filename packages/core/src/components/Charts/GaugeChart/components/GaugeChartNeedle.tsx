import { scaleFromBase } from '../utils';

export interface GaugeChartNeedleProps {
  pieSize: { width: number; height: number };
  pieOffset: { x: number; y: number };
  needleAngle: number;
}

export const GaugeChartNeedle = ({
  pieSize,
  pieOffset,
  needleAngle,
}: GaugeChartNeedleProps) => {
  if (pieSize.height <= 0) {
    return;
  }

  const needle = {
    x: pieOffset.x + pieSize.width / 2,
    y: pieOffset.y + pieSize.height - scaleFromBase(10, 100, pieSize.height),
    width:
      scaleFromBase(40, 100, pieSize.width) -
      scaleFromBase(10, 100, pieSize.height),
    height: scaleFromBase(8, 100, pieSize.height),
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: `${needle.y}px`,
        left: `${needle.x}px`,
        width: `${needle.width}px`,
        borderRadius: needle.height / 2,
        height: `${needle.height}px`,
        backgroundColor: '#73767B',
        transformOrigin: 'left center',
        transform: `rotate(${needleAngle}deg)`,
      }}
    />
  );
};
