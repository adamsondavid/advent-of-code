import StringStream from "../../../utils/string-stream";

function mix(oldSecretNumber: bigint, newSecretNumber: bigint) {
  return oldSecretNumber ^ newSecretNumber;
}

function prune(secretNumber: bigint) {
  return secretNumber % 16777216n;
}

function nextSecretNumber(secretNumber: bigint) {
  secretNumber = prune(mix(secretNumber, secretNumber * 64n));
  secretNumber = prune(mix(secretNumber, secretNumber / 32n));
  return prune(mix(secretNumber, secretNumber * 2048n));
}

export function solve(input: StringStream) {
  const m = new Map<string, number>();
  for (const secret of input.readLines().map(BigInt)) {
    const prices = [Number(secret % 10n)];
    let current = secret;
    for (let i = 0; i < 2000; i++) {
      current = nextSecretNumber(current);
      prices.push(Number(current % 10n));
    }
    const seenSequences = new Set<string>();
    for (let i = 4; i < prices.length; i++) {
      const seq = [
        prices[i - 3] - prices[i - 4],
        prices[i - 2] - prices[i - 3],
        prices[i - 1] - prices[i - 2],
        prices[i] - prices[i - 1],
      ].join(",");
      if (seenSequences.has(seq)) continue;
      seenSequences.add(seq);
      m.set(seq, (m.get(seq) ?? 0) + prices[i]);
    }
  }
  return Math.max(...m.values());
}
