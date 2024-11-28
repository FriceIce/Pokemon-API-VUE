<script setup lang="ts">
import SearchSaveButton from './SearchSaveButton.vue'
import { computed } from 'vue'
import { store } from '@/store'

const title = computed(() => {
  return store.savedPokemonCards.length > 0 ? 'Saved Pokemons' : 'No Pokémons saved'
})
</script>

<template>
  <section class="space-y-4 p-4">
    <h1 class="text-2xl md:text-4xl font-bold">{{ title }}</h1>
    <ul v-if="store.savedPokemonCards.length !== 0" class="pokemonGrid">
      <li
        v-for="(pokemon, index) in store.savedPokemonCards"
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
