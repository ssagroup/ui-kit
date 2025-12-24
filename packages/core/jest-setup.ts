import { TextEncoder } from 'node:util';

// https://github.com/remix-run/react-router/issues/12363
global.TextEncoder = TextEncoder;

import '@testing-library/jest-dom';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
URL.createObjectURL = jest.fn();
HTMLCanvasElement.prototype.getContext = jest.fn();

// Suppress expected console errors and warnings from third-party libraries during tests
const originalError = console.error;
const originalWarn = console.warn;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const message = typeof args[0] === 'string' ? args[0] : String(args[0]);

    // Suppress @react-input/mask validation errors during typing
    // These are expected when users type partial dates (intermediate states)
    if (
      message.includes(
        'An invalid character was found in the initialized property value',
      ) ||
      message.includes(
        'The initialized value of the `value` or `defaultValue` property is longer',
      ) ||
      message.includes(
        'To initialize an unmasked value, use the `format` utility',
      )
    ) {
      return;
    }

    // Suppress jsdom navigation errors - jsdom doesn't fully implement navigation
    // This is a known limitation and doesn't affect test correctness
    // The error can appear as a string message or as an Error object
    if (
      message.includes('Not implemented: navigation') ||
      (typeof args[0] === 'object' &&
        args[0] !== null &&
        'type' in args[0] &&
        (args[0] as { type?: string }).type === 'not implemented' &&
        (message.includes('navigation') ||
          ('message' in args[0] &&
            typeof (args[0] as { message?: string }).message === 'string' &&
            (args[0] as { message?: string }).message?.includes(
              'navigation',
            )) ||
          String(args[0]).includes('navigation')))
    ) {
      return;
    }

    originalError.call(console, ...args);
  };

  console.warn = (...args: unknown[]) => {
    const message = typeof args[0] === 'string' ? args[0] : String(args[0]);

    // Suppress Input/Textarea component warnings about missing Form context
    // These are expected in tests where components are tested in isolation
    // Note: Tests that specifically verify this warning use spies, so they still work
    if (
      message.includes(
        'Input component must be used within a Form component',
      ) ||
      message.includes(
        'Textarea component must be used within a Form component',
      )
    ) {
      return;
    }

    // Suppress React controlled/uncontrolled input warnings
    // These are common in tests when components initialize with undefined values
    // and then receive defined values, which is expected behavior during component mounting
    if (
      message.includes(
        'A component is changing an uncontrolled input to be controlled',
      ) ||
      message.includes(
        'A component is changing a controlled input to be uncontrolled',
      )
    ) {
      return;
    }

    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

import { createSerializer, matchers } from '@emotion/jest';

import { initRender } from './customTest';
import theme from '@themes/main';

const customRender = initRender(theme);

declare global {
  var render: typeof customRender;
}

global.render = customRender;

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);
