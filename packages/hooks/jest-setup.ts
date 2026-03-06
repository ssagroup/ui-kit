import { TextEncoder } from 'node:util';

// https://github.com/remix-run/react-router/issues/12363
global.TextEncoder = TextEncoder;

import '@testing-library/jest-dom';

URL.createObjectURL = jest.fn();
HTMLCanvasElement.prototype.getContext = jest.fn();
