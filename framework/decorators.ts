/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from './fixtures';

export function step(nameOrFn: string | ((...args: any[]) => string)) {
  return function (target: Function) {
    return function replacementMethod(this: any, ...args: any[]) {
      let stepName: string;
      if (typeof nameOrFn === 'function') {
        stepName = nameOrFn.apply(this, args);
      } else {
        stepName = nameOrFn;
      }
      return test.step(stepName, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
