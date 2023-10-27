import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTextSizeDecrease } from './useTextSizeDecrease';

const TestComponent = () => {
  const ref = useTextSizeDecrease();

  return (
    <div style={{ width: '50px' }}>
      <p
        style={{ fontSize: '16px' }}
        ref={ref as unknown as React.RefObject<HTMLParagraphElement>}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );
};

describe('Hook: useTextSizeDecrease', () => {
  beforeAll(() => {
    /**
     * The ability to calculate where elements will be visually laid out as a
     * result of CSS is currently outside the scope of jsdom.
     *
     * https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform
     * */
    Object.defineProperty(HTMLParagraphElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', {
      configurable: true,
      value: 50,
    });
  });

  it("Decreases element's font size", () => {
    render(<TestComponent />);

    const p = screen.getByRole('paragraph');
    expect(p).toHaveStyle(`font-size: 11px`);
    expect(p).toHaveStyle('word-break: break-all');
  });
});
