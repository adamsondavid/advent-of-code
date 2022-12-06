import axios from "axios";

export default class AdventOfCodeApi {
  private readonly sessionId;

  public constructor(sessionId: string) {
    this.sessionId = sessionId;
  }

  public async getInput(year: string, day: string) {
    const response = await axios.get(`https://adventofcode.com/${year}/day/${day}/input`, {
      headers: { cookie: `session=${this.sessionId}` },
    });
    return response.data as string;
  }

  public async submitOutput(year: string, day: string, level: string, output: string) {
    // TODO implement!
    throw new Error("not implemented");
  }
}
