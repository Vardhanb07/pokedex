import { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  const commands = state.registry;
  if (!args[1]) {
    const input = ["help", "inspect"];
    commands["help"].callback(state, ...input);
    return;
  }
  const pokedex = state.pokedex;
  if (!pokedex[args[1]]) {
    console.log("you have not caught that pokemon");
    return;
  }
  const pokemon = pokedex[args[1]];
  console.log(`Name: ${args[1]}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const val of pokemon.stats) {
    console.log(` -${val.stat.name}: ${val.base_stat}`);
  }
  console.log("Types:");
  for (const val of pokemon.types) {
    console.log(` - ${val.type.name}`);
  }
}
