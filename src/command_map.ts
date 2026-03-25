import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const pokeapi = new state.PokeAPI();
  const response = await pokeapi.fetchLocationAreas(state.nextLocationURL);
  for (const city of response.results) {
    console.log(city.name);
  }
  state.nextLocationURL = response.next;
  state.prevLocationURL = response.previous;
}
