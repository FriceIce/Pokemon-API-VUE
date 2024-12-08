<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { status } = defineProps<{ status?: number | undefined }>()

const error = computed(() => {
  const generalerrorMsg = 'Unfortunately something went wrong!'

  if (status) return { status, message: generalerrorMsg }
  if (route.name === '404-not-found') return { status: 404, message: 'Page not found' }
  return { status, message: generalerrorMsg }
})
</script>

<template>
  <section class="errorHeroImg w-full h-full">
    <div class="text-white font-bold text-center py-24">
      <h1 class="text-8xl">
        {{ error.status }}
      </h1>
      <h2 class="text-lg sm:text-2xl md:text-4xl">{{ error.message }}</h2>
    </div>
  </section>
</template>

<style>
.errorHeroImg {
  background: url('/sad-pokémon.jpg');
  background-position: 53% 15%;
  background-repeat: no-repeat;
}
</style>
