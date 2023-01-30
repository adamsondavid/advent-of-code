import Level from "../../../utils/level";

interface Packet {
  readonly version: number;
  readonly value: number;
}

class LiteralPacket implements Packet {
  public readonly version;
  public readonly value;

  public constructor(version: number, value: number) {
    this.version = version;
    this.value = value;
  }
}

abstract class OperatorPacket implements Packet {
  public readonly version;
  public readonly subpackets;
  public abstract value: number;

  public constructor(version: number) {
    this.version = version;
    this.subpackets = new Array<Packet>();
  }
}

class SumPacket extends OperatorPacket {
  public constructor(version: number) {
    super(version);
  }

  public get value() {
    return this.subpackets.map((subpacket) => subpacket.value).reduce((sum, value) => sum + value, 0);
  }
}

class ProductPacket extends OperatorPacket {
  public constructor(version: number) {
    super(version);
  }

  public get value() {
    return this.subpackets.map((subpacket) => subpacket.value).reduce((sum, value) => sum * value, 1);
  }
}

class MinimumPacket extends OperatorPacket {
  public constructor(version: number) {
    super(version);
  }

  public get value() {
    return Math.min(...this.subpackets.map((subpacket) => subpacket.value));
  }
}

class MaximumPacket extends OperatorPacket {
  public constructor(version: number) {
    super(version);
  }

  public get value() {
    return Math.max(...this.subpackets.map((subpacket) => subpacket.value));
  }
}

class GreaterThanPacket extends OperatorPacket {
  public constructor(version: number) {
    super(version);
  }

  public get value() {
    return this.subpackets[0].value > this.subpackets[1].value ? 1 : 0;
  }
}

class LessThanPacket extends OperatorPacket {
  public constructor(version: number) {
    super(version);
  }

  public get value() {
    return this.subpackets[0].value < this.subpackets[1].value ? 1 : 0;
  }
}

class EqualToPacket extends OperatorPacket {
  public constructor(version: number) {
    super(version);
  }

  public get value() {
    return this.subpackets[0].value === this.subpackets[1].value ? 1 : 0;
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
    else return this.parseOperatorPacket(version, typeId);
  }

  private parseLiteralPacket(version: number): LiteralPacket {
    let value = "";
    while (this.parseBits(1)) value += this.readBits(4);
    value += this.readBits(4);
    return new LiteralPacket(version, parseInt(value, 2));
  }

  private parseOperatorPacket(version: number, typeId: number): OperatorPacket {
    const lengthTypeId = this.parseBits(1);

    let packet: OperatorPacket;
    if (typeId === 0) packet = new SumPacket(version);
    else if (typeId === 1) packet = new ProductPacket(version);
    else if (typeId === 2) packet = new MinimumPacket(version);
    else if (typeId === 3) packet = new MaximumPacket(version);
    else if (typeId === 5) packet = new GreaterThanPacket(version);
    else if (typeId === 6) packet = new LessThanPacket(version);
    else if (typeId === 7) packet = new EqualToPacket(version);
    else throw new Error("unknown typeId: " + typeId);

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
    return packet.value;
  }
}
