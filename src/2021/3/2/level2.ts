import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const numbers = this.input.readLines();

    let oNumbers = [...numbers];
    let co2Numbers = [...numbers];

    for (let bitPosition = 0; oNumbers.length !== 1 && bitPosition < oNumbers[0].length; bitPosition++) {
      const bits = oNumbers.map((number) => number[bitPosition]);

      const numberOfZeros = bits.filter((bits) => bits === "0").length;
      const numberOfOnes = bits.filter((bits) => bits === "1").length;

      if (numberOfZeros > numberOfOnes) oNumbers = oNumbers.filter((number) => number[bitPosition] === "0");
      else if (numberOfOnes > numberOfZeros) oNumbers = oNumbers.filter((number) => number[bitPosition] === "1");
      else oNumbers = oNumbers.filter((number) => number[bitPosition] === "1");
    }

    for (let bitPosition = 0; co2Numbers.length !== 1 && bitPosition < oNumbers[0].length; bitPosition++) {
      const bits = co2Numbers.map((number) => number[bitPosition]);

      const numberOfZeros = bits.filter((bits) => bits === "0").length;
      const numberOfOnes = bits.filter((bits) => bits === "1").length;

      if (numberOfZeros < numberOfOnes) co2Numbers = co2Numbers.filter((number) => number[bitPosition] === "0");
      else if (numberOfOnes < numberOfZeros) co2Numbers = co2Numbers.filter((number) => number[bitPosition] === "1");
      else co2Numbers = co2Numbers.filter((number) => number[bitPosition] === "0");
    }

    return parseInt(oNumbers[0], 2) * parseInt(co2Numbers[0], 2);
  }
}
