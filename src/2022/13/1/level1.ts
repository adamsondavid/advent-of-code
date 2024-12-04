import Level from "../../../utils/level";
import Packet, { compare } from "../packet";

type Pair = {
  readonly left: Packet;
  readonly right: Packet;
};

export default class extends Level {
  public run() {
    const pairs: Pair[] = [];

    let line;
    while ((line = this.input.readLine()) !== undefined) {
      if (line === "") continue;
      pairs.push({
        left: JSON.parse(line),
        right: JSON.parse(this.input.readLine()!),
      });
    }

    const filteredPackets = pairs.filter((pair) => compare(pair.left, pair.right) === -1);
    return filteredPackets.map((pair) => pairs.indexOf(pair) + 1).reduce((a, b) => a + b, 0);
  }
}
