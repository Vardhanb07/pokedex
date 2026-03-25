import { type Interface } from "node:readline";
import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .split(" ")
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item !== "");
}

export function startREPL(state: State): void {
  const commands = state.registry;
  const rl = state.rl;
  rl.prompt();
  rl.on("line", (line) => {
    const input = cleanInput(line);
    if (input.length == 1 && commands[input[0]]) {
      const command = commands[input[0]];
      command.callback(state);
    }
    rl.prompt();
  }).on("close", () => {
    commands["exit"].callback(state);
  });
}
