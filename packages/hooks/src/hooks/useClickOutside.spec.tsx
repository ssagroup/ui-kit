import React from 'react';

import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';

import { useClickOutside } from './useClickOutside';

describe('Hook: useClickOutside', () => {
  it('useClickOutside Hook works correctly', () => {
    const mockCallback = jest.fn();
    const mainButtonRef = React.createRef<HTMLButtonElement>();
    const wrapper = (
      <div>
        <button ref={mainButtonRef}>Main button</button>
        <button>Second button</button>
      </div>
    );
    const { rerender } = renderHook(() =>
      useClickOutside(mainButtonRef, mockCallback),
    );
    render(wrapper);
    rerender();

    act(() => {
      fireEvent.mouseDown(screen.getByText('Main button'));
    });

    expect(mockCallback).toBeCalledTimes(0);

    act(() => {
      fireEvent.mouseDown(screen.getByText('Second button'));
    });

    expect(mockCallback).toBeCalledTimes(1);
  });
});
