import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .split(" ")
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item !== "");
}

export async function startREPL(state: State): Promise<void> {
  const commands = state.registry;
  const rl = state.rl;
  rl.prompt();
  rl.on("line", async (line) => {
    const input = cleanInput(line);
    if (commands[input[0]]) {
      const command = commands[input[0]];
      try {
        await command.callback(state, ...input);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    } else {
      commands["help"].callback(state);
    }
    rl.prompt();
  }).on("close", async () => {
    await commands["exit"].callback(state);
  });
}
