import { expect } from "vitest";

export function testName() {
  return expect.getState().currentTestName!.split(" ").at(-1);
}
