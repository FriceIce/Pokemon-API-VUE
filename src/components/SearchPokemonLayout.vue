<script setup lang="ts">
import type { PokemonReference } from '@/definitions'
import { default as PokemonAPI, default as pokemonAPI } from '@/hooks/PokemonAPI'
import { store } from '@/store'
import { computed, ref, watchEffect } from 'vue'
import SearchSaveButton from './SearchSaveButton.vue'

const pokemons = ref<Array<PokemonReference>>([])
const input = ref<string>('')

// The varible filteredPokemons is using the computed method to adjust the "pokemons" list after the users input before displaying it on the screen.
const filteredPokemons = computed(() => {
  const text = input.value

  if (!text) return pokemons.value

  return pokemons.value.filter((pokemon) =>
    pokemon.name.toLocaleLowerCase().includes(text.trim().toLowerCase()),
  )
})

// Fetching the Pokémons
watchEffect(async () => {
  try {
    const response = await pokemonAPI.listPokemons(0, 20)

    if (response.results.length === 0) {
      // error message here
      console.log('No pokemons found')
      return
    }

    const fetchMorePokemonInfo = () => {
      const pokemonCards = response.results.map((pokemon) => {
        return PokemonAPI.getPokemonByName(pokemon.name) // Fetch more information about every card
      })

      // Using Promise.all() to gather all the promises in PokemonCards varible and collectivly return the results when all the fetches are successfull.
      Promise.all(pokemonCards).then((data) => {
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
        pokemons.value = response.results.map((pokemon, index) => {
          return { ...pokemon, image: String(images[index]), types: tags[index] }
        }) as PokemonReference[]
      })
    }

    fetchMorePokemonInfo()

    console.log(response.results)
  } catch (error) {
    console.log(error)
  }
})

console.log(pokemons)
</script>

<template>
  <section class="p-4 space-y-4">
    <form class="space-x-2">
      <input
        v-model="input"
        type="text"
        placeholder="Search for Pokémon"
        class="border h-[40px] max-w-[400px] w-[90%] px-3 rounded"
      />

      <button class="bg-yellow-400 px-6 py-[8.5px] rounded cursor-pointer">Search</button>
    </form>

    <ul v-if="pokemons.length !== 0" class="pokemonGrid">
      <li
        v-for="(pokemon, index) in filteredPokemons"
        :key="index"
        :class="{ 'space-y-2 lg:pb-3': true }"
      >
        <div class="h-[150px] sm:h-[200px]">
          <img
            :src="pokemon.image"
            alt="pokemon card"
            class="size-full object-contain object-center bg-[#e6e6e6] rounded-l"
          />
        </div>
        <div class="space-y-2 px-2">
          <div class="flex items-center gap-3">
            <p class="text-sm lg:text-xl font-semibold capitalize">{{ pokemon.name }}</p>
            <SearchSaveButton :pokemon-obj="pokemon" :savedPokemonCards="store.savedPokemonCards" />
          </div>
          <div class="flex gap-2">
            <p
              v-for="tags in pokemon.types.tags"
              class="bg-blue-300 text-xs lg:text-[13px] px-4 py-[1px] rounded"
            >
              {{ tags }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style>
.pokemonGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  width: 100%;
  row-gap: 1rem;
  column-gap: 4px;
}

@media (min-width: 640px) {
  .pokemonGrid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
