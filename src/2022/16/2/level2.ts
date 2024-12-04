import Level from "../../../utils/level";
import Graph from "node-dijkstra";

interface Neighbour {
  valve: Valve;
  distance: number;
}

interface Valve {
  readonly name: string;
  readonly id: number;
  readonly flowrate: number;
  readonly neighbours: Neighbour[];
}

let max = 0;
function dfs(
  me: { valve: Valve; timeLeft: number },
  elephant: { valve: Valve; timeLeft: number },
  pressure = 0,
  openedValves: Valve[] = [],
  visitedValves: Valve[] = [],
) {
  if (!openedValves.includes(me.valve) && me.valve.flowrate > 0 && me.timeLeft >= 1) {
    me.timeLeft--;
    pressure += me.valve.flowrate * me.timeLeft;
    openedValves = [...openedValves, me.valve];
  }
  if (!openedValves.includes(elephant.valve) && elephant.valve.flowrate > 0 && elephant.timeLeft >= 1) {
    elephant.timeLeft--;
    pressure += elephant.valve.flowrate * elephant.timeLeft;
    openedValves = [...openedValves, elephant.valve];
  }
  if (me.timeLeft <= 0 && elephant.timeLeft <= 0) return;
  if (pressure > max) {
    max = pressure;
    console.log("new max: " + max);
  }
  for (const myNeighbour of me.valve.neighbours) {
    for (const elephantNeighbour of elephant.valve.neighbours) {
      if (
        !visitedValves.includes(myNeighbour.valve) &&
        !visitedValves.includes(elephantNeighbour.valve) &&
        myNeighbour.valve !== elephantNeighbour.valve
      ) {
        dfs(
          { valve: myNeighbour.valve, timeLeft: me.timeLeft - myNeighbour.distance },
          { valve: elephantNeighbour.valve, timeLeft: elephant.timeLeft - elephantNeighbour.distance },
          pressure,
          openedValves,
          [...visitedValves, myNeighbour.valve, elephantNeighbour.valve],
        );
      }
    }
  }
}

export default class extends Level {
  public run() {
    const lines = this.input.readLines();
    const valves: Valve[] = [];

    for (const [i, line] of lines.entries()) {
      const regex = /Valve (?<node>.*) has flow rate=(?<flowrate>.*); tunnel(s)? lead(s)? to valve(s)? (?<edges>.*)/;
      const groups = line.match(regex)!.groups!;
      const name = groups.node;
      const flowrate = parseInt(groups.flowrate);
      valves.push({ name, id: i, flowrate, neighbours: [] });
    }
    for (const [i, line] of lines.entries()) {
      const regex = /Valve (?<node>.*) has flow rate=(?<flowrate>.*); tunnel(s)? lead(s)? to valve(s)? (?<edges>.*)/;
      const groups = line.match(regex)!.groups!;
      const neighbours = groups.edges.split(", ");
      for (const neighbour of neighbours) {
        valves[i].neighbours.push({ valve: valves.find((valve) => valve.name === neighbour)!, distance: 1 });
      }
    }

    const graph = new Graph();
    valves.forEach((valve) =>
      graph.addNode(
        valve.name,
        Object.fromEntries(valve.neighbours.map((neighbour) => [neighbour.valve.name, neighbour.distance])),
      ),
    );

    for (const valve of valves) {
      valve.neighbours.splice(0);
      for (const neighbour of valves) {
        if (valve === neighbour) continue;
        if (neighbour.flowrate > 0)
          valve.neighbours.push({ valve: neighbour, distance: graph.path(valve.name, neighbour.name)!.length - 1 });
      }
    }

    const start = valves.find((valve) => valve.name === "AA")!;
    dfs({ valve: start, timeLeft: 26 }, { valve: start, timeLeft: 26 });
    return max;
  }
}
