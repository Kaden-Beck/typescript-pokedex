import { PokedexEndpoint } from "./pokeapi.js";
import { State } from "./state.js";

export async function mapCommand(state: State): Promise<void> {
    const { pokeAPI } = state;

    const result = state.nextLocationsURL 
        ? await pokeAPI.fetchLocations(state.nextLocationsURL)
        : await pokeAPI.fetchLocations();

    const data: PokedexEndpoint[] = result.results;
    
    state.nextLocationsURL = result.next;
    state.prevLocationsURL = result.previous;

    for (const result of data) {
        console.log(result.name);
    }
}

export async function mapBackCommand(state: State): Promise<void> {
    const { pokeAPI } = state;

    const result = state.prevLocationsURL 
        ? await pokeAPI.fetchLocations(state.prevLocationsURL)
        : await pokeAPI.fetchLocations();

    const data: PokedexEndpoint[] = result.results;
    
    state.nextLocationsURL = result.next;
    state.prevLocationsURL = result.previous;

    for (const result of data) {
        console.log(result.name);
    }
}