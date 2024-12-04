import Vec2 from "./vec2";

export default class Rope {
  private readonly knots: Vec2[] = [];

  public constructor(knots: number) {
    for (let i = 0; i < knots; i++) this.knots.push(new Vec2(0, 0));
  }

  public get tail() {
    return this.knots.at(-1);
  }

  public move(direction: Vec2) {
    this.knots[0].move(direction);
    this.knots.slice(1).forEach((tail, index) => {
      const head = this.knots[index];
      const distance = tail.distance(head);
      if (distance > Math.sqrt(2)) tail.move(tail.direction(head));
    });
  }
}
