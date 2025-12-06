import StringStream from "../../../utils/string-stream";

function transpose<T>(matrix: Array<Array<T>>) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

export function solve(input: StringStream) {
  const cells = transpose(input.readLines().map((line) => line.split("")))
    .map((col) => col.join("").replaceAll(" ", ""))
    .filter(Boolean);

  let op = "";
  let acc = 0;
  let res = 0;
  for (const cell of cells) {
    if (cell.endsWith("+") || cell.endsWith("*")) {
      res += acc;
      acc = Number(cell.substring(0, cell.length - 1));
      op = cell[cell.length - 1];
    } else {
      if (op === "*") acc *= Number(cell);
      if (op === "+") acc += Number(cell);
    }
  }
  res += acc;

  return res;
}
