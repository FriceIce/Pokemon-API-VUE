<script setup lang="ts">
import { computed } from 'vue'

const { status } = defineProps<{ status: number | undefined }>()

const checkStatus = computed(() => {
  return status ?? ''
})
</script>

<template>
  <section class="errorHeroImg w-full h-[500px] border">
    <div class="text-white font-bold text-center py-24">
      <h1 class="text-8xl">
        {{ checkStatus }}
      </h1>
      <h2 class="text-lg sm:text-2xl md:text-4xl">Unfortunately something went wrong!</h2>
    </div>
  </section>
</template>

<style>
.errorHeroImg {
  background: url('/sad-pokémon.jpg');
  background-position: 54% 15%;
  background-repeat: no-repeat;
}
</style>
