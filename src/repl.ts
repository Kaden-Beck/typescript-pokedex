import { initState } from './state.js';

export function cleanInput(input: string) {
    let cleanOutput: string[] = input.trim().split(/\s+/);

    for (let i = 0; i < cleanOutput.length; i++) {
        cleanOutput[i] = cleanOutput[i].toLowerCase().trim();
    }
    
    return cleanOutput;
}

export async function startREPL() : Promise<void> {
    const replState = initState();
    const { readline, commands } = replState;
    
    readline.setPrompt("Pokedex > ");
    readline.prompt();

    for await (const line of readline) {  
        const input = line.trim();

        if (input.trim() !== "") {
            const cleanOutput = cleanInput(input);
            const commandKey = cleanOutput[0];

        if (commandKey in commands) {
            try {
                await commands[commandKey].callback(replState); 
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.error(`Unknown Error: ${err}`);
                }
            }    
        } else {
            console.log("Unknown command");
        }            
        } 
        readline.prompt();
    }

}


