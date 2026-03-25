import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n\n");
  const commands = state.registry;
  for (const key in commands) {
    if (!Object.hasOwn(commands, key)) continue;

    const command = commands[key];
    console.log(`${key}: ${command.description}`);
  }
}
