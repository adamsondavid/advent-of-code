import Level from "../../../utils/level";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export default class extends Level {
  public run() {
    const cubes: Vec3[] = [];
    for (const input of this.input.readLines()) {
      const [x, y, z] = input.split(",");
      cubes.push({ x: parseInt(x), y: parseInt(y), z: parseInt(z) });
    }

    const xMin = Math.min(...cubes.map((cube) => cube.x));
    const xMax = Math.max(...cubes.map((cube) => cube.x));
    const yMin = Math.min(...cubes.map((cube) => cube.y));
    const yMax = Math.max(...cubes.map((cube) => cube.y));
    const zMin = Math.min(...cubes.map((cube) => cube.z));
    const zMax = Math.max(...cubes.map((cube) => cube.z));

    const directions = [
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: -1 },
    ];

    const map = new Map<string, boolean>();
    for (let z = zMin; z <= zMax; z++) {
      for (let y = yMin; y <= yMax; y++) {
        for (let x = xMin; x <= xMax; x++) {
          map.set(JSON.stringify({ x, y, z }), !!cubes.find((cube) => cube.x === x && cube.y === y && cube.z === z));
        }
      }
    }

    const floodDelete = (position: Vec3) => {
      map.delete(JSON.stringify(position));

      if (map.get(JSON.stringify({ x: position.x + 1, y: position.y, z: position.z })) == false)
        floodDelete({ x: position.x + 1, y: position.y, z: position.z });
      if (map.get(JSON.stringify({ x: position.x - 1, y: position.y, z: position.z })) == false)
        floodDelete({ x: position.x - 1, y: position.y, z: position.z });
      if (map.get(JSON.stringify({ x: position.x, y: position.y + 1, z: position.z })) == false)
        floodDelete({ x: position.x, y: position.y + 1, z: position.z });
      if (map.get(JSON.stringify({ x: position.x, y: position.y - 1, z: position.z })) == false)
        floodDelete({ x: position.x, y: position.y - 1, z: position.z });
      if (map.get(JSON.stringify({ x: position.x, y: position.y, z: position.z + 1 })) == false)
        floodDelete({ x: position.x, y: position.y, z: position.z + 1 });
      if (map.get(JSON.stringify({ x: position.x, y: position.y, z: position.z - 1 })) == false)
        floodDelete({ x: position.x, y: position.y, z: position.z - 1 });
    };

    floodDelete({ x: xMin, y: yMin, z: zMin });

    return Array.from(map.keys()).reduce((area, position) => {
      if (!map.has(position)) return area;

      const cube: Vec3 = JSON.parse(position);
      directions.forEach((direction) => {
        if (!map.has(JSON.stringify({ x: cube.x + direction.x, y: cube.y + direction.y, z: cube.z + direction.z })))
          area++;
      });

      return area;
    }, 0);
  }
}
