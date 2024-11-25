import { expect } from "vitest";
import { basename, resolve } from "node:path";
import StringStream from "./string-stream";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { ProxyAgent, setGlobalDispatcher } from "undici";

if (process.env.https_proxy) setGlobalDispatcher(new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() }));

/**
 * @deprecated
 */
export function testName() {
  return expect.getState().currentTestName!.split(" ").at(-1);
}

function getTestName() {
  return expect.getState().currentTestName!.split(" ").at(-1);
}

function getYearAndDay(__dirname: string) {
  return { year: basename(resolve(__dirname, "../../")), day: basename(resolve(__dirname, "../")) };
}

export async function useInput(__dirname: string) {
  return new StringStream(await readFile(`${__dirname}/${getTestName()}`, "utf8"));
}

export async function useProdInput(__dirname: string) {
  if (existsSync(`${__dirname}/${getTestName()}`)) return useInput(__dirname);
  const { year, day } = getYearAndDay(__dirname);
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  console.log(`no input found. downloading from ${url}...`);
  if (!process.env.AOC_SESSION) throw new Error("missing AOC_SESSION env variable");
  const response = await fetch(url, { headers: { cookie: `session=${process.env.AOC_SESSION}` } });
  const input = await response.text();
  if (!response.ok) throw new Error(`failed to fetch input. status: ${response.status}\n\n${input}`);
  await writeFile(`${__dirname}/${getTestName()}`, input);
  return useInput(__dirname);
}
