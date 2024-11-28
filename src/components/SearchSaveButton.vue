<script setup lang="ts">
import type { PokemonReference } from '@/definitions'
import { ref, onMounted } from 'vue'

const { pokemonObj, savedPokemonCards } = defineProps<{
  pokemonObj: PokemonReference
  savedPokemonCards: PokemonReference[]
}>()

const saveButton = ref<boolean>(false)

// onMounted method to check if pokemon card is already saved.
onMounted(() => {
  if (savedPokemonCards.length > 0) {
    savedPokemonCards.forEach((pokemonCard) => {
      if (pokemonCard.name === pokemonObj.name) saveButton.value = true
    })
  }
})

// Save or remove card from localStorage
const toggleSaveButton = () => {
  if (!saveButton.value) {
    console.log('saving...')
    savedPokemonCards.push(pokemonObj)
    localStorage.setItem('savedPokemonCards', JSON.stringify(savedPokemonCards))
  }

  if (saveButton.value) {
    console.log('deleting...')
    const updatedList = savedPokemonCards.filter((card) => card.name !== pokemonObj.name)
    localStorage.setItem('savedPokemonCards', JSON.stringify(updatedList))
  }

  saveButton.value = !saveButton.value
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
