import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const race = {
    duration: parseInt(input.readLine()!.match(/\d+/g)!.join("")),
    distance: parseInt(input.readLine()!.match(/\d+/g)!.join("")),
  };

  let possibilitiesToWin = 0;

  for (let pressDuration = 0; pressDuration < race.duration; pressDuration++) {
    const speedPerDurationUnit = pressDuration;
    const travelDuration = race.duration - pressDuration;
    const distance = speedPerDurationUnit * travelDuration;
    if (distance > race.distance) possibilitiesToWin++;
  }

  return possibilitiesToWin;
}
