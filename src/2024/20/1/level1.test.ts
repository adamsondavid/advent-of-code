import { describe, expect, test } from "vitest";
import { solve } from "./level1";
import { useInput, useProdInput } from "../../../utils/test-utils";

describe("level1", () => {
  test("../example.txt", async () => {
    const input = await useInput(__dirname);
    const output = solve(input, 1);
    expect(output).toBe(44);
  });

  test("../prod.txt", async () => {
    const input = await useProdInput(__dirname);
    const output = solve(input, 100);
    expect(output).toBe(1448);
  });
});
