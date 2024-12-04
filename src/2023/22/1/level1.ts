import StringStream from "../../../utils/string-stream";

type Vec3 = { x: number; y: number; z: number };
type Cube = { subCubes: Vec3[] };
type CubeMap = boolean[][][];

function deltaZ(cube: Cube, map: CubeMap) {
  const topViewCoords = [
    ...new Set(
      cube.subCubes.map((subCube) => ({ ...subCube, z: undefined })).map((subCube) => JSON.stringify(subCube)),
    ),
  ].map((subCube) => JSON.parse(subCube));
  let z = cube.subCubes[0].z;
  while (z > 1 && topViewCoords.every(({ x, y }) => !map[z - 1][x][y])) z--;
  return z - cube.subCubes[0].z;
}

export function solve(input: StringStream) {
  const cubes: Cube[] = input
    .readLines()
    .map((line) => {
      const [x1, y1, z1, x2, y2, z2] = line.match(/\d+/g)!.map(Number);
      const firstCube = { x: x1, y: y1, z: z1 };
      const lastCube = { x: x2, y: y2, z: z2 };
      const axis = (() => {
        if (firstCube.x !== lastCube.x) return "x";
        if (firstCube.y !== lastCube.y) return "y";
        if (firstCube.z !== lastCube.z) return "z";
        return "none";
      })();
      const subCubes: Vec3[] = [];
      if (axis === "none") subCubes.push(firstCube);
      else for (let i = firstCube[axis]; i <= lastCube[axis]; i++) subCubes.push({ ...firstCube, [axis]: i });
      return { subCubes };
    })
    .sort((a, b) => a.subCubes[0].z - b.subCubes[0].z);

  const subCubes = cubes.map((cube) => cube.subCubes).flat();
  const map: CubeMap = new Array(Math.max(...subCubes.map(({ z }) => z)) + 1)
    .fill("x")
    .map(() =>
      new Array(Math.max(...subCubes.map(({ x }) => x)) + 1)
        .fill("y")
        .map(() => new Array(Math.max(...subCubes.map(({ y }) => y)) + 1).fill(false)),
    );
  for (const subCube of subCubes) {
    map[subCube.z][subCube.x][subCube.y] = true;
  }

  for (const cube of cubes) {
    for (const subCube of cube.subCubes) map[subCube.z][subCube.x][subCube.y] = false;
    const dZ = deltaZ(cube, map);
    for (const subCube of cube.subCubes) {
      subCube.z += dZ;
      map[subCube.z][subCube.x][subCube.y] = true;
    }
  }

  let ans = 0;
  for (const cube of cubes) {
    for (const subCube of cube.subCubes) map[subCube.z][subCube.x][subCube.y] = false;
    const canBeRemoved = !cubes.map((cube) => deltaZ(cube, map)).some((deltaZ) => deltaZ !== 0);
    if (canBeRemoved) ans++;
    for (const subCube of cube.subCubes) map[subCube.z][subCube.x][subCube.y] = true;
  }
  return ans;
}
