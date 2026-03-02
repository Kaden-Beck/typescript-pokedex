import { State } from "./state.js";


export async function catchCommand(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("You must provide a pokemon name!");
    }

    const { pokeAPI } = state;
    const pokemonName = args[0];
    const randomRate: number = Math.random();
    
    const pokemonData = await pokeAPI.fetchPokemon(pokemonName);
    
    if (!pokemonData) {
        throw new Error("Unable to get that pokemon's info...")
    }

    const baseExperience: number = pokemonData.base_experience ?? 0;
    let catchRate: number;
 
    switch (true) {
        case (baseExperience < 35):
            catchRate = .99;
        case(baseExperience > 270):
            catchRate = .05;
        default:
            catchRate = 1 - (baseExperience / 300);
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    if ( catchRate >= randomRate) {
        state.userPokedex[pokemonName] = pokemonData;
        console.log(`${pokemonName} was caught!`)
    } else {
        console.log(`${pokemonName} escaped!`);
    }
    
}