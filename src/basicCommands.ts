import type { State } from './state.js';

export async function commandExit(replState: State): Promise<void> {
    const { readline } = replState;

    console.log("Closing the Pokedex... Goodbye!"); 
    readline.close();
    process.exit(0);
}

export async function commandHelp(replState: State): Promise<void>  {
    console.log("Welcome to the Pokedex!\nUsage:\nThis CLI tool is used to access Pokemon data from the PokeDex API.\nCommands:");
    const { commands } = replState;

    for (const commandKey in commands) {
        const name: string = commands[commandKey].name;
        const description: string = commands[commandKey].description;
        console.log(`${name}: ${description}`)
    }
}



