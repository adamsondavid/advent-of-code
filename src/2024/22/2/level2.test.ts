import { describe, expect, test } from "vitest";
import { solve } from "./level2";
import { useInput, useProdInput } from "../../../utils/test-utils";

describe("level2", () => {
  test("../example2.txt", async () => {
    const input = await useInput(__dirname);
    const output = solve(input);
    expect(output).toBe(23);
  });

  test("../prod.txt", async () => {
    const input = await useProdInput(__dirname);
    const output = solve(input);
    expect(output).toBe(2223);
  });
});
