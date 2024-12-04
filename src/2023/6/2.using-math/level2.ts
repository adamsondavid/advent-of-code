import StringStream from "../../../utils/string-stream";

function intersections(p: number, q: number): [number, number] {
  const x1 = -(p / 2) - Math.sqrt(Math.pow(p / 2, 2) - q);
  const x2 = -(p / 2) + Math.sqrt(Math.pow(p / 2, 2) - q);
  return [x1, x2];
}

export function solve(input: StringStream) {
  const race = {
    duration: parseInt(input.readLine()!.match(/\d+/g)!.join("")),
    distance: parseInt(input.readLine()!.match(/\d+/g)!.join("")),
  };

  // we are going to solve this by using simple calculus
  // the distance the boat can travel is described by a quadratic function: -x^2+tx
  // we can subtract the distance we want to travel and then determine where the function intersects with the x-axis:
  // -x^2+tx-d=0
  // put the parameters into the pq-Formula and get the results

  const [x1, x2] = intersections(race.duration, race.distance);
  return Math.floor(x2 - x1);
}
