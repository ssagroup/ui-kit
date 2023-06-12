import { ProgressLegendItemProps } from './types';

const ProgressLegendItem = ({
  position = 'current',
  percentage,
  vertical = false,
  children,
}: ProgressLegendItemProps) => {
  const mapPosition = {
    horizontal: {
      top: 0,
      left:
        position === 'start'
          ? 0
          : position === 'current'
          ? `${percentage}%`
          : '100%',
      transform:
        position === 'current' || position === 'end'
          ? 'translateX(-50%)'
          : 'none',
    },
    vertical: {
      width: '100%',
      top:
        position === 'start'
          ? '100%'
          : position === 'current'
          ? `${100 - percentage}%`
          : 0,
      transform:
        position === 'start'
          ? 'translateY(-100%)'
          : position === 'current'
          ? 'translateY(-50%)'
          : 'none',
    },
  };
  return (
    <div
      style={{
        position: 'absolute',
        display: 'block',
        lineHeight: 1,
        ...mapPosition[vertical ? 'vertical' : 'horizontal'],
      }}>
      {children}
    </div>
  );
};

export default ProgressLegendItem;
