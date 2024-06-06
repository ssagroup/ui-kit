import '@testing-library/jest-dom';
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
