<script setup lang="ts">
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { fetchPokemons } from '@/modules/fetchPokemons'
import { usePokemonStore } from '@/stores/savedPokemonStore'
import { computed, ref, watchEffect } from 'vue'
import ErrorComponet from './ErrorComponet.vue'
import SearchSaveButton from './SearchSaveButton.vue'
import { pokemonTags } from '@/assets/tags'

const pokemonStore = usePokemonStore()
const pokemons = ref<Array<PokemonReference>>([])
const input = ref<string>('')
const isError = ref<boolean>(false)
const errorStatus = ref<number | undefined>(200)
const isLoading = ref<boolean>(true)
const offset = ref<number>(0)

// The varible filteredPokemons is using the computed method to adjust the "pokemons" list after the users input before displaying it on the screen.
const filteredPokemons = computed(() => {
  const text = input.value

  if (!text) return pokemons.value

  return pokemons.value.filter((pokemon) =>
    pokemon.name.toLocaleLowerCase().includes(text.trim().toLowerCase()),
  )
})

// Module for fetching a list of Pokémons
watchEffect(() => {
  fetchPokemons(pokemons, isLoading, isError, errorStatus, offset.value, 20)
})

// ----------AI generated--------------
const setTagStyle = (tag: string): { background: string; color: string } => {
  const tagObj = pokemonTags.find((pokemonTag) => pokemonTag.tag === tag)

  if (tagObj) {
    return { background: tagObj.color, color: tagObj.textColor }
  }

  return { background: 'lightblue', color: '#000000' } // default color styles
}
</script>

<template>
  <section class="p-4 pb-10 space-y-10">
    <ErrorComponet v-if="isError" :status="errorStatus" />

    <form v-if="!isError" class="space-x-2 flex">
      <input
        v-model="input"
        type="text"
        placeholder="Search for Pokémon"
        class="border h-[41px] max-w-[400px] flex-1 px-3 rounded"
      />

      <button class="bg-yellow-400 px-6 py-[8.5px] rounded cursor-pointer">Search</button>
    </form>

    <SpinnerComponent v-if="isLoading" />
    <ul v-if="pokemons.length !== 0 && !isError && !isLoading" class="pokemonGrid">
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
            <SearchSaveButton
              :pokemon-obj="pokemon"
              :savedPokemonCards="pokemonStore.savedPokemonCards"
            />
          </div>
          <div class="flex gap-2">
            <p
              v-for="tags in pokemon.types.tags"
              :style="{ background: setTagStyle(tags).background, color: setTagStyle(tags).color }"
              class="text-xs lg:text-[13px] px-4 py-[1px] rounded"
            >
              {{ tags }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div class="flex justify-center">
      <button
        class="bg-[#36c6ff] px-4 py-[12px] text-white font-bold rounded cursor-pointer outline-none lg:hover:shadow-md"
        @click="(offset += 20)"
      >
        Load more Pokémon
      </button>
    </div>
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
