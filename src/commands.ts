import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapd } from "./command_mapd.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
      usage: "exit",
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
      usage: "help [command]",
    },
    map: {
      name: "map",
      description: "Shows next 20 locations",
      callback: commandMap,
      usage: "map",
    },
    mapd: {
      name: "mapd",
      description: "Shows previous 20 locations",
      callback: commandMapd,
      usage: "mapd",
    },
    explore: {
      name: "explore",
      description: "explore map",
      callback: commandExplore,
      usage: "explore <location-area>",
    },
    catch: {
      name: "catch",
      description: "catch a pokemon",
      callback: commandCatch,
      usage: "catch <pokemon-name>",
    },
    inspect: {
      name: "inspect",
      description: "inspect your pokedex",
      callback: commandInspect,
      usage: "inspect <pokemon-name>",
    },
  };
}
