import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
  return input
    .split(" ")
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item !== "");
}

export function startREPL(): void {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();
  rl.on("line", (line) => {
    const input = cleanInput(line);
    const commands = getCommands();
    if (input.length == 1 && commands[input[0]]) {
      const command = commands[input[0]];
      command.callback();
    }
    rl.prompt();
  });
}
