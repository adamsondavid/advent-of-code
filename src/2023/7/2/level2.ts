import StringStream from "../../../utils/string-stream";

function worth(cards: string) {
  const m = cards.split("").reduce((a, b) => a.set(b, (a.get(b) ?? 0) + 1), new Map<string, number>());
  const jokers = m.get("J") ?? 0;
  m.set("J", 0);
  const v = [...m.values()].sort((a, b) => b - a);
  v[0] += jokers;
  if (v[0] === 5) return ["FIVE_OF_A_KIND", 7] as const;
  if (v[0] === 4) return ["FOUR_OF_A_KIND", 6] as const;
  if (v[0] === 3 && v[1] === 2) return ["FULL_HOUSE", 5] as const;
  if (v[0] === 3) return ["THREE_OF_A_KIND", 4] as const;
  if (v[0] === 2 && v[1] === 2) return ["TWO_PAIR", 3] as const;
  if (v[0] === 2) return ["ONE_PAIR", 2] as const;
  if (v[0] === 1 && v[1] === 1 && v[2] === 1 && v[3] === 1 && v[4] === 1) return ["HIGH_CARD", 1] as const;
  throw new Error("worth of card does not exist");
}

function altWorth(cards: string) {
  const hex = cards
    .replaceAll("J", "1")
    .replaceAll("T", "a")
    .replaceAll("Q", "b")
    .replaceAll("K", "c")
    .replaceAll("A", "d");
  return parseInt(hex, 16);
}

export function solve(input: StringStream) {
  return input
    .readLines()
    .map((line) => line.split(" "))
    .map(([cards, bid]) => ({ cards, bid: parseInt(bid), worth: worth(cards), altWorth: altWorth(cards) }))
    .sort((a, b) => a.worth[1] - b.worth[1] || a.altWorth - b.altWorth)
    .map((hand, rank) => hand.bid * (rank + 1))
    .reduce((totalWinnings, winning) => totalWinnings + winning, 0);
}
