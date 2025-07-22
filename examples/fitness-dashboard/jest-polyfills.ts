/**
 * Early polyfills for Jest environment
 * This file is loaded via setupFiles in Jest config
 */

// Polyfill TextEncoder and TextDecoder for Node.js environment
if (typeof global.TextEncoder === 'undefined') {
  const util = eval('require')('util');
  global.TextEncoder = util.TextEncoder;
  global.TextDecoder = util.TextDecoder;
}
