import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  return input
    .readLines()
    .join("\n")
    .split("\n\n")
    .map((line) => Object.fromEntries(line.split(/ |\n/g).map((field) => field.split(":"))))
    .map((p) => !!(p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid))
    .filter((valid) => valid).length;
}
