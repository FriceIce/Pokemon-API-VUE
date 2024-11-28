<script setup lang="ts">
import type { PokemonReference } from '@/definitions'
import { ref, onMounted, watchEffect } from 'vue'
import { store } from '@/store'

const { pokemonObj, savedPokemonCards } = defineProps<{
  pokemonObj: PokemonReference
  savedPokemonCards: PokemonReference[]
}>()

const saveButton = ref<boolean>(false)

// onMounted method to check if pokemon card is already saved.
onMounted(() => {
  if (savedPokemonCards.length > 0) {
    savedPokemonCards.forEach((pokemonCard) => {
      if (pokemonCard.name === pokemonObj.name) return (saveButton.value = true)
    })
  }
})

// I used watchEffect here to ensure that when removing a Pokemon card that isn’t the last one, the heart button next to the removed card keeps it "filled" heart.
watchEffect(() => {
  try {
    const savedCards: PokemonReference[] = JSON.parse(
      localStorage.getItem('savedPokemonCards') ?? '[]',
    )

    if (savedCards.length < 1) {
      console.log('No saved Pokemons found')
    }

    saveButton.value = savedCards.some((card) => card.name === pokemonObj.name)
  } catch (error) {
    console.error('Error parsing saved Pokémon:', error)
  }
})

// Save or remove card from localStorage
const toggleSaveButton = () => {
  let updatedList: PokemonReference[] = [...savedPokemonCards]
  if (!saveButton.value) {
    updatedList.push(pokemonObj)
  } else {
    updatedList = savedPokemonCards.filter((card) => card.name !== pokemonObj.name)
  }

  store.updateList(updatedList)
  saveButton.value = updatedList.some((card) => card.name === pokemonObj.name)
}
</script>

<template>
  <img
    v-if="!saveButton"
    src="/iconSaveButtonOutline.svg"
    class="size-5 mt-1"
    @click="toggleSaveButton"
  />
  <img
    v-else="saveButton"
    src="/iconSaveButtonSolid.svg"
    class="size-5 mt-1"
    @click="toggleSaveButton"
  />
</template>
