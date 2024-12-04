import { describe, expect, test } from "vitest";
import { solve } from "./level1";
import { useInput, useProdInput } from "../../../utils/test-utils";

describe("level1", () => {
  test("../example.txt", async () => {
    const input = await useInput(__dirname);
    const output = solve(input);
    expect(output).toBe(161);
  });

  test("../prod.txt", async () => {
    const input = await useProdInput(__dirname);
    const output = solve(input);
    expect(output).toBe(171183089);
  });
});
