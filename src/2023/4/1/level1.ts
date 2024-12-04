import StringStream from "../../../utils/string-stream";

type Card = { id: number; points: number };

function createCard(line: string): Card {
  const id = parseInt(line.match(/\d+/)![0]);
  const [winningNumbers, myNumbers] = line.split(": ")[1].split("|");
  const myNumberSet = new Set(myNumbers.match(/\d+/g)!.map((n) => parseInt(n)));
  const points = winningNumbers
    .match(/\d+/g)!
    .map((n) => parseInt(n))
    .filter((n) => myNumberSet.has(n))
    .reduce((points, _, i) => (i === 0 ? 1 : points * 2), 0);
  return { id, points };
}

export function solve(input: StringStream) {
  const cards = input.readLines().map((line) => createCard(line));
  return cards.reduce((totalPoints, card) => totalPoints + card.points, 0);
}
