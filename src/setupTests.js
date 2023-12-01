// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import {TextDecoder, TextEncoder} from 'node:util';

Object.defineProperties(globalThis, {
  TextDecoder: {value: TextDecoder},
  TextEncoder: {value: TextEncoder},
});

import {Blob, File} from 'node:buffer';

Object.defineProperties(globalThis, {
  fetch: {value: fetch, writable: true},
  Blob: {value: Blob},
  File: {value: File},
  Headers: {value: Headers},
  FormData: {value: FormData},
  Request: {value: Request},
  Response: {value: Response},
});
