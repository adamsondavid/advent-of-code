import Level from "../../../utils/level";

export default class extends Level {
  private readonly boardSize = 5;
  public run() {
    const input = this.input.readLines().join("\n");
    const segments = input.split("\n\n");

    const numbers = segments
      .shift()!
      .split(",")
      .map((number) => parseInt(number));

    const boards = segments.map((board) =>
      board.split("\n").flatMap((row, y) =>
        row
          .split(" ")
          .filter((cell) => cell)
          .map((cell, x) => ({ x, y, checked: false, value: parseInt(cell) })),
      ),
    );

    for (const number of numbers) {
      for (const board of boards) {
        const cell = board.find((cell) => cell.value === number);
        if (cell) cell.checked = true;

        for (let i = 0; i < this.boardSize; i++) {
          if (
            board.filter((cell) => cell.x === i).every((cell) => cell.checked) ||
            board.filter((cell) => cell.y === i).every((cell) => cell.checked)
          ) {
            const unchecked = board.filter((cell) => !cell.checked);
            const sumOfUnchecked = unchecked.reduce((a, b) => a + b.value, 0);
            return sumOfUnchecked * number;
          }
        }
      }
    }
  }
}
