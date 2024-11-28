<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { PokemonReference, AllPokemons } from '@/definitions'
import PokemonAPI from '@/hooks/PokemonAPI'
import axios from 'axios'
import SearchSaveButton from './SearchSaveButton.vue'
import { store } from '@/store'

const pokemons = ref<Array<PokemonReference>>([])

watchEffect(async () => {
  try {
    const response = await axios<AllPokemons>({
      method: 'get',
      url: 'https://pokeapi.co/api/v2/pokemon',
    })

    if (response.data.results.length === 0) {
      // error message here
      console.log('No pokemons found')
      return
    }

    const fetchPokemonImages = () => {
      const pokemonCards = response.data.results.map((pokemon) => {
        return PokemonAPI.getPokemonByName(pokemon.name) // Fetch more information about every card
      })

      Promise.all(pokemonCards).then((data) => {
        const images = data.map(
          (pokemon) =>
            pokemon.sprites.other?.['official-artwork'].front_default ??
            pokemon.sprites.front_default,
        )

        console.log(images)

        pokemons.value = response.data.results.map((pokemon, index) => {
          return { ...pokemon, image: String(images[index]) }
        })
      })
    }

    fetchPokemonImages()

    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <section class="p-4">
    <ul v-if="pokemons.length !== 0" class="pokemonGrid">
      <li v-for="(pokemon, index) in pokemons" :key="index" :class="{ 'space-y-2 lg:pb-3': true }">
        <div class="h-[150px] sm:h-[200px]">
          <img
            :src="pokemon.image"
            alt="pokemon card"
            class="size-full object-contain object-center bg-[#e6e6e6] rounded-l"
          />
        </div>
        <div class="px-2">
          <div class="flex items-center gap-3">
            <p class="text-sm lg:text-xl font-semibold capitalize">{{ pokemon.name }}</p>
            <SearchSaveButton :pokemon-obj="pokemon" :savedPokemonCards="store.savedPokemonCards" />
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
