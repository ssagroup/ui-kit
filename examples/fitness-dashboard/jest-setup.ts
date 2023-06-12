import '@testing-library/jest-dom/extend-expect';
import { createSerializer, matchers } from '@emotion/jest';

import { themes } from '@ssa-ui-kit/core';
import { customTest } from '@ssa-ui-kit/utils';

const customRender = customTest.initRender(themes.main);

declare global {
  // eslint-disable-next-line no-var
  var render: typeof customRender;
}

global.render = customRender;

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);
