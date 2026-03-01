import type { CLICommand } from './command.js';

export function commandExit(commands: Record<string, CLICommand>): void {
    console.log("Closing the Pokedex... Goodbye!"); 
    process.exit(0);
}

export function commandHelp(commands: Record<string, CLICommand>): void {
    console.log("Welcome to the Pokedex!\nUsage:\nThis CLI tool is used to access Pokemon data from the PokeDex API.\nCommands:");
    for (const commandKey in commands) {
        const name: string = commands[commandKey].name;
        const description: string = commands[commandKey].description;
        console.log(`${name}: ${description}`)

    }
}

