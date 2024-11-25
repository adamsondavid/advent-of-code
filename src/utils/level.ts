import StringStream from "./string-stream";

/**
 * @deprecated
 */
export default abstract class Level {
  protected readonly input;

  public constructor(input: StringStream) {
    this.input = input;
  }

  public abstract run(): any;
}
