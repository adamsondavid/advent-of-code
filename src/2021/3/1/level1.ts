import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const input = this.input.readLines();

    let gammaString = "";
    let epsilonString = "";

    for (let i = 0; i < input[0].length; i++) {
      const bits = input.map((line) => line[i]);
      const numberOfZeros = bits.filter((bits) => bits === "0").length;
      const numberOfOnes = bits.filter((bits) => bits === "1").length;
      if (numberOfZeros > numberOfOnes) {
        gammaString += "0";
        epsilonString += "1";
      } else if (numberOfOnes > numberOfZeros) {
        gammaString += "1";
        epsilonString += "0";
      }
    }

    return parseInt(gammaString, 2) * parseInt(epsilonString, 2);
  }
}
