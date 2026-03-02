import { State } from "./state.js";

export async function exploreCommand(state: State, ...args: string[]): Promise<void> {
    const { pokeAPI } = state;
    const locationArea = args[0];

    console.log(`Exploring ${locationArea}...`);
    const result = await pokeAPI.fetchLocation(locationArea);
    console.log("Found Pokemon");

    for (const pokemonEncounter of result.pokemon_encounters) {
        console.log(` - ${pokemonEncounter.pokemon.name}`);
    }
}