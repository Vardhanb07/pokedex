import { getCommands } from "./commands.js";

export function commandHelp(): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n\n");
  const commands = getCommands();
  for (const key in commands) {
    if (!Object.hasOwn(commands, key)) continue;

    const command = commands[key];
    console.log(`${key}: ${command.description}`);
  }
}
