import StringStream from "../../../utils/string-stream";
import { z } from "zod";

const Passport = z.object({
  birthYear: z.number().min(1920).max(2002),
  issueYear: z.number().min(2010).max(2020),
  expirationYear: z.number().min(2020).max(2030),
  height: z.discriminatedUnion("unit", [
    z.object({
      unit: z.literal("in"),
      value: z.number().min(59).max(76),
    }),
    z.object({
      unit: z.literal("cm"),
      value: z.number().min(150).max(193),
    }),
  ]),
  hairColor: z.string().regex(/#[0-9a-f]{6}/),
  eyeColor: z.union([
    z.literal("amb"),
    z.literal("blu"),
    z.literal("brn"),
    z.literal("gry"),
    z.literal("grn"),
    z.literal("hzl"),
    z.literal("oth"),
  ]),
  passportId: z.string().regex(/[0-9]{9}/),
});

export function solve(input: StringStream) {
  return input
    .readLines()
    .join("\n")
    .split("\n\n")
    .map((line) => Object.fromEntries(line.split(/ |\n/g).map((field) => field.split(":"))))
    .map((passport) => ({
      birthYear: parseInt(passport.byr),
      issueYear: parseInt(passport.iyr),
      expirationYear: parseInt(passport.eyr),
      height: {
        unit: passport.hgt?.endsWith("cm") ? "cm" : passport.hgt?.endsWith("in") ? "in" : undefined,
        value: parseInt(passport.hgt?.match(/\d+/)[0]!),
      },
      hairColor: passport.hcl,
      eyeColor: passport.ecl,
      passportId: passport.pid,
    }))
    .map((passport) => Passport.safeParse(passport))
    .filter((validationResult) => validationResult.success).length;
}
