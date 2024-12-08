import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  const antennaGroups = new Map<string, { x: number; y: number }[]>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].match(/[a-zA-Z0-9]/)) {
        if (!antennaGroups.has(map[y][x])) antennaGroups.set(map[y][x], []);
        antennaGroups.get(map[y][x])!.push({ x, y });
      }
    }
  }

  const antinodes = new Set<string>();
  for (const antennas of antennaGroups.values()) {
    for (let i = 0; i < antennas.length; i++) {
      for (let j = i + 1; j < antennas.length; j++) {
        const antennaA = { ...antennas[i] };
        const antennaB = { ...antennas[j] };

        const antinodeA = { x: antennaA.x - antennaB.x, y: antennaA.y - antennaB.y };
        const antinodeB = { x: antennaB.x - antennaA.x, y: antennaB.y - antennaA.y };

        while (map[antennaA.y]?.[antennaA.x]) {
          antinodes.add(JSON.stringify(antennaA));
          antennaA.x += antinodeA.x;
          antennaA.y += antinodeA.y;
        }

        while (map[antennaB.y]?.[antennaB.x]) {
          antinodes.add(JSON.stringify(antennaB));
          antennaB.x += antinodeB.x;
          antennaB.y += antinodeB.y;
        }
      }
    }
  }
  return antinodes.size;
}
