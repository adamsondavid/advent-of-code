import { describe, expect, test } from "vitest";
import { solve } from "./level2";
import { useInput, useProdInput } from "../../../utils/test-utils";

describe("level2", () => {
  test("../example.txt", async () => {
    const input = await useInput(__dirname);
    const output = solve(input, 50);
    expect(output).toBe(285);
  });

  test("../prod.txt", async () => {
    const input = await useProdInput(__dirname);
    const output = solve(input, 100);
    expect(output).toBe("TODO");
  });
});
