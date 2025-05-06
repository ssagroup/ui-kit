import { TextEncoder } from 'node:util';

// https://github.com/remix-run/react-router/issues/12363
global.TextEncoder = TextEncoder;

import '@testing-library/jest-dom';

URL.createObjectURL = jest.fn();
HTMLCanvasElement.prototype.getContext = jest.fn();

import { createSerializer, matchers } from '@emotion/jest';
import { mainTheme } from '@ssa-ui-kit/core';
import { initRender } from './customTest';

const customRender = initRender(mainTheme);

declare global {
  // eslint-disable-next-line no-var
  var render: typeof customRender;
}

global.render = customRender;

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);
