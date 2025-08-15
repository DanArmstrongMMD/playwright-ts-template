/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from '@playwright/test';

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
        console.log(`[STEP]: ${stepName}`);
        return await target.call(this, ...args);
      });
    };
  };
}

export function action(nameOrFn: string | ((...args: any[]) => string)) {
  return function <T extends (...args: any[]) => any>(target: T): T {
    return function (this: any, ...args: any[]) {
      const action = typeof nameOrFn === 'function' ? nameOrFn.apply(this, args) : nameOrFn;
      console.log(`[ACTION]: ${action}`);
      return target.apply(this, args);
    } as T;
  };
}
