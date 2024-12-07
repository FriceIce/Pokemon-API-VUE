<script setup lang="ts">
import usePokemonAPI from '@/hooks/usePokemonAPI'
import { usePokemonStore } from '@/stores/savedPokemonStore'
import { computed, ref, watchEffect } from 'vue'
import SearchSaveButton from './SearchSaveButton.vue'
import ErrorComponet from './ErrorComponet.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import axios from 'axios'

const pokemonStore = usePokemonStore()
const pokemons = ref<Array<PokemonReference>>([])
const input = ref<string>('')
const isError = ref<boolean>(false)
const errorStatus = ref<number | undefined>(200)
const isLoading = ref<boolean>(true)

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
    const response = await usePokemonAPI.listPokemons(0, 20)

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
          pokemons.value = response.results.map((pokemon, index) => {
            return { ...pokemon, image: String(images[index]), types: tags[index] }
          }) as PokemonReference[]

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
})
</script>

<template>
  <section class="p-4 space-y-4">
    <ErrorComponet v-if="isError" :status="errorStatus" />

    <form v-if="!isError" class="space-x-2">
      <input
        v-model="input"
        type="text"
        placeholder="Search for Pokémon"
        class="border h-[40px] max-w-[400px] w-[90%] px-3 rounded"
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
