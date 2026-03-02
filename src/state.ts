import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp } from "./commandFunctions.js"
import { mapCommand, mapBackCommand }  from "./mapCommand.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;    
};

export type State = {
    readline: Interface, 
    commands: Record<string, CLICommand>, 
    pokeAPI: PokeAPI, 
    nextLocationsURL?: string | null, 
    prevLocationsURL?: string | null, 
};

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
        description: "Prints next 20 locations from PokeAPI", 
        callback: mapCommand
    },
    mapb: {
        name: "mapb", 
        description: "Prints previous 20 locations from PokeAPI", 
        callback: mapBackCommand
    }
  };
};

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
