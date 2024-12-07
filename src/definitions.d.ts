type AllPokemons = {
  count: number
  next: string
  previous: string
  results: Array<PokemonReference>
}
type PokemonReference = {
  name: string
  url: string
  image: string
  types: { name: string; tags: Array<string> }
}
type PokemonType = {
  name: string
  url: string
}
