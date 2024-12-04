import Level from "../../../utils/level";

type Vec2 = {
  x: number;
  y: number;
};

type Move = {
  elf: Vec2;
  destination: Vec2;
};

export default class extends Level {
  public run() {
    const elves: Vec2[] = [];
    for (const [y, line] of this.input.readLines().entries()) {
      for (const [x, char] of line.split("").entries()) {
        if (char === "#") elves.push({ x, y });
      }
    }
    const directionGroups: Vec2[][] = [
      [
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: -1 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: -1, y: 1 },
      ],
      [
        { x: -1, y: 0 },
        { x: -1, y: -1 },
        { x: -1, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
      ],
    ];

    for (let i = 0; i < 10; i++) {
      const moveProposals: Move[] = [];
      for (const elf of elves) {
        const hasNeighbours = directionGroups
          .flatMap((directions) => directions)
          .some((direction) =>
            elves.some(
              (otherElf) => otherElf !== elf && otherElf.x == elf.x + direction.x && otherElf.y === elf.y + direction.y,
            ),
          );
        if (!hasNeighbours) continue;
        for (const directions of directionGroups) {
          const blocked = directions.some((direction) =>
            elves.some(
              (otherElf) => otherElf !== elf && otherElf.x == elf.x + direction.x && otherElf.y === elf.y + direction.y,
            ),
          );
          if (!blocked) {
            moveProposals.push({ elf, destination: { x: elf.x + directions[0].x, y: elf.y + directions[0].y } });
            break;
          }
        }
      }
      directionGroups.push(directionGroups.shift()!);

      for (const move of moveProposals) {
        const unique = !moveProposals.some(
          (otherMove) =>
            otherMove !== move &&
            otherMove.destination.x === move.destination.x &&
            otherMove.destination.y === move.destination.y,
        );
        if (unique) {
          move.elf.x = move.destination.x;
          move.elf.y = move.destination.y;
        }
      }
    }

    const xMin = Math.min(...elves.map((elf) => elf.x));
    const xMax = Math.max(...elves.map((elf) => elf.x));
    const yMin = Math.min(...elves.map((elf) => elf.y));
    const yMax = Math.max(...elves.map((elf) => elf.y));

    return (xMax - xMin + 1) * (yMax - yMin + 1) - elves.length;
  }
}
