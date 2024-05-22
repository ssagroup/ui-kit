import '@testing-library/jest-dom/expect';
import { mainTheme } from '@ssa-ui-kit/core';
import { createSerializer, matchers } from '@emotion/jest';

import { initRender } from './customTest';

const customRender = initRender(mainTheme);

declare global {
  // eslint-disable-next-line no-var
  var render: typeof customRender;
}

global.render = customRender;

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);
