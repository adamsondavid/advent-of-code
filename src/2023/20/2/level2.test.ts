import { describe, expect, test } from "vitest";
import StringStream from "../../../utils/string-stream";
import { solve } from "./level2";
import { readFile } from "fs/promises";
import { testName } from "../../../utils/test-utils";

describe("level2", () => {
  const readInput = async () => new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));

  test("../prod.txt", async () => {
    const input = await readInput();
    const output = solve(input);
    expect(output).toBe("lcm(3739, 3821, 3943, 4001)");
  });
});
