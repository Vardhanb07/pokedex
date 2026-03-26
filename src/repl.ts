import { State } from "./state.js";
import { LocationAreaNotFoundError, NetworkError } from "./errors.js";

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
        if (e instanceof NetworkError) {
          console.error(e.message);
          await commands["exit"].callback(state);
        } else if (e instanceof LocationAreaNotFoundError) {
          console.error(e.message);
          await commands["exit"].callback(state);
        } else if (e instanceof Error) {
          console.error(e.message);
          await commands["exit"].callback(state);
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
