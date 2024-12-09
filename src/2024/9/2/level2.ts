import StringStream from "../../../utils/string-stream";

export function solve(_input: StringStream) {
  const input = _input.readLine()!.split("").map(Number);

  const files: { start: number; size: number; fileId: number }[] = [];
  const spaces: { start: number; size: number }[] = [];

  let fileId = 0;
  let fsSize = 0;
  for (let i = 0; i < input.length; i++) {
    const size = input[i];
    if (i % 2 === 0) files.push({ start: fsSize, size, fileId: fileId++ });
    else spaces.push({ start: fsSize, size });
    fsSize += size;
  }

  let res = 0;
  for (const file of files.toReversed()) {
    const space = spaces.filter((space) => space.start < file.start).find((space) => space.size >= file.size);
    if (space) {
      file.start = space.start;
      space.size -= file.size;
      space.start += file.size;
    }
    for (let i = 0; i < file.size; i++) {
      res += file.fileId * (file.start + i);
    }
  }
  return res;
}
