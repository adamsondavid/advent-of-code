import { describe, expect, test } from "vitest";
import StringStream from "../../../utils/string-stream";
import { MapperForMultipleRanges, solve } from "./level2";
import { readFile } from "fs/promises";
import { testName } from "../../../utils/test-utils";

describe("level2", () => {
  const readInput = async () => new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));

  test("../example.txt", async () => {
    const input = await readInput();
    const output = solve(input);
    expect(output).toBe(46);
  });

  test("../prod.txt", async () => {
    const input = await readInput();
    const output = solve(input);
    expect(output).toBe(137516820);
  });

  test("MapperForMultipleRanges", () => {
    const mapper = new MapperForMultipleRanges("", [
      { range: { from: 10, to: 20 }, offset: 5 },
      { range: { from: 80, to: 90 }, offset: 5 },
    ]);

    expect(mapper.map({ from: 0, to: 100 })).toEqual([
      { from: 0, to: 9 },
      { from: 15, to: 25 },
      { from: 21, to: 79 },
      { from: 85, to: 95 },
      { from: 91, to: 100 },
    ]);

    expect(mapper.map({ from: 10, to: 20 })).toEqual([{ from: 15, to: 25 }]);

    expect(mapper.map({ from: 12, to: 16 })).toEqual([{ from: 17, to: 21 }]);

    expect(mapper.map({ from: 10, to: 30 })).toEqual([
      { from: 15, to: 25 },
      { from: 21, to: 30 },
    ]);
  });
});
