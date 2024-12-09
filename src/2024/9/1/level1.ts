import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const digits = input.readLine()!.split("").map(Number);

  const fs: string[] = [];

  let fileId = 0;
  for (let i = 0; i < digits.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < digits[i]; j++) fs.push(fileId.toString());
      fileId++;
    } else for (let j = 0; j < digits[i]; j++) fs.push(".");
  }

  for (let i = 0; i < fs.length; i++) {
    if (fs[i] === ".") {
      let fileFromBack = ".";
      while (fileFromBack === ".") fileFromBack = fs.pop()!;
      fs[i] = fileFromBack;
    }
  }

  return fs.map(Number).reduce((checksum, fileId, position) => checksum + fileId * position, 0);
}
