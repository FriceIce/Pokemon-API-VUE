export type AllPokemons = {
  count: number
  next: string
  previous: string
  results: Array<PokemonReference>
}

export type PokemonReference = {
  name: string
  url: string
  image: string
  types: { name: string; tags: Array<string> }
}

export type PokemonType = {
  name: string
  url: string
}
