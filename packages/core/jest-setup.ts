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

import { createSerializer, matchers } from '@emotion/jest';

import theme from '@themes/main';

import { initRender } from './customTest';

const customRender = initRender(theme);

declare global {
  // eslint-disable-next-line no-var
  var render: typeof customRender;
}

global.render = customRender;

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);
