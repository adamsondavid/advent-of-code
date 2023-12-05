import StringStream from "../../../utils/string-stream";

type Range = { readonly from: number; readonly to: number };

interface Mapper {
  map(range: Range): Range[];
}

type Mapping = { readonly range: Range; readonly offset: number };
export class MapperForMultipleRanges implements Mapper {
  private readonly mappings;

  public constructor(public readonly name: string, mappings: Mapping[]) {
    this.mappings = mappings.sort((a, b) => a.range.from - b.range.from);
  }

  public map(range: Range) {
    const ranges = new Array<Range>();
    let current = range.from;
    while (current < range.to) {
      const currentMapping = this.mappings
        .filter((mapping) => mapping.range.from <= current)
        .find((mapping) => mapping.range.to >= current);
      const nextMapping = this.mappings.find((mapping) => mapping.range.from > current);
      if (currentMapping) {
        const to = Math.min(range.to, currentMapping.range.to);
        ranges.push({ from: current + currentMapping.offset, to: to + currentMapping.offset });
        current = to + 1;
      } else if (nextMapping) {
        const to = Math.min(range.to, nextMapping.range.from - 1);
        ranges.push({ from: current, to });
        current = to + 1;
      } else {
        const to = range.to;
        ranges.push({ from: current, to });
        current = to;
      }
    }
    return ranges;
  }
}

class MapperThatPipesThroughMultipleOtherMappers implements Mapper {
  constructor(private readonly mappers: Mapper[]) {}
  public map(range: Range) {
    return this.mappers.reduce((ranges, mapper) => ranges.flatMap((range) => mapper.map(range)), [range]);
  }
}

export function solve(input: StringStream) {
  const lines = input.readLines().join("\n").split("\n\n");

  const seeds: Range[] = lines
    .shift()!
    .match(/\d+/g)!
    .map((seed) => parseInt(seed))
    .map((a, b, seeds) => {
      const from = seeds.shift()!;
      return { from, to: from + seeds.shift()! - 1 };
    });

  const seedToLocationMapper: Mapper = new MapperThatPipesThroughMultipleOtherMappers(
    lines.map((line) => {
      const [name, ...mappings] = line.split("\n");
      return new MapperForMultipleRanges(
        `${name.split(" ")[0]}-mapper`,
        mappings.map((mapping) => {
          const [dst, src, range] = mapping.split(" ");
          return {
            range: { from: parseInt(src), to: parseInt(src) + parseInt(range) - 1 },
            offset: parseInt(dst) - parseInt(src),
          };
        }),
      );
    }),
  );

  const seedLocations = seeds.flatMap((seed) => seedToLocationMapper.map(seed).map((range) => range.from));
  return Math.min(...seedLocations);
}
