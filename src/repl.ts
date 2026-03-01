import * as readline from 'readline';
import { callbackify } from 'util';

export function cleanInput(input: string): string[] {
    let cleanOutput: string[] = input.trim().split(/\s+/);

    for (let i = 0; i < cleanOutput.length; i++) {
        cleanOutput[i] = cleanOutput[i].toLowerCase().trim();
    }
    
    return cleanOutput;
}

export function startREPL() : void {
    // Set CLI prompt
    let textPrompt = "Pokedex >";
    
    // Initialize line reader
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout, 
        prompt: textPrompt,
    });

    // Display interface prompt
    rl.prompt();

    // Listen for input
    rl.on("line", (input) => {
        
        // if input is not empty clean input
        if (input.trim() !== "") {
            let cleanOutput: string[] = cleanInput(input);
            console.log(`Your command was: ${cleanOutput[0]}`)
        } 
            rl.prompt();
    })
}


