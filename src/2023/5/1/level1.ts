import StringStream from "../../../utils/string-stream";

type Range = { readonly from: number; readonly to: number };

interface Mapper {
  map(value: number): number;
}

class MapperForSingleRange implements Mapper {
  public constructor(public readonly range: Range, private readonly offset: number) {}
  public map(value: number) {
    return value + this.offset;
  }
}

class MapperForMultipleRanges implements Mapper {
  public constructor(public readonly name: string, private readonly mappers: MapperForSingleRange[]) {}
  public map(value: number) {
    const mapper = this.mappers
      .filter((mapper) => value >= mapper.range.from)
      .find((mapping) => value <= mapping.range.to);
    return mapper?.map(value) ?? value;
  }
}

class MapperThatPipesThroughMultipleOtherMappers implements Mapper {
  constructor(private readonly mappers: Mapper[]) {}
  public map(value: number) {
    return this.mappers.reduce((value, mapper) => mapper.map(value), value);
  }
}

export function solve(input: StringStream) {
  const lines = input.readLines().join("\n").split("\n\n");

  const seeds = lines
    .shift()!
    .match(/\d+/g)!
    .map((seed) => parseInt(seed));

  const seedToLocationMapper: Mapper = new MapperThatPipesThroughMultipleOtherMappers(
    lines.map((line) => {
      const [name, ...mappings] = line.split("\n");
      return new MapperForMultipleRanges(
        `${name.split(" ")[0]}-mapper`,
        mappings.map((mapping) => {
          const [dst, src, range] = mapping.split(" ");
          return new MapperForSingleRange(
            { from: parseInt(src), to: parseInt(src) + parseInt(range) - 1 },
            parseInt(dst) - parseInt(src),
          );
        }),
      );
    }),
  );

  const seedLocations = seeds.map((seed) => seedToLocationMapper.map(seed));
  return Math.min(...seedLocations);
}
