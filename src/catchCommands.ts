import { State } from "./state.js";


export async function catchCommand(state: State, ...args: string[]): Promise<void> {
    const { pokeAPI } = state;
    const pokemonName = args[0];

    console.log(`Throwing a Pokeball at ${pokemonName}...`);


        const pokemonData = await pokeAPI.fetchPokemon(pokemonName);
        
        const baseExperience: number = pokemonData.base_experience ?? 0;
        let catchRate: number;
 
    switch (true) {
        case (baseExperience < 33):
            catchRate = .99;
        case(baseExperience > 270):
            catchRate = .05;
        default:
            catchRate = 1 - (baseExperience / 300)
    }

    const randomRate: number = Math.random();
    console.log(catchRate)
    if (catchRate >= randomRate) {
        console.log(`${pokemonName} was caught!`)
        // Catch pokemon
    } else {
        console.log(`${pokemonName} escaped!`);
    }
    
}