import { State } from "./state.js";

export async function exploreCommand(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("You must provide a location name");
    }
    
    const { pokeAPI } = state;
    const locationArea = args[0];

    console.log(`Exploring ${locationArea}...`);
    const result = await pokeAPI.fetchLocation(locationArea);
    
    if (!result) {
        throw new Error("Unable to find that location!")
    }

    console.log("Found Pokemon");

    for (const pokemonEncounter of result.pokemon_encounters) {
        console.log(` - ${pokemonEncounter.pokemon.name}`);
    }
}