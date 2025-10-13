import { Children, cloneElement, isValidElement } from 'react';

import { ProgressLegendProps } from './types';

const ProgressLegend = ({
  children,
  vertical = false,
}: ProgressLegendProps) => {
  const mapPosition = {
    horizontal: {
      width: '100%',
      height: `12px`,
    },
    vertical: {
      height: '100%',
      width: `35px`,
    },
  };

  return (
    <div
      style={{
        position: 'relative',
        fontSize: '10px',
        fontWeight: 700,
        ...mapPosition[vertical ? 'vertical' : 'horizontal'],
      }}>
      {Children.map(children, (child) => {
        // istanbul ignore else
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...child.props,
            vertical,
          });
        }
      })}
    </div>
  );
};

export default ProgressLegend;
