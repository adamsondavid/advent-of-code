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
  let res = 0n;
  for (const secret of input.readLines().map(BigInt)) {
    let current = secret;
    for (let i = 0; i < 2000; i++) {
      current = nextSecretNumber(current);
    }
    res += current;
  }
  return res;
}
