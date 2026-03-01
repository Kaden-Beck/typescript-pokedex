import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp } from "./commandFunctions.js"

export type State = {
    readline: Interface, 
    commands: Record<string, CLICommand>
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;    
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
  };
}

export function initState(): State {
    const readLineInterface = createInterface({
        input: process.stdin,
        output: process.stdout, 
        prompt: "Pokedex > ",
    });
    
    const commandRecords: Record<string, CLICommand> = getCommands(); 
    return {
        readline: readLineInterface,
        commands: commandRecords
    }
}
