import StringStream from "../../../utils/string-stream";

type Card = { id: number; winsCardIds: number[] };

function createCard(line: string): Card {
  const id = parseInt(line.match(/\d+/)![0]);
  const [winningNumbers, myNumbers] = line.split(": ")[1].split("|");
  const myNumberSet = new Set(myNumbers.match(/\d+/g)!.map((n) => parseInt(n)));
  const winsCardIds = winningNumbers
    .match(/\d+/g)!
    .map((n) => parseInt(n))
    .filter((n) => myNumberSet.has(n))
    .map((_, idx) => id + idx + 1);
  return { id, winsCardIds };
}

function play(cards: Card[]) {
  const cardAmount = cards.reduce((map, card) => map.set(card.id, 1), new Map<number, number>());
  for (const card of cards) {
    const amount = cardAmount.get(card.id)!;
    for (const wonCardId of card.winsCardIds) {
      cardAmount.set(wonCardId, cardAmount.get(wonCardId)! + amount);
    }
  }
  return cardAmount;
}

export function solve(input: StringStream) {
  const cards = input.readLines().map((line) => createCard(line));
  return [...play(cards).values()].reduce((a, b) => a + b, 0);
}
