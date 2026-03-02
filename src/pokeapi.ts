import { Cache } from "./pokecache.js";

export interface PokedexEndpoint {
    name: string
    url: string
}

export type ShallowLocations = {
    count: number
    next: string
    previous: any
    results: PokedexEndpoint[]
};

/****************
* Location Types
*****************/
export interface Location {
    game_index: number
    id: number
    location: Location
    name: string
    pokemon_encounters: PokemonEncounter[]
};

export interface PokemonEncounter {
  pokemon: PokedexEndpoint
}

/****************
* Pokemon Types
*****************/

export interface Pokemon {
    name: string
    height: number
    weight: number
    base_experience: number
    location_area_encounters: string
    stats: Stat[]
    types: PokemonType[]
}

export interface Stat {
  base_stat: number
  effort: number
  stat: PokedexEndpoint
}

export interface PokemonType {
  slot: number
  type: PokedexEndpoint
}


export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    mapCache = new Cache(5000);

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const fullURL = pageURL 
        ? pageURL
        :`${PokeAPI.baseURL}/location-area`;
        const cachedMap: ShallowLocations | undefined = this.mapCache.get<ShallowLocations>(fullURL);  

        if (!cachedMap) {
        const mapResult = await fetch(fullURL, {
                method: "GET", 
                mode: "cors", 
            });
        const shallowLocations: ShallowLocations = await mapResult.json();
        this.mapCache.add<ShallowLocations>(fullURL, shallowLocations);
            return shallowLocations;
        } else {
        return cachedMap;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`
        const cachedExplore : Location | undefined = this.mapCache.get<Location>(fullURL)
        
        if (!cachedExplore) {
            const exploreResult = await fetch(fullURL, {
                method: "GET", 
                mode: "cors", 
            });
            const locationData: Location = await exploreResult.json();
            this.mapCache.add<Location>(fullURL, locationData)
            return locationData;
        } else {
            return cachedExplore
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`
            
        const pokemonResult = await fetch(fullURL, {
            method: "GET", 
            mode: "cors"
        })

        const pokemonData: Promise<Pokemon> = await pokemonResult.json();
        return pokemonData;
    }
}

