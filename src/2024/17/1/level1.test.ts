import { describe, expect, test } from "vitest";
import { runProgram, solve } from "./level1";
import { useInput, useProdInput } from "../../../utils/test-utils";

describe("level1", () => {
  test("../example.txt", async () => {
    const input = await useInput(__dirname);
    const output = solve(input);
    expect(output).toBe("4,6,3,5,6,3,5,2,1,0");
  });

  test("../prod.txt", async () => {
    const input = await useProdInput(__dirname);
    const output = solve(input);
    expect(output).toBe("1,2,3,1,3,2,5,3,1");
  });

  test("program 2,6 with c=9", () => {
    const registers = { a: 0, b: 0, c: 9 };
    runProgram([2, 6], registers);
    expect(registers.b).toBe(1);
  });

  test("program 5,0,5,1,5,4 with a=10", () => {
    const registers = { a: 10, b: 0, c: 0 };
    const stdout = runProgram([5, 0, 5, 1, 5, 4], registers);
    expect(stdout).toEqual([0, 1, 2]);
  });

  test("program 0,1,5,4,3,0 with a=2024", () => {
    const registers = { a: 2024, b: 0, c: 0 };
    const stdout = runProgram([0, 1, 5, 4, 3, 0], registers);
    expect(registers.a).toBe(0);
    expect(stdout).toEqual([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);
  });

  test("program 1,7 with b=29", () => {
    const registers = { a: 0, b: 29, c: 0 };
    runProgram([1, 7], registers);
    expect(registers.b).toBe(26);
  });

  test("program 1,7 with b=2024 and c=43690", () => {
    const registers = { a: 0, b: 2024, c: 43690 };
    runProgram([4, 0], registers);
    expect(registers.b).toBe(44354);
  });
});
