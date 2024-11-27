<script setup lang="ts">
import { ref, defineProps } from 'vue'

const { pokemonName } = defineProps<{ pokemonName: string }>()

const saveButton = ref<boolean>(false)

const toggleSaveButton = () => {
  console.log('Toggle save button for', pokemonName)
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
