import type { State } from "./state.js";

export async function commandExit(_state: State): Promise<void> {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}
