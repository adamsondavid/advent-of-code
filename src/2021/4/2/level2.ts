import Level from "../../../utils/level";

type Cell = {
  x: number;
  y: number;
  checked: boolean;
  value: number;
};

type Board = {
  cells: Cell[];
};

export default class extends Level {
  private readonly boardSize = 5;
  public run() {
    const input = this.input.readLines().join("\n");
    const segments = input.split("\n\n");

    const numbers = segments
      .shift()!
      .split(",")
      .map((number) => parseInt(number));

    const boards: Board[] = segments.map((board) => ({
      cells: board.split("\n").flatMap((row, y) =>
        row
          .split(" ")
          .filter((cell) => cell)
          .map((cell, x) => ({ x, y, checked: false, value: parseInt(cell) })),
      ),
    }));

    const finishedBoards: Board[] = [];

    for (const number of numbers) {
      for (const board of boards) {
        if (finishedBoards.includes(board)) continue;
        const cell = board.cells.find((cell) => cell.value === number);
        if (cell) cell.checked = true;

        for (let i = 0; i < this.boardSize; i++) {
          if (
            board.cells.filter((cell) => cell.x === i).every((cell) => cell.checked) ||
            board.cells.filter((cell) => cell.y === i).every((cell) => cell.checked)
          ) {
            finishedBoards.push(board);
            if (finishedBoards.length === boards.length) {
              const unchecked = board.cells.filter((cell) => !cell.checked);
              const sumOfUnchecked = unchecked.reduce((a, b) => a + b.value, 0);
              return sumOfUnchecked * number;
            }
            break;
          }
        }
      }
    }
  }
}
