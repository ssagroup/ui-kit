import '@testing-library/jest-dom/extend-expect';
import { createSerializer, matchers } from '@emotion/jest';

import { initRender } from './customTest';
import { mainTheme } from '@ssa-ui-kit/core';

const customRender = initRender(mainTheme);

declare global {
  // eslint-disable-next-line no-var
  var render: typeof customRender;
}

global.render = customRender;

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);

window.URL.createObjectURL = jest.fn();
window.HTMLCanvasElement.prototype.getContext = jest.fn();
