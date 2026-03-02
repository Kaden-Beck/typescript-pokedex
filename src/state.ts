import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp } from "./basicCommands.js"
import { mapCommand, mapBackCommand }  from "./mapCommands.js";
import { exploreCommand } from "./exploreCommand.js";
import { catchCommand } from "./catchCommand.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { inspectCommand } from "./inspectCommand.js";
import { pokedexCommand } from "./pokedexCommand.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;    
};

export type State = {
    readline: Interface, 
    commands: Record<string, CLICommand>, 
    pokeAPI: PokeAPI, 
    nextLocationsURL?: string | null, 
    prevLocationsURL?: string | null, 
    userPokedex: Record<string, Pokemon>
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
        description: "Prints next 20 locations areas from PokeAPI", 
        callback: mapCommand
    },
    mapb: {
        name: "mapb", 
        description: "Prints previous 20 locations areas from PokeAPI", 
        callback: mapBackCommand
    }, 
    explore: {
        name: "explore <location>", 
        description: "Prints 10 Pokemon in a given location area", 
        callback: exploreCommand
    }, 
    catch: {
        name: "catch <pokemon>", 
        description: "Catch Pokemon", 
        callback: catchCommand
    }, 
    inspect: {
        name: "inspect <pokemon>",
        description: "Inspect pokemon in your pokedex",
        callback: inspectCommand
    }, 
    pokedex: {
        name: "pokdex", 
        description: "View a list of Pokemon you have caught",
        callback: pokedexCommand
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
        pokeAPI: pokeAPIInstance,
        userPokedex: {}
    }
}
