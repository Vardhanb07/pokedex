import { State } from "./state.js";
import { getRandomValues } from "node:crypto";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const commands = state.registry;
  if (!args[1]) {
    const input = ["help", "catch"];
    commands["help"].callback(state, ...input);
    return;
  }
  const pokeapi = new state.PokeAPI();
  const response = await pokeapi.fetchPokemon(args[1]);
  console.log(`Throwing a Pokeball at ${args[1]}...`);
  const randomArray = new Uint8Array(1);
  getRandomValues(randomArray);
  console.log(randomArray[0] * response.base_experience);
  if (
    randomArray[0] * response.base_experience >
    4000 + response.base_experience * 100
  ) {
    console.log(`${args[1]} was caught!`);
    state.pokedex[args[1]] = response;
  } else {
    console.log(`${args[1]} escaped!`);
  }
}
