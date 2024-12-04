import { beforeEach, describe, expect, test } from "vitest";
import StringStream from "../../../utils/string-stream";
import Level from "./level2";
import { readFile } from "fs/promises";
import { testName } from "../../../utils/test-utils";

describe("level2", () => {
  let level: Level;

  beforeEach(async () => {
    const input = new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));
    level = new Level(input);
  });

  test("../example.txt", async () => {
    const output = level.run();
    expect(output).toBe("((4 + (2 * (x - 3))) / 4) = ((32 - 2) * 5)");
  });

  test("../prod.txt", async () => {
    const output = level.run();
    expect(output).toBe(
      "((((4 * (4 * 7)) + ((20 / 2) * (2 * (20 + (3 * 3))))) + (((((((((4 * 2) * 4) + (15 * 9)) * (((((((5 * 5) + 4) * 17) + (((4 * (((2 * ((2 * (5 * 4)) + (5 * 5))) / 5) + (14 + 12))) - (5 + ((7 * 3) + (((((9 * 2) - 1) * 3) / 3) - 2)))) + (((((3 + 4) + (((5 + 7) * 2) + 5)) * ((14 / 2) + (((5 + (1 + 5)) * 3) - 6))) + ((16 + ((2 * 14) + 3)) * 3)) - (((((10 * 3) - (5 + 2)) - (3 * 2)) + (8 * 3)) * 4)))) * (((((2 * ((2 * ((((19 * 2) * (4 + 3)) / (2 + 5)) / 2)) + (((((4 + 3) * 2) * (3 * 3)) + (((3 * 9) + ((13 + 16) + (3 * 11))) * 5)) * 5))) - (((((5 * 3) + 14) * 2) * 2) + (((5 * 2) * (((4 * 9) + (3 * ((7 * 2) / 2))) + (((3 * 3) + (2 * 11)) + 1))) - ((3 * 9) * (2 + 5))))) + (5 * ((((15 + (2 * (2 + 5))) * 13) + ((((3 * 9) * (19 + 4)) + (8 * 5)) - (17 * (3 * 3)))) + ((((5 * 3) - 4) * ((2 * 4) + 3)) + ((((2 * (19 + ((2 * 3) * 3))) + (((2 * ((4 + 3) * ((2 * 3) + 1))) / 2) + 6)) * 3) + (1 + (16 + 13))))))) + ((((5 * ((1 + (2 * 3)) * 5)) + ((2 * ((5 * ((6 + (((12 - 1) * (5 + 2)) + (2 * (2 * ((17 * 2) - 2))))) * 2)) + ((((((9 * 5) + 2) * 2) + 16) + ((3 * (3 * 3)) + ((7 * 2) * 10))) * 7))) / 2)) / 2) + (7 * (14 / 2)))) + ((3 * (3 * (5 + ((1 + 6) + 19)))) * (((3 + 6) * 9) - (((2 + (2 * 3)) + 3) + (2 * 4)))))) + ((2 * (((((2 * (9 + (2 * ((4 * 2) + 3)))) * 4) * (1 + ((5 * (12 + 1)) + (2 * 13)))) - ((((5 * 5) + (10 * 2)) + ((14 * (4 * 2)) / 2)) * ((2 * (13 + ((2 * 3) * 3))) / 2))) + ((18 * 4) * (6 * (2 * 3))))) * ((((17 * 2) * 3) + ((((10 + 10) + ((((2 * 3) + ((2 * 3) + 1)) * 2) + ((2 * ((5 + 2) * 3)) + 15))) * 2) / 2)) + (((7 * 3) + 2) * 13)))) * 2)) + ((12 * (((4 * (((2 + ((5 * (((3 * (5 * 7)) + ((7 * 3) * 5)) / 6)) / 5)) * (5 * 13)) + ((2 * ((((((2 * ((16 / 2) + 3)) * (12 - 2)) + ((8 * (((2 * 4) + (5 + 12)) - (4 + 4))) + ((7 * ((2 * 3) + 1)) * 3))) + ((1 + (2 * (5 + 3))) * 2)) + (((2 * (1 + (5 * 2))) * (4 + (5 * 11))) / 2)) / 2)) * 6))) * (((10 * 12) - (1 + (10 * 3))) * (2 * 13))) - (((2 * ((((((((2 * (((9 + (2 * (1 + 6))) * (((14 * 4) + ((((2 * (5 + 18)) - 3) + (((((17 * 2) + 4) / 2) + 3) * 4)) * 2)) + (5 * 7))) + ((((((2 + 5) * ((5 * 2) - 3)) + (14 - 1)) + (2 + 5)) + (2 * ((((2 * (5 + 2)) + (8 + (((10 + 3) * 2) + 5))) * 3) + (((2 * 4) * (6 + 2)) + (11 * 18))))) * 2))) / 2) * ((3 * 2) + ((4 * 6) / 4))) / 2) + ((5 + (18 * 3)) * (((6 * 2) + 17) + (5 * (2 * (5 * 3)))))) * 3) * 3) + ((((3 * 9) * (2 + 9)) + (((((((2 * 13) * 2) + ((10 * (3 * 7)) + 7)) + ((3 * 7) * 4)) + ((((3 * 3) + 2) * 8) / 2)) * 2) - ((2 * 3) * (((2 * 5) * 2) + 3)))) * ((3 + 4) * (2 * (2 * (6 + 5))))))) + ((2 * (((((6 + 1) * (((((7 * 4) + (((9 * 7) + (8 + 13)) + (7 * 3))) + 4) * (2 * 3)) + ((2 + 5) * (9 + (4 * 11))))) / (2 + 5)) + (9 * (2 * ((12 * (13 + (4 * 5))) + (((4 + (2 * 20)) * 2) - (3 * (5 + 4))))))) * (((7 * 20) + (((3 * 3) * (11 * 5)) + ((((((3 * 2) * 6) + 1) * 17) + ((13 * 3) * (8 * 3))) - (((2 * ((((9 + 8) * 2) - ((11 * 2) / 2)) + 6)) * (5 + 2)) + ((10 * (2 * 4)) + (11 + (5 + (((((3 * 7) + 2) + ((4 * 2) + 3)) + 5) / 3)))))))) / 5))) + (((((2 * (2 * ((16 + 1) * 2))) + (11 + 5)) + ((((((5 + (8 + (2 * 3))) + (18 + 1)) + (16 + 13)) * 2) + ((5 * 5) * 9)) + (((2 * (((3 * 13) + (18 / 2)) + 11)) * 4) + ((8 * 2) * (2 * (5 + 20)))))) * 2) * (2 * (13 * 13))))) + (((((20 + ((2 * 9) * (3 + ((3 * 2) + (2 * 4))))) + (((((2 * 3) * 5) + ((((3 * 3) - 2) * 2) / 2)) * (((((((4 * 5) * (((((3 * 8) + ((2 * (4 + 4)) + 1)) - 10) * 2) / 2)) / 4) / 5) - (2 * 4)) + (5 * ((6 + 5) + 2))) / 4)) + (((3 * 3) * ((3 + (((7 * (4 + 3)) + (((11 * 2) + (2 * 4)) / 3)) * 3)) + (2 * (((5 * 4) - 1) + 4)))) - (((3 + 4) + 6) * ((((((12 * 3) + 1) * 4) * (4 * 4)) / 8) / (2 * 4)))))) * (13 * 5)) + (((((18 + (3 * 5)) - 4) + (11 + ((((((2 * 7) * 2) - (3 + 4)) + 17) * 2) * 2))) + ((19 * 2) / 2)) * ((2 * ((((1 + (2 * (5 + (2 * 3)))) * 2) + (13 * 7)) + (3 * 12))) * 3))) * 3)))) + (5 * ((((((((8 * 15) + (7 * (3 * (3 * 5)))) + (2 * (6 + ((3 * (((5 + 2) * ((3 * 3) - 2)) - 8)) - 20)))) * ((17 + 6) * (5 * (11 * 2)))) + ((((5 * 14) * (4 + (3 * 9))) * ((5 * ((3 * 16) + (((((5 + (2 * (3 + 4))) * 3) + ((5 * (3 * 2)) + 7)) / 2) + 6))) + ((3 + 4) * ((((5 * 20) + ((5 + 4) * 3)) * 4) / 4)))) + ((19 * ((3 * 13) * 3)) * (3 * ((((18 + 12) + 5) * 7) + (4 * (2 * 4))))))) * 3) * ((3 + (1 + (((4 * 2) * (3 * 3)) / 4))) + ((((7 * 3) + 2) * 2) / 2))) + ((((((6 + 3) + (2 * 7)) + ((2 * 4) * 10)) * (((5 * 7) + (2 * ((2 * (2 * (9 + ((5 * 2) * 2)))) - ((7 * 3) / 3)))) + (5 + 13))) * 2) * (((2 * 11) + 19) * (((2 * ((6 * 18) + ((((7 + (3 * (2 * 5))) + 6) - (2 * 3)) + ((15 * (2 + (3 + 4))) + ((6 + 11) + 10))))) / 2) * 2))))))) * 2) * (((7 + (2 * 19)) + 2) * ((3 * 11) + 4))) - (4 * ((((3 * ((3 * (4 + (2 * 5))) + 19)) + (((((4 * 4) * 4) / 2) * 2) + ((((3 * 13) * ((14 / 2) * 3)) + (2 * ((((2 * ((((((5 * 2) + (3 * 11)) + ((3 * 7) + (4 * (2 * ((2 * 4) + 5))))) / (4 * 2)) * (((5 * (((((3 + 20) * 4) * 2) / 8) * (6 + (2 + 5)))) / 5) + (((((((((((18 * ((12 - 3) * 3)) - (17 * (2 + 5))) + ((2 * ((((((((2 * 3) + (2 * (14 - 1))) * ((((4 * 4) * 2) / 4) - 1)) + (((((((19 * 17) + ((((3 * 2) * ((((((20 * ((2 + 5) * 4)) + ((((((3 * (5 * 2)) + ((5 * 5) + ((2 * ((2 + (5 * 7)) + 4)) - ((3 + 4) * 3)))) + ((((((((((((((((3 * (((7 * ((9 * 3) + 4)) + ((5 + 14) * 4)) + (4 * (13 * 3)))) / 3) + (x - (3 * ((((4 + (5 + 2)) * 2) / 2) * 5)))) / 2) + 1) * ((2 * (15 + 2)) * 2)) - (((2 + ((((9 + ((19 - 4) - 5)) * 2) + (2 * 3)) + (1 + 12))) + ((((9 * 15) + ((7 * 3) * 4)) + (20 * (2 * 5))) - (3 * ((9 + (2 * 19)) - 4)))) + (((2 * (4 + (5 + 2))) * (3 * 3)) - ((((5 * 5) - 2) + 6) * 2)))) * 2) + (((((7 * (8 + (10 + 1))) + (11 * (10 + 1))) / 2) + (2 * (((9 + 2) + ((3 * (3 * 3)) - 9)) * 2))) * 3)) / 5) - (((3 * 12) + ((4 + (3 + 10)) * 11)) * 4)) * 2) + (3 * ((2 * ((16 * 5) + (((7 * 2) / 2) * 3))) + ((((7 * (1 + (3 + 3))) + (2 * ((4 + 3) + 4))) - (6 + 11)) / 2)))) / 5) - ((7 + (2 * 8)) * (17 + 5))) * 2)) / 2) - (15 + (((((14 + 1) + 1) * 7) / (2 * 4)) * 4))) / 2)) * 10) - ((2 * (((((5 * 2) + 9) * 3) + (2 * (5 * (5 * 5)))) + ((3 * 3) * (2 * 5)))) / 2)) / 9) + ((((((((5 + 9) + 5) * (1 + 12)) + (((3 * 2) + ((4 + (2 * 16)) + (((4 * 8) * (3 * 2)) - ((20 * (2 * 3)) / 2)))) + 7)) / 2) + ((12 + (((2 * 11) + (5 * 5)) - 10)) - 12)) * 4) - (((2 * (((4 + ((((4 * (3 * 2)) - 7) - 4) * 2)) + (8 - 1)) * 2)) / 2) * 3)))) - (((3 * 9) * (4 * 2)) + (11 * 3))) / 3)) * 3) + ((3 * (11 * 2)) + (13 * 8))) / 2) - (2 * ((((3 + 4) + 10) + ((7 * 4) + (2 * (7 * 2)))) * 3))) * 3)) / 4) - (10 * 16)) * 4) + (((4 + (((3 * (13 + (3 * 2))) * 8) / (4 * 2))) + ((5 + (3 * 2)) * 2)) * 3))) - ((((3 * ((((11 * (13 * 3)) - ((((((1 + 16) * 3) / 3) - 5) * (7 * 7)) / (2 * 3))) * 3) / 3)) + (((2 + (3 * 3)) * 3) * (7 * 7))) / 2) - (((3 * 3) * 3) * (1 + ((3 + (3 * 6)) - 6)))))) / 12) + ((1 + ((6 + 1) * 4)) * ((7 * 3) + 2))) + (7 * (((3 * 2) * (2 * 4)) + (((2 * 11) / 2) * 2)))) / 3) - (((3 * (((12 + 5) * 3) + ((((5 * ((((5 * 2) * 2) + (((11 + 2) * 2) + 1)) - 6)) + (3 * ((4 + 9) + (4 * 4)))) + (5 * ((2 * 16) + (3 * 13)))) - (11 + ((((((2 * 3) + 1) * 2) / 2) + (5 * 8)) * 2))))) - ((2 * (4 + 9)) * 20)) - ((3 * ((((3 * 4) + (8 + 3)) + 1) - 1)) * 4))) * 5) - (((((2 * 3) * 3) + 4) + 8) * ((3 * 8) + ((6 * 5) / 5)))) / 5))) - (15 * ((((((14 / 2) * 2) + 9) * 2) + 11) - (5 + (4 * 2)))))) + ((3 * (((1 + (2 * 5)) * ((((4 * ((2 * 4) * 2)) / 2) - 4) / 4)) + 2)) + ((((((((((2 * (((5 * 5) - 2) + (4 + 2))) / 2) * 2) + ((3 * 2) * 4)) + 4) / 2) * 2) / 2) * 3) * 2))) / 3) - ((18 + 5) * ((3 + 3) + 4))))) / 3))) / 2) - (3 * (5 + ((14 + 17) * 2)))))) * 2)) / 4) = (((((((((((((((((((5 * 5) * 2) / 2) - 8) + (5 * 2)) + 2) * 2) * 4) + (19 + (((2 * (17 + (2 * 3))) + 10) / 2))) - (((5 * 5) + ((3 * 2) * 3)) * 2)) * 2) * ((3 + 8) + 3)) - (5 * ((((3 * 3) * 5) + ((10 + 9) * 2)) * 4))) + (7 * (((6 * (3 * 9)) / (2 * 3)) + 4))) * 2) + (((4 * (2 * (1 + (6 * 2)))) / ((5 * 2) - 2)) * (((4 + 9) * 19) + (((5 + 2) + 3) * (6 + 1))))) * (((2 * (2 * (((14 + 5) * 4) + ((4 * 11) + ((4 + (2 * (1 + 6))) + 11))))) + (((2 * 11) + 2) + (2 * ((3 + 4) * 3)))) / 2)) * 2) * ((((14 * 2) + (3 * 9)) + (((((((((((9 * (((5 + (2 * 3)) * 2) / 2)) + 2) + 7) + (2 * 13)) + ((((2 * 4) + (13 + (3 * 7))) - (2 + 12)) + 1)) + ((4 * 11) - (3 + 9))) + (6 * (3 * 3))) + (17 * ((7 * 3) + 8))) / 2) - ((3 * 11) + 1)) + ((9 * 7) + 8))) * (((((2 * 19) * (6 * 2)) + ((11 + 2) * ((2 * (3 * 9)) + (3 + 4)))) * 2) + (((18 * (((2 + (3 * 3)) * 2) + (((7 * 5) + 5) + (18 + (((2 * ((5 * 5) + 4)) + (1 + 12)) - 12))))) / (2 * 3)) + ((((12 * 5) + 13) * 3) * 6)))))",
    );
  });
});
