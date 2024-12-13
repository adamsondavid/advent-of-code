import { describe, expect, test } from "vitest";
import { solve } from "./level2";
import { useInput, useProdInput } from "../../../utils/test-utils";

describe("level2", () => {
  test("../example.txt", async () => {
    const input = await useInput(__dirname);
    const output = await solve(input);
    expect(output).toBe(875318608908);
  });

  test(
    "../prod.txt",
    async () => {
      const input = await useProdInput(__dirname);
      const output = await solve(input);
      expect(output).toBe(85527711500010);
    },
    { timeout: Infinity },
  );
});
