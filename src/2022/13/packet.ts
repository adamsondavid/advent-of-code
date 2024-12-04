type Packet = number | Array<Packet>;
export default Packet;

export function compare(a: Packet, b: Packet): number {
  if (typeof a === "number" && typeof b === "number") {
    if (a === b) return 0;
    if (a < b) return -1;
    if (a > b) return 1;
  }

  if (typeof a === "number") a = [a];
  if (typeof b === "number") b = [b];

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] === undefined) return -1;
    if (b[i] === undefined) return 1;
    const result = compare(a[i], b[i]);
    if (result !== 0) return result;
  }

  return 0;
}
