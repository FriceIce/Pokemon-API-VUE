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
  types: { slot: number; type: PokemonType }
}

export type PokemonType = {
  name: string
  url: string
}
