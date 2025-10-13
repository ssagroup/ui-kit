import { Children, cloneElement, isValidElement } from 'react';

import { ProgressVerticalProps } from './types';

const ProgressVertical = ({ children }: ProgressVerticalProps) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
      }}>
      {Children.map(children, (child) => {
        // istanbul ignore else
        if (isValidElement(child)) {
          return cloneElement(child, {
            vertical: true,
          });
        }
      })}
    </div>
  );
};
export default ProgressVertical;
