export class NetworkError extends Error {
  constructor(msg: string) {
    super(`NetworkError: ${msg}`);
  }
}

export class LocationAreaNotFoundError extends Error {
  constructor(msg: string) {
    super(`LocationAreaNotFound: ${msg}`);
  }
}

export class PokemonNotFoundError extends Error {
  constructor(msg: string) {
    super(`PokemonNotFound: ${msg}`);
  }
}
