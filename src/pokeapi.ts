import { Cache } from "./pokecache.js";

export interface pokedexEndpoint {
    name: string
    url: string
}

/************************
* Shallow Location Types
*************************/

export interface GameIndex{
    game_index: number
    generation: pokedexEndpoint
}

export type ShallowLocations = {
    count: number
    next: string
    previous: any
    results: pokedexEndpoint[]
};

/****************
* Location Types
*****************/
export type Location = {
    encounter_method_rates: EncounterMethodRate[]
    game_index: number
    id: number
    location: Location
    name: string
    names: Name[]
    pokemon_encounters: PokemonEncounter[]
};

export interface VersionDetail {
  rate: number
  version: pokedexEndpoint
}

export interface EncounterMethodRate {
  encounter_method: pokedexEndpoint
  version_details: VersionDetail[]
}

export interface Name {
  language: pokedexEndpoint
  name: string
}

export interface PokemonEncounter {
  pokemon: pokedexEndpoint
  version_details: VersionDetail2[]
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: pokedexEndpoint
}

export interface EncounterDetail {
  chance: number
  condition_values: pokedexEndpoint[]
  max_level: number
  method: pokedexEndpoint
  min_level: number
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

}

