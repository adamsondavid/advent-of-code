import Level from "../../../utils/level";

interface Cube {
  x: number;
  y: number;
  z: number;
}

export default class extends Level {
  public run() {
    const cubes: Cube[] = [];
    for (const input of this.input.readLines()) {
      const [x, y, z] = input.split(",");
      cubes.push({ x: parseInt(x), y: parseInt(y), z: parseInt(z) });
    }

    let surfaces = cubes.length * 6;

    for (const cube of cubes) {
      if (cubes.find((other) => other.y === cube.y && other.z === cube.z && other.x - 1 === cube.x)) surfaces--;
      if (cubes.find((other) => other.y === cube.y && other.z === cube.z && other.x + 1 === cube.x)) surfaces--;
      if (cubes.find((other) => other.x === cube.x && other.z === cube.z && other.y - 1 === cube.y)) surfaces--;
      if (cubes.find((other) => other.x === cube.x && other.z === cube.z && other.y + 1 === cube.y)) surfaces--;
      if (cubes.find((other) => other.x === cube.x && other.y === cube.y && other.z - 1 === cube.z)) surfaces--;
      if (cubes.find((other) => other.x === cube.x && other.y === cube.y && other.z + 1 === cube.z)) surfaces--;
    }

    return surfaces;
  }
}
