import StringStream from "../../../utils/string-stream";

function isSafe(level: number[]) {
  const allIncreasing = level.slice(1).every((_, i) => level[i + 1] > level[i]);
  const allDecreasing = level.slice(1).every((_, i) => level[i + 1] < level[i]);
  const diffs = level.slice(1).map((_, i) => Math.abs(level[i + 1] - level[i]));
  const minDiff = Math.min(...diffs);
  const maxDiff = Math.max(...diffs);
  return (allDecreasing || allIncreasing) && minDiff >= 1 && maxDiff <= 3;
}

export function solve(input: StringStream) {
  const levels = input
    .readLines()
    .map((line) => line.split(" ").map(Number))
    .map((level) => {
      if (isSafe(level)) return true;
      for (let i = 0; i < level.length; i++) {
        const levelCpy = [...level];
        levelCpy.splice(i, 1);
        if (isSafe(levelCpy)) return true;
      }
      return false;
    });
  return levels.filter((safe) => safe).length;
}
