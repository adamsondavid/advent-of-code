export function cache<I extends unknown[], O>(fn: (...args: I) => O) {
  const cache = new Map<string, O>();
  return (...args: I) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
