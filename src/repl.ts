import * as readline from 'readline';
import { initState, type CLICommand } from './state.js';




export function cleanInput(input: string) {
    let cleanOutput: string[] = input.trim().split(/\s+/);

    for (let i = 0; i < cleanOutput.length; i++) {
        cleanOutput[i] = cleanOutput[i].toLowerCase().trim();
    }
    
    return cleanOutput;
}

export function startREPL() : void {
    const replState = initState();
    const {readline, commands } = replState;
    readline.prompt();

    // Listen for input on line and process any commands
    readline.on("line", (input) => {
        // if input is not empty clean input
        if (input.trim() !== "") {
            const cleanOutput = cleanInput(input);
            const commandKey = cleanOutput[0];

            if (commandKey in commands) {
                try {
                    commands[commandKey].callback(replState); 
                } catch (err) {
                    if (err instanceof Error) {
                        console.error(err.message);
                    } else {
                        console.error(`Unknown Error: ${err}`);
                    }
                }    
            } else {
                console.log("Unknown command");
                readline.prompt();
            }            
        } 
        readline.prompt();
    })

}


