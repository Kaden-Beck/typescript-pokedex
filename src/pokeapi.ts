import { Cache } from "./pokecache.js";

export interface pokedexEndpoint {
    name: string
    url: string
}

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

export type Location = {
    areas: pokedexEndpoint[]
    game_indices: pokedexEndpoint[]
    id: number
    name: string
    names: pokedexEndpoint[]
    region: pokedexEndpoint
};


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
    const fullURL = `${PokeAPI.baseURL}/location/${locationName}`
    const result = await fetch(fullURL, {
        method: "GET", 
        mode: "cors", 
    });
    const locationData: Location = await result.json();

    return locationData;
  }

}

