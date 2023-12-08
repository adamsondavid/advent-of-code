import { describe, expect, test } from "vitest";
import StringStream from "../../../utils/string-stream";
import { solve } from "./level2";
import { readFile } from "fs/promises";
import { testName } from "../../../utils/test-utils";

describe("level2", () => {
  const readInput = async () => new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));

  test("example.txt", async () => {
    const input = await readInput();
    const output = solve(input);
    expect(output).toEqual({
      solution: "lcm(2,3)",
      nodes: [
        {
          start: "11A",
          end: "11Z",
          steps: 2,
        },
        {
          start: "22A",
          end: "22Z",
          steps: 3,
        },
      ],
    });
  });

  test("../prod.txt", async () => {
    const input = await readInput();
    const output = solve(input);
    expect(output).toEqual({
      solution: "lcm(18961,12169,17263,13301,14999,16697)",
      nodes: [
        {
          start: "BGA",
          end: "LCZ",
          steps: 18961,
        },
        {
          start: "SLA",
          end: "LQZ",
          steps: 12169,
        },
        {
          start: "PTA",
          end: "SNZ",
          steps: 17263,
        },
        {
          start: "AAA",
          end: "ZZZ",
          steps: 13301,
        },
        {
          start: "XJA",
          end: "PDZ",
          steps: 14999,
        },
        {
          start: "JNA",
          end: "PBZ",
          steps: 16697,
        },
      ],
    });
  });
});
