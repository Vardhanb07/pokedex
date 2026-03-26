import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  const pokedex = state.pokedex;
  console.log("Your Pokedex:");
  for (const key in pokedex) {
    console.log(` - ${key}`);
  }
}
