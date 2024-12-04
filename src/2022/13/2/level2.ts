import Level from "../../../utils/level";
import Packet, { compare } from "../packet";

export default class extends Level {
  public run() {
    const dividerPacketA: Packet = [[2]];
    const dividerPacketB: Packet = [[6]];
    const packets: Packet[] = [dividerPacketA, dividerPacketB];

    let line;
    while ((line = this.input.readLine()) !== undefined) {
      if (line === "") continue;
      packets.push(JSON.parse(line), JSON.parse(this.input.readLine()!));
    }

    const sortedPackets = packets.sort(compare);
    return (sortedPackets.indexOf(dividerPacketA) + 1) * (sortedPackets.indexOf(dividerPacketB) + 1);
  }
}
