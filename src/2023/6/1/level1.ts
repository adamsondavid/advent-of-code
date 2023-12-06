import StringStream from "../../../utils/string-stream";

type Race = { duration: number; distance: number };

export function solve(input: StringStream) {
  const durations = input.readLine()!.match(/\d+/g)!.map(Number);
  const races: Race[] = input
    .readLine()!
    .match(/\d+/g)!
    .map(Number)
    .map((distance, i) => ({ distance, duration: durations[i] }));

  const possibilitiesToWinRace = new Map<Race, number>();
  for (const race of races) {
    let possibilitiesToWin = 0;
    for (let pressDuration = 0; pressDuration < race.duration; pressDuration++) {
      const speedPerDurationUnit = pressDuration;
      const travelDuration = race.duration - pressDuration;
      const distance = speedPerDurationUnit * travelDuration;
      if (distance > race.distance) possibilitiesToWin++;
    }
    possibilitiesToWinRace.set(race, possibilitiesToWin);
  }

  return [...possibilitiesToWinRace.values()].reduce((result, duration) => result * duration, 1);
}
