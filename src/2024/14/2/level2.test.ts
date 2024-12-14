import { describe, expect, test } from "vitest";
import { solve } from "./level2";
import { useProdInput } from "../../../utils/test-utils";

describe("level2", () => {
  test("../prod.txt", async () => {
    const input = await useProdInput(__dirname);
    const output = solve(input, 101, 103);
    expect(output).toBe(7037);
  });
});
