import { expect } from "@jest/globals";

export function testName() {
  return expect.getState().currentTestName!.split(" ").at(-1);
}
