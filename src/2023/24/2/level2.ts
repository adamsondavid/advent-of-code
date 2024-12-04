import StringStream from "../../../utils/string-stream";
import { rmSync, writeFileSync } from "fs";
import { spawnSync } from "child_process";

type Trace = Vec2 & { dx: number; dy: number; dz: number };
type Vec2 = { x: number; y: number; z: number };

export function solve(input: StringStream) {
  const traces: Trace[] = input.readLines().map((line) => {
    const [x, y, z, dx, dy, dz] = line.match(/-?\d+/g)!.map(Number);
    return { x, y, z, dx, dy, dz };
  });
  const variables = ["x", "y", "z", "x_d", "y_d", "z_d", "t_0", "t_1", "t_2"];
  const script = [
    "import z3",
    `${variables.join(", ")} = z3.Reals("${variables.join(" ")}")`,
    `equations = [
      x + t_0 * x_d == ${traces[0].x} + t_0 * ${traces[0].dx},
      y + t_0 * y_d == ${traces[0].y} + t_0 * ${traces[0].dy},
      z + t_0 * z_d == ${traces[0].z} + t_0 * ${traces[0].dz},
      x + t_1 * x_d == ${traces[1].x} + t_1 * ${traces[1].dx},
      y + t_1 * y_d == ${traces[1].y} + t_1 * ${traces[1].dy},
      z + t_1 * z_d == ${traces[1].z} + t_1 * ${traces[1].dz},
      x + t_2 * x_d == ${traces[2].x} + t_2 * ${traces[2].dx},
      y + t_2 * y_d == ${traces[2].y} + t_2 * ${traces[2].dy},
      z + t_2 * z_d == ${traces[2].z} + t_2 * ${traces[2].dz},
    ]`,
    `solver = z3.Solver()`,
    `solver.add(*equations)`,
    `solver.check()`,
    `model = solver.model()`,
    `print(sum([model[coord].as_long() for coord in [x, y, z]]))`,
  ].join("\n");
  writeFileSync(`${__dirname}/script.py`, script);
  const python = spawnSync("python3", [`${__dirname}/script.py`]);
  rmSync(`${__dirname}/script.py`);
  return python.stdout.toString().match(/\d+/)!.map(Number)[0];
}
