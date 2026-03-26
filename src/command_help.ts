import type { State } from "./state.js";

export async function commandHelp(
  state: State,
  ...input: string[]
): Promise<void> {
  const commands = state.registry;
  if (input[1]) {
    if (commands[input[1]]) {
      console.log("NAME");
      console.log(`\t${commands[input[1]].name}`);
      console.log("USAGE");
      console.log(`\t${commands[input[1]].usage}`);
      console.log("DESCRIPTION");
      console.log(`\t${commands[input[1]].description}\n`);
    } else {
      console.error("help: command not found");
    }
    return;
  }
  console.log("Welcome to the Pokedex!");
  console.log("Commands:");
  for (const key in commands) {
    if (!Object.hasOwn(commands, key)) continue;

    const command = commands[key];
    console.log(`\t${key}: ${command.description}`);
  }
  console.log();
}
