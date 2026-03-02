import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp } from "./commandFunctions.js"
import mapCommand from "./mapCommand.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;    
}
export type State = {
    readline: Interface, 
    commands: Record<string, CLICommand>, 
    pokeAPI: PokeAPI, 
    nextLocationsURL?: string, 
    prevLocationsURL?: string, 
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Gets help for the pokedex CLI",
      callback: commandHelp,
    },
    map: {
        name: "map", 
        description: "Prints 20 locations from PokeAPI", 
        callback: mapCommand
    }
  };
}

export function initState(): State {
    const readLineInterface = createInterface({
        input: process.stdin,
        output: process.stdout, 
        prompt: "Pokedex > ",
    });
    
    const commandRecords: Record<string, CLICommand> = getCommands(); 

    const pokeAPIInstance = new PokeAPI();
    
    return {
        readline: readLineInterface,
        commands: commandRecords, 
        pokeAPI: pokeAPIInstance
    }
}
