import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    let counter = 0;
    for (const line of this.input.readLines()) {
      const [s1, s2] = line.split(",");
      const s1a = parseInt(s1.split("-")[0]);
      const s1b = parseInt(s1.split("-")[1]);
      const s2a = parseInt(s2.split("-")[0]);
      const s2b = parseInt(s2.split("-")[1]);

      if (s1a <= s2a && s2a <= s1b) counter++;
      else if (s2a <= s1a && s1a <= s2b) counter++;
    }
    return counter;
  }
}
