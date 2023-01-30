import Level from "../../../utils/level";

interface Packet {
  readonly version: number;
}

class LiteralPacket implements Packet {
  public readonly version;
  public readonly value;

  public constructor(version: number, value: number) {
    this.version = version;
    this.value = value;
  }
}

class OperatorPacket implements Packet {
  public readonly version;
  public readonly subpackets;

  public constructor(version: number) {
    this.version = version;
    this.subpackets = new Array<Packet>();
  }
}

class PacketParser {
  private readonly bits;

  public constructor(bits: string) {
    this.bits = bits.split("");
  }

  private readBits(bits: number) {
    return this.bits.splice(0, bits).join("");
  }

  private parseBits(bits: number) {
    return parseInt(this.readBits(bits), 2);
  }

  public hasNext() {
    return !!this.bits.length;
  }

  public next(): Packet {
    const version = this.parseBits(3);
    const typeId = this.parseBits(3);
    if (typeId === 4) return this.parseLiteralPacket(version);
    else return this.parseOperatorPacket(version);
  }

  private parseLiteralPacket(version: number): LiteralPacket {
    let value = "";
    while (this.parseBits(1)) value += this.readBits(4);
    value += this.readBits(4);
    return new LiteralPacket(version, parseInt(value, 2));
  }

  private parseOperatorPacket(version: number): OperatorPacket {
    const lengthTypeId = this.parseBits(1);
    const packet = new OperatorPacket(version);
    if (lengthTypeId === 0) {
      const subpacketParser = new PacketParser(this.readBits(this.parseBits(15)));
      while (subpacketParser.hasNext()) packet.subpackets.push(subpacketParser.next());
    } else {
      const numberOfSubpackets = this.parseBits(11);
      for (let i = 0; i < numberOfSubpackets; i++) packet.subpackets.push(this.next());
    }
    return packet;
  }
}

export default class extends Level {
  private readonly xtob = new Map<string, string>([
    ["0", "0000"],
    ["1", "0001"],
    ["2", "0010"],
    ["3", "0011"],
    ["4", "0100"],
    ["5", "0101"],
    ["6", "0110"],
    ["7", "0111"],
    ["8", "1000"],
    ["9", "1001"],
    ["A", "1010"],
    ["B", "1011"],
    ["C", "1100"],
    ["D", "1101"],
    ["E", "1110"],
    ["F", "1111"],
  ]);

  public run() {
    const bits = this.input
      .readLine()!
      .split("")
      .map((hex) => this.xtob.get(hex))
      .join("");

    const packet = new PacketParser(bits).next();

    const allPackets = [];
    const queue = [packet];
    while (queue.length) {
      const current = queue.pop()!;
      allPackets.push(current);
      if (current instanceof OperatorPacket) queue.push(...current.subpackets);
    }

    return allPackets.reduce((sum, packet) => sum + packet.version, 0);
  }
}
