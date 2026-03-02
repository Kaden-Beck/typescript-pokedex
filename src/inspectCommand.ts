import { State } from "./state.js";
import { PokedexEndpoint, Pokemon, Stat } from "./pokeapi.js";

export async function inspectCommand(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("You must provide a pokemon name!");
    }

    const pokemonName = args[0];
    const pokemonData: Pokemon = state.userPokedex[pokemonName];

    if (!pokemonData) {
        throw new Error("You haven't caught that pokemon")
    }

    let inspectOutput = `Name: ${pokemonData.name}\nHeight: ${pokemonData.height}\nWeight: ${pokemonData.weight}\nStats:`;

    for (const statInfo of pokemonData.stats) {
       inspectOutput += `\n -${statInfo.stat.name}: ${statInfo.base_stat}`;
    }
    
    inspectOutput += "\nTypes:"
    for (const typeInfo of pokemonData.types) {
        inspectOutput += `\n - ${typeInfo.type.name}`
    }

    console.log(inspectOutput);

}