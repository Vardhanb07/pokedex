import { type Interface, createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
  usage: string;
};

export type State = {
  rl: Interface;
  registry: Record<string, CLICommand>;
  PokeAPI: typeof PokeAPI;
  nextLocationURL?: string;
  prevLocationURL?: string;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  return {
    rl: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    }),
    registry: getCommands(),
    PokeAPI: PokeAPI,
    pokedex: {},
  };
}
