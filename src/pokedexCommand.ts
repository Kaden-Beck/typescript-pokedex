import { State } from "./state.js";

export async function pokedexCommand(state: State): Promise<void> {
    const { userPokedex } = state;

    for (const pokedexEntry in userPokedex) {
        console.log(`- ${pokedexEntry}`)
    }
}