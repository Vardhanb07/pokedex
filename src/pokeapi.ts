import { NetworkError } from "./errors.js";

export type ShallowLocations = {
  next: string;
  previous: string;
  results: { name: string; url: string }[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  constructor() {}
  async fetchLocationAreas(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    let response: ShallowLocations;
    try {
      response = await fetch(url, {
        method: "GET",
      }).then((res) => res.json());
    } catch (e) {
      throw new NetworkError("poke api request failed");
    }
    return response;
  }
}
