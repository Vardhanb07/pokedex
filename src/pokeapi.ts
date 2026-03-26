import {
  NetworkError,
  LocationAreaNotFoundError,
  PokemonNotFoundError,
} from "./errors.js";
import { Cache } from "./pokecache.js";

export type ShallowLocations = {
  next: string;
  previous: string;
  results: { name: string; url: string }[];
};

export type Location = {
  pokemon_encounters: {
    pokemon: {
      name: string;
    };
  }[];
};

export type Pokemon = {
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;
  constructor() {
    this.#cache = new Cache(1000 * 60 * 5);
  }
  async fetchLocationAreas(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const cacheEntry = this.#cache.get<ShallowLocations>(url);
    if (cacheEntry) {
      return cacheEntry.val;
    }
    let response: ShallowLocations;
    try {
      response = await fetch(url, {
        method: "GET",
      }).then((res) => res.json());
    } catch (e) {
      throw new NetworkError("poke api request failed");
    }
    this.#cache.add<ShallowLocations>(url, response);
    return response;
  }
  async fetchLocationArea(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cacheEntry = this.#cache.get<Location>(url);
    if (cacheEntry) {
      return cacheEntry.val;
    }
    let response: Location;
    try {
      response = await fetch(url, {
        method: "GET",
      }).then((res) => {
        if (res.status == 404) {
          throw new LocationAreaNotFoundError("location area not found");
        }
        return res.json();
      });
    } catch (e) {
      if (e instanceof LocationAreaNotFoundError) {
        throw e;
      }
      throw new NetworkError("poke api request failed");
    }
    this.#cache.add<Location>(url, response);
    return response;
  }
  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cacheEntry = this.#cache.get<Pokemon>(url);
    if (cacheEntry) {
      return cacheEntry.val;
    }
    let response: Pokemon;
    try {
      response = await fetch(url, {
        method: "GET",
      }).then((res) => {
        if (res.status == 404) {
          throw new PokemonNotFoundError("poke not found");
        }
        return res.json();
      });
    } catch (e) {
      if (e instanceof PokemonNotFoundError) {
        throw e;
      }
      throw new NetworkError("poke api request failed");
    }
    this.#cache.add<Pokemon>(url, response);
    return response;
  }
}
