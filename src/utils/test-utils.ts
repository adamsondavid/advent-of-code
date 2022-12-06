import { expect } from "@jest/globals";

export function testName() {
  return expect.getState().currentTestName!.split(" ").at(-1);
}

export function testLevel(dirname: string) {
  const splittedPath = dirname.split(/[/\\]/);
  return splittedPath.slice(splittedPath.length - 3);
}
