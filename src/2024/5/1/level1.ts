import StringStream from "../../../utils/string-stream";

export function solve(_input: StringStream) {
  const input = _input.readLines().join("\n").split("\n\n");
  const pageOrderingRules = input[0]
    .split("\n")
    .map((line) => line.split("|"))
    .reduce((pageOrderingRules, rule) => {
      if (!pageOrderingRules.has(rule[0])) pageOrderingRules.set(rule[0], []);
      pageOrderingRules.get(rule[0])!.push(rule[1]);
      return pageOrderingRules;
    }, new Map<string, string[]>());
  const pages = input[1].split("\n").map((line) => line.split(","));

  function isPageSorted(report: string[]) {
    for (let i = 0; i < report.length; i++) {
      const num = report[i];
      for (const following of report.slice(i + 1)) {
        if (!pageOrderingRules.get(num)?.includes(following)) return false;
      }
    }
    return true;
  }

  let res = 0;
  for (const page of pages) {
    if (isPageSorted(page)) res += Number(page[Math.floor(page.length / 2)]);
  }
  return res;
}
