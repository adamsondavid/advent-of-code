import { describe, expect, test } from "vitest";
import { solve } from "./level1";
import { useProdInput } from "../../../utils/test-utils";

describe("level1", () => {
  test("../example.txt", async () => {
    const input = await useProdInput(__dirname);
    const output = solve(input, 12, 6);
    expect(output).toBe(22);
  });

  test("../prod.txt", async () => {
    const input = await useProdInput(__dirname);
    const output = solve(input, 1024, 70);
    expect(output).toBe(310);
  });
});
