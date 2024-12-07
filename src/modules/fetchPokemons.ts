import usePokemonAPI from '@/hooks/usePokemonAPI'
import axios from 'axios'
import type { Ref } from 'vue'

export const fetchPokemons = async (
  pokemons: Ref<
    {
      name: string
      url: string
      image: string
      types: {
        name: string
        tags: Array<string>
      }
    }[],
    | PokemonReference[]
    | {
        name: string
        url: string
        image: string
        types: {
          name: string
          tags: Array<string>
        }
      }[]
  >,
  isLoading: Ref<boolean, boolean>,
  isError: Ref<boolean, boolean>,
  errorStatus: Ref<number | undefined, number | undefined>,
  offset: number,
  limit: number,
) => {
  try {
    const response = await usePokemonAPI.listPokemons(offset, limit)

    if (response.results.length === 0) {
      // console error message on empty list
      console.log('No pokemons found')
      return
    }

    const fetchMorePokemonInfo = () => {
      const pokemonCards = response.results.map((pokemon) => {
        return usePokemonAPI.getPokemonByName(pokemon.name) // Fetch more information about every card
      })

      // Using Promise.all() to gather all the promises in PokemonCards varible and collectivly return the results when all the fetches are successfull.
      Promise.all(pokemonCards)
        .then((data) => {
          const images = data.map(
            (pokemon) =>
              pokemon.sprites.other?.['official-artwork'].front_default ??
              pokemon.sprites.front_default,
          )

          const tags = data.map((pokemon) => {
            return {
              name: pokemon.name,
              tags: pokemon.types.map((tag) => tag.type.name),
            }
          })

          // Adding value to the pokemons list with extra properties as image and types.
          pokemons.value.push(
            ...(response.results.map((pokemon, index) => {
              return { ...pokemon, image: String(images[index]), types: tags[index] }
            }) as PokemonReference[]),
          )

          isLoading.value = false
        })
        .catch((error) => {
          // The usePokmonAPI hook is using axios wich is the reason for the .isAxiosError method.
          if (axios.isAxiosError(error)) {
            isError.value = true
            errorStatus.value = error.status
            isLoading.value = false
          }
        })
    }

    fetchMorePokemonInfo()
  } catch (error) {
    console.log(error)
  }
}
