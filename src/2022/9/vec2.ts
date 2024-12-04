export default class Vec2 {
  private _x: number;
  private _y: number;

  public constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public distance(other: Vec2) {
    return Math.sqrt(Math.pow(this._x - other._x, 2) + Math.pow(this._y - other._y, 2));
  }

  public direction(other: Vec2) {
    const dx = other._x === this._x ? 0 : (other._x - this._x) / Math.abs(other._x - this._x);
    const dy = other._y === this._y ? 0 : (other._y - this._y) / Math.abs(other._y - this._y);
    return new Vec2(dx, dy);
  }

  public move(amount: Vec2) {
    this._x += amount._x;
    this._y += amount._y;
  }
}
