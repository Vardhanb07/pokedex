import { State } from "./state.js";
import { Location } from "./pokeapi.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  const commands = state.registry;
  if (!args[1]) {
    const input = ["help", "explore"];
    commands["help"].callback(state, ...input);
    return;
  }
  const locationName = args[1];
  const pokeapi = new state.PokeAPI();
  const response: Location = await pokeapi.fetchLocationArea(locationName);
  console.log(`Exploring ${locationName}...`);
  console.log("Found Pokemon:");
  for (const entry of response.pokemon_encounters) {
    console.log(` - ${entry.pokemon.name}`);
  }
}
