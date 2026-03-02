import { State } from "./state.js";


export async function catchCommand(state: State, ...args: string[]): Promise<void> {
    const { pokeAPI } = state;
    const pokemonName = args[0];
    const randomRate: number = Math.random();

    console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const pokemonData = await pokeAPI.fetchPokemon(pokemonName);
        
        const baseExperience: number = pokemonData.base_experience ?? 0;
        let catchRate: number;
 
    switch (true) {
        case (baseExperience < 35):
            catchRate = .99;
        case(baseExperience > 270):
            catchRate = .05;
        default:
            catchRate = 1 - (baseExperience / 300)
    }

    if ( catchRate >= randomRate) {
        state.userPokedex[pokemonName] = pokemonData;
        console.log(`${pokemonName} was caught!`)
    } else {
        console.log(`${pokemonName} escaped!`);
    }
    
}