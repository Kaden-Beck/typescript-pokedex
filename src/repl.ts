import * as readline from 'readline';
import type { CLICommand } from './command.js';
import { commandExit, commandHelp } from "./commandFunctions.js"

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


export function cleanInput(input: string): string[] {
    let cleanOutput: string[] = input.trim().split(/\s+/);

    for (let i = 0; i < cleanOutput.length; i++) {
        cleanOutput[i] = cleanOutput[i].toLowerCase().trim();
    }
    
    return cleanOutput;
}

export function startREPL() : void {
    
    // Initialize line reader
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout, 
        prompt: "Pokedex > ",
    });
    const commands: Record<string, CLICommand> = getCommands(); 
    rl.prompt();

    // Listen for input on line and process any commands
    rl.on("line", (input) => {

        // if input is not empty clean input
        if (input.trim() !== "") {
            const cleanOutput: string[] = cleanInput(input);
            const commandKey: string = cleanOutput[0];

            if (commandKey in commands) {
                try {
                    commands[commandKey].callback(commands); 
                } catch (err) {
                    if (err instanceof Error) {
                        console.error(err.message);
                    } else {
                        console.error(`Unknown Error: ${err}`);
                    }
                }    
            } else {
                console.log("Unknown command");
                rl.prompt();
            }            
        } 
        rl.prompt();
    })

}


